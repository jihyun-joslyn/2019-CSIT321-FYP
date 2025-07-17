package com.project.sharity.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class AdminSendEmail {

	private JavaMailSender javaMailSender;
	
	@Autowired
	public AdminSendEmail(JavaMailSender javaMailSender){
		this.javaMailSender = javaMailSender;
	}
	
	public void sendEmail(String email,String name) throws MailException {
		// send email
		String title = "Important!! Email from Sharity";
	    String Info = "Deer customer, \n One of your item/service ( "+name+" ) have violate the policy of our application. \n Please check your own profilefor detail.";
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(email);
		mail.setFrom("uccusodirty@gmail.com");
		mail.setSubject(title);
		mail.setText(Info);		
		
		javaMailSender.send(mail);
	}
	
	public void ItemSendEmailtoSeller (String buy_name, String buy_email, String buy_phone, String seller_email, String Item_name, String Quantities) {
		String title = "Seller Invoive";
	    String body = "Invoice \n Item name: " +Item_name+ "\n Quantities: " + Quantities + "\n Customer name: " +buy_name+ "\n Contact Email: " +buy_email+ "\n Contact Tel: "+buy_phone;
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(seller_email);
		mail.setFrom("uccusodirty@gmail.com");
		mail.setSubject(title);
		mail.setText(body);
		
		javaMailSender.send(mail);
	}
	
	public void ServiceSendEmailtoSeller (String buy_name, String buy_email, String buy_phone, String seller_email, String Item_name) {
		String title = "Seller Invoive";
	    String body = "Invoice \n Service name: " +Item_name+ "\n Customer name: " +buy_name+ "\n Contact Email: " +buy_email+ "\n Contact Tel: "+buy_phone;
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(seller_email);
		mail.setFrom("uccusodirty@gmail.com");
		mail.setSubject(title);
		mail.setText(body);
		
		javaMailSender.send(mail);
	}
	
}