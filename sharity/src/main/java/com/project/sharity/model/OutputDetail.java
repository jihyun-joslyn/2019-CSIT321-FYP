package com.project.sharity.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OutputDetail {
    private String productID;
    private String category;
    private String name;
    private String description;
    private String seller;
    private int price;
    private int quantity;
    private String editprice;
    private String editquantity;


    public OutputDetail(){}

    public OutputDetail(@JsonProperty("productID")String productID, @JsonProperty("category")String category, @JsonProperty("name")String name, @JsonProperty("description")String description, @JsonProperty("seller")String seller, @JsonProperty("price")int price){
        this.productID = productID;
        this.category = category;
        this.name = name;
        this.description = description;
        this.seller = seller;
        this.price = price;
    }

    /**
     * @return String return the productID
     */
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
     * @return String return the category
     */
    public String getCategory() {
        return category;
    }

    /**
     * @param category the category to set
     */
    public void setCategory(String category) {
        this.category = category;
    }

    /**
     * @return String return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
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
     * @return String return the seller
     */
    public String getSeller() {
        return seller;
    }

    /**
     * @param seller the seller to set
     */
    public void setSeller(String seller) {
        this.seller = seller;
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
    

    public String getEditPrice() {
        return editprice;
    }

    public void setEditPrice(String editprice) {
        this.editprice = editprice;
    }

    public String getEditQuantity() {
        return editquantity;
    }

    public void setEditQuantity(String editquantity ) {
        this.editquantity = editquantity;
    }
}