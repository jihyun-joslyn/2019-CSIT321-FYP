package com.project.sharity.api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.project.sharity.dao.CartDao;
import com.project.sharity.key.CartID;
import com.project.sharity.model.Cart;
import com.project.sharity.model.OutputItem;
import com.project.sharity.admin.AdminSendEmail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {
    @Autowired
    private CartDao dao;
    
    @Autowired
	private AdminSendEmail Aemail;

    @GetMapping(path = "/getCartList", produces = "application/json")
    public @ResponseBody List<OutputItem> getCartList(@RequestParam(required = false, name = "userID") String userID) {
        List<Cart> cList = dao.getCartList(userID);
        List<OutputItem> result = new ArrayList<OutputItem>();

        for (int i = 0; i < cList.size(); i++) {
            OutputItem temp = new OutputItem();

            System.out.printf("%s\n", cList.get(i).getCartID().getProductID());

            if (dao.getItemName(cList.get(i).getCartID().getProductID(),
                    cList.get(i).getCartID().getAccountID()) == null) {
                temp.setName(dao.getServiceName(cList.get(i).getCartID().getProductID(),
                        cList.get(i).getCartID().getAccountID()));
                temp.setPrice(dao.getServicePrice(cList.get(i).getCartID().getProductID()));
                temp.setSellerName(dao.getServiceSeller(cList.get(i).getCartID().getProductID()));
                temp.setimg(dao.getimg(cList.get(i).getCartID().getProductID(),cList.get(i).getCartID().getAccountID()));
                temp.setQuantity(cList.get(i).getQuantity());
                temp.setType("service");
            } else {
                temp.setName(dao.getItemName(cList.get(i).getCartID().getProductID(),
                        cList.get(i).getCartID().getAccountID()));
                temp.setPrice(dao.getItemPrice(cList.get(i).getCartID().getProductID(),
                        cList.get(i).getCartID().getAccountID()));
                temp.setSellerName(dao.getItemSeller(cList.get(i).getCartID().getProductID()));
                temp.setimg(dao.getimg(cList.get(i).getCartID().getProductID(),cList.get(i).getCartID().getAccountID()));
                temp.setQuantity(cList.get(i).getQuantity());
                temp.setType("goods");
            }

            temp.setIndex(i);
            temp.setProductID(cList.get(i).getCartID().getProductID());

            result.add(temp);
        }
        return result;
    }

    @GetMapping(path = "/addCart", produces = "application/json")
    public @ResponseBody String addCart(@RequestParam(required = false, name = "userID") String userID,
            @RequestParam(required = false, name = "productID") String productID,
            @RequestParam(required = false, name = "quantity") int quantity) {
        Date date = new Date();
        int _result = 0;
        String result;

        System.out.printf("%s\n", userID);
        String accountID = dao.getAccountID(userID);
        
        CartID _temp = new CartID(accountID, productID);
        Cart temp = new Cart(_temp,quantity, date);

        try {
            dao.save(temp);
        } catch (Exception e) {
            _result = -1;
        }

        if (_result != -1)
            result = "280";
        else
            result = "480";

        return result;
    }

    @GetMapping(path = "/deleteCart", produces = "application/json")
    public @ResponseBody String deleteCart(@RequestParam(required = false, name = "userID") String userID,
            @RequestParam(required = false, name = "productID") String productID,
            @RequestParam(required = false, name = "quantity") int quantity,
            @RequestParam(required = false, name = "type") String type) {
        int _result = 0;
        String result;

        String accountID = dao.getAccountID(userID);

        CartID _temp = new CartID(accountID, productID);

        if(type.equals("goods")) {
            dao.deleteById(_temp);
            dao.changeQuantity(dao.checkcanadd(productID)+quantity,productID);
        	result="285";
        }else if(type.equals("service")) {
            dao.deleteById(_temp);
        	result="285";
        }else {
        	result="485";
        }


        return result;
    }
    
    @GetMapping(path = "/getTPrice", produces = "application/json")
    public @ResponseBody Double getTPrice(@RequestParam(required = false, name = "acc") String acc) {

    	Double itemTPrice=dao.getitemTPrice(acc);
    	Double serviceTPrice=dao.getserviceTPrice(acc);


    	if(itemTPrice==null) {
    		itemTPrice=0.0;
    	}
    	
    	if(serviceTPrice==null) {
    		serviceTPrice=0.0;
    	}
    	
        System.out.printf("%s\n", itemTPrice);
        System.out.printf("%s\n", serviceTPrice);
        
        return itemTPrice+serviceTPrice;
    }
    
    @GetMapping(path = "/deleteAllCart", produces = "application/json")
    public @ResponseBody int deleteAllCart(@RequestParam(required = false, name = "userID") String userID) {
        return dao.deleteAllCart(userID);
    }
    
    @GetMapping(path = "/setOrderList", produces = "application/json")
    public @ResponseBody void setOrderList(@RequestParam(required = false, name = "userID") String userID,@RequestParam(required = false, name = "paymentID") String paymentID) {
        List<Cart> oList = dao.getCartList(userID);
        for (int i = 0; i < oList.size(); i++) {
        	if(dao.tryfromitem(oList.get(i).getCartID().getProductID(),userID)!=null) {
        		dao.insertorder(paymentID,dao.getAccountID(userID),oList.get(i).getCartID().getProductID(),oList.get(i).getQuantity(),dao.tryfromitem(oList.get(i).getCartID().getProductID(),userID));
        	}else {
        		dao.insertorder(paymentID,dao.getAccountID(userID),oList.get(i).getCartID().getProductID(),oList.get(i).getQuantity(),dao.tryfromservice(oList.get(i).getCartID().getProductID(),userID));
        	}	
        }
        //send email to seller
        String buyer_email = dao.getbuyeremail(userID);
        String buyer_phone = dao.getbuyerphone(userID);
		System.out.println(buyer_email);
		System.out.println(buyer_phone);

        for (int i = 0; i < oList.size(); i++) {
        	if(dao.emailtryitem(oList.get(i).getCartID().getProductID())!=null) {
        		String sellerID=dao.getitemsellerID(oList.get(i).getCartID().getProductID(),userID, paymentID);
        		String email = dao.getselleremail(sellerID);
        		String itemname=dao.getitemname(oList.get(i).getCartID().getProductID());
        		String quantity = Integer.toString(oList.get(i).getQuantity());
        		//send email of item here(get quantity by using (/*oList.get(i).getQuantity()*/) )
        		System.out.println(email);
        		System.out.println(itemname);
        		System.out.println(quantity);
        		Aemail.ItemSendEmailtoSeller(userID, buyer_email, buyer_phone, email, itemname, quantity);
        		

        	}else {
        		String sellerID=dao.getservicesellerID(oList.get(i).getCartID().getProductID(),userID, paymentID);
                String email = dao.getselleremail(sellerID);
        		String servicename=dao.getservicename(oList.get(i).getCartID().getProductID());
        		//send email of service here (no quantity available for service)
        		System.out.println(email);
        		System.out.println(servicename);
        		Aemail.ServiceSendEmailtoSeller(userID, buyer_email, buyer_phone, email, servicename);
        		
        	}	
        	
        }
    }	
    
    
    @GetMapping(path = "/changeAmount", produces = "application/json")
    public @ResponseBody int changeAmount(@RequestParam(required = false, name = "userID") String userID,@RequestParam(required = false, name = "ItemID") String ItemID,@RequestParam(required = false, name = "amount") int amount,@RequestParam(required = false, name = "method") String method) {
    	int quantity=0;
    	if(method.equals("add")) {
    		quantity=dao.checkcanadd(ItemID);
    		if(quantity-1!=-1) {
    			dao.changeQuantity(dao.checkcanadd(ItemID)-1,ItemID);
    			return dao.changeamount(amount+1,ItemID,userID);
    		}else {
    			return 0;
    		}
    	}else {
			dao.changeQuantity(dao.checkcanadd(ItemID)+1,ItemID);
    		return dao.changeamount(amount-1,ItemID,userID);
    	}
    }
}