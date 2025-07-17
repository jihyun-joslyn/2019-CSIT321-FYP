package com.project.sharity.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OutputItem {
    private int index;
    private String productID;
    private String cID;
    private String name;
    private String sellerName;
    private int price;
    private String img;
    private int quantity;
    private String type;

    public OutputItem(){};

    public OutputItem(@JsonProperty("index")int index, @JsonProperty("productID")String productID, @JsonProperty("cID")String cID, @JsonProperty("name")String name, @JsonProperty("sellerID")String sellerName, @JsonProperty("price")int price, @JsonProperty("img")String img){
        this.index = index;
        this.productID = productID;
        this.cID = cID;
        this.name = name;
        this.sellerName = sellerName;
        this.price = price;
        this.img = img;
    }

    /**
     * @return int return the index
     */
    public int getIndex() {
        return index;
    }

    /**
     * @param index the index to set
     */
    public void setIndex(int index) {
        this.index = index;
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
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return String return the sellerName
     */
    public String getSellerName() {
        return sellerName;
    }

    /**
     * @param sellerID the sellerName to set
     */
    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
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
    
    /**
     * @return String return the type
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * @param type the type to set
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    
    /**
     * @return String return the type
     */
    public String getimg() {
        return img;
    }

    /**
     * @param type the type to set
     */
    public void setimg(String img) {
        this.img = img;
    }

}