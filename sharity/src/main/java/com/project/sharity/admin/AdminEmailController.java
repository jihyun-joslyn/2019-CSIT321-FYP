package com.project.sharity.admin;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AdminEmailController {
	
	private Logger logger = LoggerFactory.getLogger(AdminEmailController.class);
	
	@Autowired
	private AdminSendEmail email;
	
	@RequestMapping("/sendemail")
	public void signupSuccess(@RequestParam(("useremail"))String useremail,@RequestParam(("name"))String name,@RequestParam(("type"))String type, HttpServletResponse response) throws IOException{
		
		try {
			email.sendEmail(useremail,name);
		}catch( MailException e ){
			// catch error
			logger.info("Error Sending Email: " + e.getMessage());
		}
		System.out.print("success to redirect");
		if(type.equals("item")) {
			response.sendRedirect("/pendpl");
		}else {
			response.sendRedirect("/pendsl");
		}
	}
	
}