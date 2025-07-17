package com.project.sharity.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.project.sharity.dao.AdminDao;
import com.project.sharity.model.Admin;
import com.project.sharity.model.AdminOutputItem;
import com.project.sharity.model.AdminOutputCat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminDao dao;
   
    @GetMapping(path = "/adminGetAllItem", produces = "application/json")
    public @ResponseBody List<AdminOutputItem> adminGetAllItem() {
        List<Admin> iList = dao.getAllItem();
        List<AdminOutputItem> result = new ArrayList<AdminOutputItem>();

        for (int i = 0; i < iList.size(); i++) {
        	AdminOutputItem temp = new AdminOutputItem();
            Admin temp1 = iList.get(i);

            temp.setIndex(i);
            temp.setProductID(temp1.getProductID());
            temp.setCID(temp1.getCID());
            temp.setName(temp1.getName());
            temp.setPrice(temp1.getPrice());
            temp.setSellerName(dao.getSellerName(temp1.getProductID(), temp1.getSellerID()));
            temp.setDescription(dao.getDescription(temp1.getProductID()));
            temp.setimg(dao.getitemimg(temp1.getProductID()));
            temp.setType(temp1.getType());



            result.add(temp);
        }

        return result;

    }
    
    @GetMapping(path = "/adminGetAllService", produces = "application/json")
    public @ResponseBody List<AdminOutputItem> adminGetAllService() {
        List<Admin> iList = dao.getAllService();
        List<AdminOutputItem> result = new ArrayList<AdminOutputItem>();

        for (int i = 0; i < iList.size(); i++) {
        	AdminOutputItem temp = new AdminOutputItem();
            Admin temp1 = iList.get(i);

            temp.setIndex(i);
            temp.setProductID(temp1.getProductID());
            temp.setCID(temp1.getCID());
            temp.setName(temp1.getName());
            temp.setPrice(temp1.getPrice());
            temp.setSellerName(dao.getSellerName(temp1.getProductID(), temp1.getSellerID()));
            temp.setDescription(dao.getDescription(temp1.getProductID()));
            temp.setimg(dao.getitemimg(temp1.getProductID()));
            temp.setType(temp1.getType());



            result.add(temp);
        }

        return result;

    }
    
    @GetMapping(path = "/adminGetDetail", produces = "application/json")
    public @ResponseBody AdminOutputItem adminGetDetail(@RequestParam(required = false, name = "pID") String pID) {
        Admin item = dao.getdetailbyid(pID);
        AdminOutputItem result = new AdminOutputItem();

        result.setIndex(0);
        result.setProductID(item.getProductID());
        result.setCID(dao.getcategoryname(item.getProductID()));
        result.setName(item.getName());
        result.setPrice(item.getPrice());
        result.setSellerName(dao.getSellerName(item.getProductID(), item.getSellerID()));
        result.setDescription(dao.getDescription(item.getProductID()));
        result.setimg(dao.getitemimg(item.getProductID()));
        result.setType(item.getType());

        return result;

    }
    
    
    
    @GetMapping(path = "/adminDrop", produces = "application/json")
    public @ResponseBody void adminDrop(@RequestParam(required = false, name = "pID") String pID, HttpServletResponse response)throws IOException {
    	int finish = 0;
    	String text= "not finish";
    	Admin temp = dao.getItemDetail(pID);
    	String email = dao.getemail(pID);
    	finish = dao.dropProduct(pID);
    	finish = dao.deleteImage(pID);
    		if(finish==1) {
    			text ="Product Dropped";
    		}
    	response.sendRedirect("/sendemail?useremail="+email+"&name="+temp.getName()+"&type="+temp.getType());
    }


	@GetMapping(path = "/adminAdd", produces = "application/json")
    public @ResponseBody UUID adminAdd(@RequestParam(required = false, name = "userID") String userID,
    		@RequestParam(required = false, name = "cID") String cID,
            @RequestParam(required = false, name = "name") String name,
            @RequestParam(required = false, name = "description") String desc,
            @RequestParam(required = false, name = "price") int price,
            @RequestParam(required = false, name = "type") String type) {
    	int finish = 0;
    	UUID tID = UUID.randomUUID();
        String productID = tID.toString();
        Date date = new Date();
        String sellerID = dao.getsellerID(userID);
        if(type.equals("item")) {
        	finish = dao.insertToAdmin(productID,cID,name,desc,sellerID,price,date,type);
    	}else if(type.equals("service")) {
            finish = dao.insertToAdmin(productID,cID,name,desc,sellerID,price,date,type);
    	}
		return tID;
    }
    
    String[] categ = {"Electronics", "Video Gaming", "Photography", "Toys", "Fashion",
                 "Accessories", "Cosmestics", "Automobiles", "Music", "Baby goods",
                 "Health", "Crafts", "Sports", "Pet Supplies", "Idol Goods"};
    
    String[] img = {"https://imgur.com/KpWYiY6.jpg", "https://imgur.com/nnAERjH.jpg", "https://imgur.com/w8aY41W.jpg", "https://imgur.com/nfZC6t5.jpg", "https://imgur.com/ztoDk0n.jpg", 
    	    "https://imgur.com/wHBy8Ut.jpg", "https://imgur.com/bitIsd1.jpg", "https://imgur.com/qJeNfsi.jpg", "https://imgur.com/mupspdw.jpg", "https://imgur.com/sWASSBU.jpg",
    	    "https://imgur.com/NtO4eEb.jpg", "https://imgur.com/lxUMSrb.jpg", "https://imgur.com/Vt7QnOM.jpg", "https://imgur.com/UVBMFyc.jpg", "https://imgur.com/V1CJaEG.jpg"};
    
    @GetMapping(path = "/admingetcount", produces = "application/json")
    public @ResponseBody AdminOutputCat admingetcount(@RequestParam(required = false, name = "index") int index, @RequestParam(required = false, name = "cID") String cID){
    	int temp = dao.getcountItem(cID);
    	AdminOutputCat info = new AdminOutputCat(img[index],categ[index],temp,cID);
		return info;
    }
    

    @GetMapping(path = "/adminLogin", produces = "application/json")
    public void adminlogin(HttpServletRequest request, HttpServletResponse response) throws IOException{
    	String username = request.getParameter("username");
    	String password = request.getParameter("password");
    	HttpSession session = request.getSession();
    	if(username.equals("admin")&&password.equals("admin")) {
    		session.setAttribute("username", username);
    		session.setAttribute("password", password);
    		response.sendRedirect("/home");
    	}else {
    		response.sendRedirect("/login");
    	}
    }

    
    @GetMapping(path = "/adminMonthlySum", produces = "application/json")
    public @ResponseBody int[] adminMonthlySum(){
    	String[] YearlyItem = new String[12]  ;
    	String[] YearlyService = new String[12];
    	int[] YearlySum  = new int[12] ;
    	//get Item sum
    	for(int i = 1; i<=12;i++) {
    		String temp = dao.getmonthlyitemsum(i);
    		if(temp==null) {
    			YearlyItem[i-1]="0";
    		}else {
    			YearlyItem[i-1]=temp;
    		}
    		System.out.println(YearlyItem[i-1]);
    	}
    	//get Service sum
    	for(int i = 1; i<=12;i++) {
    		String temp = dao.getmonthlyservicesum(i);
    		if(temp==null) {
    			YearlyService[i-1]="0";
    		}else {
    			YearlyService[i-1]=temp;
    		}
    		System.out.println(YearlyService[i-1]);
    	}
    	//get total sum
    	for(int i = 0; i<12;i++) {
    		YearlySum[i]=Integer.parseInt(YearlyItem[i])+Integer.parseInt(YearlyService[i]);
    		System.out.println(YearlySum[i]);
    	}
    	return YearlySum;
    }
    
    @GetMapping(path = "/adminYearlySum", produces = "application/json")
    public @ResponseBody int adminYearlySum(){
    	String[] YearlyItem = new String[12]  ;
    	String[] YearlyService = new String[12];
    	int YearlySum  = 0 ;
    	//get Item sum
    	for(int i = 1; i<=12;i++) {
    		String temp = dao.getmonthlyitemsum(i);
    		if(temp==null) {
    			YearlyItem[i-1]="0";
    		}else {
    			YearlyItem[i-1]=temp;
    		}
    		//System.out.println(YearlyItem[i-1]);
    	}
    	//get Service sum
    	for(int i = 1; i<=12;i++) {
    		String temp = dao.getmonthlyservicesum(i);
    		if(temp==null) {
    			YearlyService[i-1]="0";
    		}else {
    			YearlyService[i-1]=temp;
    		}
    		//System.out.println(YearlyService[i-1]);
    	}
    	//get total sum
    	for(int i = 0; i<12;i++) {
    		YearlySum+=Integer.parseInt(YearlyItem[i])+Integer.parseInt(YearlyService[i]);
    		//System.out.println(YearlySum);
    	}
    	//System.out.println(YearlySum);
    	
    	return YearlySum;
    }
    
    @GetMapping(path = "/adminYearlyTrans", produces = "application/json")
    public @ResponseBody int[] adminYearlyTrans(){

    	int[] YearlySum  = {0,0} ;
    	//get Item sum
    	for(int i = 1; i<=12;i++) {
    		YearlySum[0] += dao.getmonthlyitemnumber(i);
    		//System.out.println(YearlySum[0]);
    	}
    	//get Service sum
    	for(int i = 1; i<=12;i++) {
    		YearlySum[1] += dao.getmonthlyservicenumber(i);
    		//System.out.println(YearlySum[1]);
    	}   	
    	return YearlySum;
    }
    
    @GetMapping(path = "/adminTotalPadding", produces = "application/json")
    public @ResponseBody int adminTotalPadding(){

    	return dao.gettotalpadding();

    }
    
   
}