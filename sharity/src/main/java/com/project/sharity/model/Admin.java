package com.project.sharity.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "admin")

public class Admin {
    private String productID;
    private String cID;
    private String name;
    private String description;
    private String sellerID;
    private int price;
    private Date dateAdded;
    private String type;

    public Admin() {}

    public Admin(@JsonProperty("productID")String productID, @JsonProperty("cID")String cID, @JsonProperty("name")String name, @JsonProperty("description")String description, @JsonProperty("sellerID")String sellerID, @JsonProperty("price")int price, @JsonProperty("dateAdded")Date dateAdded, @JsonProperty("type")String type){
        this.productID = productID;
        this.cID = cID;
        this.name = name;
        this.description = description;
        this.sellerID = sellerID;
        this.price = price;
        this.dateAdded = dateAdded;
        this.type = type;
    }

    /**
     * @return String return the productID
     */
    @Id
    public String getProductID() {
        return productID;
    }

    /**
     * @param productID the productID to set
     */
    public void setProductID(String productID) {
        this.productID = productID;
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
     * @return String return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param iName the iName to set
     */
    public void setName(String name) {
        this.name = name;
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
    
    /**
     * @return String return the type
     */
    public String getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(String type) {
        this.type = type;
    }
}