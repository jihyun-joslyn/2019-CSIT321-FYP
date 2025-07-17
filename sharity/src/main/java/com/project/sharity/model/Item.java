package com.project.sharity.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "item")

public class Item {
    private String itemID;
    private String cID;
    private String iName;
    private String description;
    private String sellerID;
    private int price;
    private int quantity;
    private Date dateAdded;

    public Item() {}

    public Item(@JsonProperty("itemID")String itemID, @JsonProperty("cID")String cID, @JsonProperty("iName")String iName, @JsonProperty("description")String description, @JsonProperty("sellerID")String sellerID, @JsonProperty("price")int price, @JsonProperty("quantity")int quantity, @JsonProperty("dateAdded")Date dateAdded){
        this.itemID = itemID;
        this.cID = cID;
        this.iName = iName;
        this.description = description;
        this.sellerID = sellerID;
        this.price = price;
        this.quantity = quantity;
        this.dateAdded = dateAdded;
    }

    /**
     * @return String return the itemID
     */
    @Id
    public String getItemID() {
        return itemID;
    }

    /**
     * @param itemID the itemID to set
     */
    public void setItemID(String itemID) {
        this.itemID = itemID;
    }

    /**
     * @return String return the cID
     */
    public String getCID() {
        return cID;
    }

    /**
     * @param cID the cID to set
     */
    public void setCID(String cID) {
        this.cID = cID;
    }

    /**
     * @return String return the iName
     */
    public String getIName() {
        return iName;
    }

    /**
     * @param iName the iName to set
     */
    public void setIName(String iName) {
        this.iName = iName;
    }

    /**
     * @return String return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
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
     * @return int return the price
     */
    public int getPrice() {
        return price;
    }

    /**
     * @param price the price to set
     */
    public void setPrice(int price) {
        this.price = price;
    }
    
    /**
     * @return int return the price
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * @param price the price to set
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    /**
     * @return Date return the dateAdded
     */
    public Date getDateAdded() {
        return dateAdded;
    }

    /**
     * @param dateAdded the dateAdded to set
     */
    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }

}