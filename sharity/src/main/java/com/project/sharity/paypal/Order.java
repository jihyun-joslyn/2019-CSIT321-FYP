package com.project.sharity.paypal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Order {

	private double price;
	private String currency;
	private String method;
	private String intent;
	private String description;
	public Double getPrice() {
		return price;
	}
	public String getCurrency() {
		return currency;
	}
	public String getMethod() {
		return method;
	}
	public String getIntent() {
		return intent;
	}
	public String getDescription() {
		return description;
	}

}
