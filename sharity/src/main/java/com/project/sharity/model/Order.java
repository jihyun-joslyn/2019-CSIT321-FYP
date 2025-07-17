package com.project.sharity.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.sharity.key.OrderID;

@Entity
@Table(name = "orders")

public class Order implements Serializable {
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private OrderID orderID;
    private int quantity;
    private String sellerID;
    private Date dateAdded;

    public Order() {
    }

    public Order(OrderID orderID, @JsonProperty("quantity") int quantity, @JsonProperty("sellerID") String sellerID,
            @JsonProperty("dateAdded") Date dateAdded) {
        this.orderID = orderID;
        this.quantity = quantity;
        this.sellerID = sellerID;
        this.dateAdded = dateAdded;
    }

    /**
     * @return OrderID return the orderID
     */
    public OrderID getOrderID() {
        return orderID;
    }

    /**
     * @param orderID the orderID to set
     */
    public void setOrderID(OrderID orderID) {
        this.orderID = orderID;
    }

    /**
     * @return String return the sellerID
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * @param sellerID the sellerID to set
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    
    /**
     * @return String return the sellerID
     */
    public String getSellerID() {
        return sellerID;
    }

    /**
     * @param sellerID the sellerID to set
     */
    public void setSellerID(String sellerID) {
        this.sellerID = sellerID;
    }

    /**
     * @return Date return the date_added
     */
    public Date getDateAdded() {
        return dateAdded;
    }

    /**
     * @param date_added the date_added to set
     */
    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }

}