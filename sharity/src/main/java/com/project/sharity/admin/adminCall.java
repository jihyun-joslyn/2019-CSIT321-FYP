package com.project.sharity.admin;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.project.sharity.dao.AdminDao;
import com.project.sharity.model.Admin;

@Controller

public class adminCall {
	
	
	@RequestMapping("login")
	public String login() {
		return "login";
	}
	
	@Autowired
	private AdminDao dao;
	@GetMapping(path = "/adminPass", produces = "application/json")
    public String adminPass (@RequestParam(required = false, name = "pID") String pID){
    	Admin temp = dao.getItemDetail(pID);
    	int finish = 0;
    	String text= "not finish";
    	if(temp.getType().equals("item")) {
    		finish = dao.insertBackToItem(temp.getProductID(),temp.getCID(),temp.getName(),temp.getDescription(),temp.getSellerID(),temp.getPrice(),temp.getDateAdded());
    		if(finish==1) {
    			text ="Item finish";
    			dao.dropProduct(pID);
    		}
    		
    	}else if(temp.getType().equals("service")) {
    		finish = dao.insertBackToService(temp.getProductID(),temp.getCID(),temp.getName(),temp.getDescription(),temp.getSellerID(),temp.getPrice(),temp.getDateAdded());
    		if(finish==1) {
    			text ="Service finish";
    			dao.dropProduct(pID);
    		}
    	}
		if (text.equals("Item finish")) {
			return "pend_product_list";
		}else if(text.equals("Service finish")){
			return "pend_service_list";
		}
		return "home";
    }
	

	@RequestMapping("/home")
	public String home(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(10*60);
		String username = session.getAttribute("username").toString();
		String password = session.getAttribute("password").toString();
		if(username.equals("admin")&& password.equals("admin")) {
			
			return "home";
		}
		return "login";
		
	}
	
	@RequestMapping("/logout")
	public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(10*60);
		session.removeAttribute("username");
		session.removeAttribute("password");
		
		response.sendRedirect("/login");
		
	}
	
	@RequestMapping("/productdetails")
	public String detail(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(10*60);
		String username = session.getAttribute("username").toString();
		String password = session.getAttribute("password").toString();
		if(username.equals("admin")&& password.equals("admin")) {
			return "product_details";
		}
		return "login";
	}
	
	@RequestMapping("/servicedetails")
	public String servicedetails(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(10*60);
		String username = session.getAttribute("username").toString();
		String password = session.getAttribute("password").toString();
		if(username.equals("admin")&& password.equals("admin")) {
			return "service_details";
		}
		return "login";
	}
	
	@RequestMapping("/penddetails")
	public String penddetails(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(10*60);
		String username = session.getAttribute("username").toString();
		String password = session.getAttribute("password").toString();
		if(username.equals("admin")&& password.equals("admin")) {
			return "pend_detail";
		}
		return "login";
	}
	
	
	@RequestMapping("/productlist")
	public String productlist(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(10*60);
		String username = session.getAttribute("username").toString();
		String password = session.getAttribute("password").toString();
		if(username.equals("admin")&& password.equals("admin")) {
			return "product_cate_list";
		}
		return "login";
	}
	
	
	@RequestMapping("/servicelist")
	public String servicelist(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(10*60);
		String username = session.getAttribute("username").toString();
		String password = session.getAttribute("password").toString();
		if(username.equals("admin")&& password.equals("admin")) {
			return "service_cate_list";
		}
		return "login";
	}
	
	@RequestMapping("/pendpl")
	public String pendpl(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(10*60);
		String username = session.getAttribute("username").toString();
		String password = session.getAttribute("password").toString();
		if(username.equals("admin")&& password.equals("admin")) {
			return "pend_product_list";
		}
		return "login";
	}
	
	@RequestMapping("/pendsl")
	public String pendsl(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(10*60);
		String username = session.getAttribute("username").toString();
		String password = session.getAttribute("password").toString();
		if(username.equals("admin")&& password.equals("admin")) {
			return "pend_service_list";
		}
		return "login";
	}
	
	@RequestMapping("/alluser")
	public String alluser(HttpServletRequest request){
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(10*60);
		String username = session.getAttribute("username").toString();
		String password = session.getAttribute("password").toString();
		if(username.equals("admin")&& password.equals("admin")) {
			return "all_user";
		}
		return "login";
	}
	
	
	@RequestMapping("/searchproduct")
	public String searchproduct(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(10*60);
		String username = session.getAttribute("username").toString();
		String password = session.getAttribute("password").toString();
		if(username.equals("admin")&& password.equals("admin")) {
			return "search_product_list";
		}
		return "login";
	}
	
	@RequestMapping("/searchservice")
	public String searchservice(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(10*60);
		String username = session.getAttribute("username").toString();
		String password = session.getAttribute("password").toString();
		if(username.equals("admin")&& password.equals("admin")) {
			return "search_service_list";
		}
		return "login";
	}
	
	@RequestMapping("/search")
	public void search(HttpServletRequest request, HttpServletResponse response) throws IOException {
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(10*60);
		String username = session.getAttribute("username").toString();
		String password = session.getAttribute("password").toString();
		if(username.equals("admin")&& password.equals("admin")) {
			String name = request.getParameter("searchName");
			String type = request.getParameter("search_type");
			if(type.equals("product")) {
				response.sendRedirect("/searchproduct" + "?name=" + name);
			}else {
				response.sendRedirect("/searchservice" + "?name=" + name);
			}
		}
	}
	
	@RequestMapping("/searchuser")
	public String searchuser(HttpServletRequest request, Model model) {
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(10*60);
		String username = session.getAttribute("username").toString();
		String password = session.getAttribute("password").toString();
		if(username.equals("admin")&& password.equals("admin")) {
			String name = request.getParameter("search_name");
			model.addAttribute("name", name);
			return "search_user";
		}
		return "login";
	}
}
