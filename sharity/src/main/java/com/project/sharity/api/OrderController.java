package com.project.sharity.api;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

import com.project.sharity.dao.OrderDao;
import com.project.sharity.model.AdminRecentTrans;
import com.project.sharity.model.Order;
import com.project.sharity.model.OutputOrder;
import com.project.sharity.model.OutputTransaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderDao dao;

    @GetMapping(path = "/getOrderList", produces = "application/json")
    public @ResponseBody List<OutputOrder> getOrderList(	
            @RequestParam(required = false, name = "userID") String userID,	
            @RequestParam(required = false, name = "transactionID") String transactionID) {	
        List<Order> oList = dao.getHisList(userID,transactionID);
        List<OutputOrder> result = new ArrayList<OutputOrder>();

        for (int i = 0; i < oList.size(); i++) {
            OutputOrder temp = new OutputOrder();

            if (dao.getItemName(oList.get(i).getOrderID().getProductID()) == null) {
                temp.setName(dao.getServiceName(oList.get(i).getOrderID().getProductID()));
                temp.setPrice(dao.getServicePrice(oList.get(i).getOrderID().getProductID()));
                temp.setType("service");
                temp.setImage(dao.getimg(oList.get(i).getOrderID().getProductID()));

            } else {
                temp.setName(dao.getItemName(oList.get(i).getOrderID().getProductID()));
                temp.setPrice(dao.getItemPrice(oList.get(i).getOrderID().getProductID()));
                temp.setType("item");
                temp.setImage(dao.getimg(oList.get(i).getOrderID().getProductID()));

            }

            temp.setIndex(i);
            temp.setProductID(oList.get(i).getOrderID().getProductID());
            temp.setSellerName(dao.getSellerName(oList.get(i).getOrderID().getAccountID()));

            result.add(temp);
        }

        return result;
    }
    
    @GetMapping(path = "/getTransactionList", produces = "application/json")
    public @ResponseBody List<OutputTransaction> getTransactionList(
            @RequestParam(required = false, name = "userID") String userID) {
    	
    	List<String> olist = dao.getTransList(userID);
        List<OutputTransaction> result = new ArrayList<OutputTransaction>();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        formatter.setTimeZone(TimeZone.getTimeZone("UTC"));
        
        for (int i = 0; i < olist.size(); i++) {
        	String transactionID = olist.get(i);
        	String itemTprice= dao.getTpriceItem(userID,transactionID);
        	if(itemTprice==null) {
        		itemTprice="0";
        	}
        	String serviceTprice= dao.getTpriceService(userID,transactionID);
        	if(serviceTprice==null) {
        		serviceTprice="0";
        	}
        	String[] photolist=dao.getSomePhoto(userID,transactionID);

        	OutputTransaction temp = new OutputTransaction();

        	temp.setTransactionID(olist.get(i));
        	
        	temp.setTPrice(Integer.parseInt(itemTprice)+Integer.parseInt(serviceTprice));

        	temp.setDate_added(formatter.format(dao.getdate(olist.get(i))));

        	if(photolist.length>0) {
            	temp.setPhoto1(photolist[0]);
        	}else {
        		temp.setPhoto1("https://i.imgur.com/OHNLBOB.png");
        	}

        	if(photolist.length>1) {
            	temp.setPhoto2(photolist[1]);
        	}else {
        		temp.setPhoto2("https://i.imgur.com/OHNLBOB.png");
        	}

        	if(photolist.length>2) {
            	temp.setPhoto3(photolist[2]);
        	}else {
        		temp.setPhoto3("https://i.imgur.com/OHNLBOB.png");
        	}
        	
            result.add(temp);

        }

        return result;
    }
    
    @GetMapping(path = "/adminRecentTrans", produces = "application/json")
    public @ResponseBody List<AdminRecentTrans> adminRecentTrans(){
    	String[] temp = dao.getfirst15();
    	List<AdminRecentTrans> translist = new ArrayList<AdminRecentTrans>();

    	for(int i=0;i<15;i++) {
        	int Tprice=0;
    		List<Order> list = dao.getwithtransactionID(temp[i]);
    		
    		for(int j=0;j<list.size();j++) {
    			if(list.get(j).getQuantity()>=1) {
    				Tprice+=dao.getitemprice(list.get(j).getOrderID().getProductID())*list.get(j).getQuantity();
    			}else {
    				Tprice+=dao.getserviceprice(list.get(j).getOrderID().getProductID());
    			}
    		}

    		AdminRecentTrans inlist = new AdminRecentTrans();
    		inlist.setTransactionID(temp[i]);
    		inlist.setAccountID(list.get(0).getOrderID().getAccountID());
    		inlist.setMethod("https://logos-world.net/wp-content/uploads/2020/04/PayPal-Logo.png");
    		inlist.setTPrice(Tprice);
    		inlist.setDate_Added(list.get(0).getDateAdded());

    		translist.add(inlist);
    	}
    	
    	return translist;

    }
   
}