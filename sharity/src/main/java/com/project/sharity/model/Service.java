package com.project.sharity.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="service")
public class Service {
    private String serviceID;
    private String cID;
    private String sName;
    private String description;
    private String sellerID;
    private int price;
    private Date dateAdded;

    public Service() {}

    public Service(@JsonProperty("serivceID")String serviceID, @JsonProperty("cID")String cID, @JsonProperty("sName")String sName, @JsonProperty("description")String description, @JsonProperty("sellerID")String sellerID, @JsonProperty("price")int price, @JsonProperty("date_added")Date dateAdded){
        this.serviceID = serviceID;
        this.cID = cID;
        this.sName = sName;
        this.description = description;
        this.sellerID = sellerID;
        this.price = price;
        this.dateAdded = dateAdded;
    }

    /**
     * @return String return the serviceID
     */
    @Id
    public String getServiceID() {
        return serviceID;
    }

    /**
     * @param serviceID the serviceID to set
     */
    public void setServiceID(String serviceID) {
        this.serviceID = serviceID;
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
     * @return String return the sName
     */
    public String getSName() {
        return sName;
    }

    /**
     * @param sName the sName to set
     */
    public void setSName(String sName) {
        this.sName = sName;
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