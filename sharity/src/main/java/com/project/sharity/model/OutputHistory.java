package com.project.sharity.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OutputHistory {
    private String index;
    private String id;
    private String productID;
    private String name;
    private int price;
    private String img;
    private String type;

    public OutputHistory() {}

    public OutputHistory(@JsonProperty("index")String index, @JsonProperty("id")String id, @JsonProperty("productID")String productID, @JsonProperty("name")String name, @JsonProperty("price")int price, @JsonProperty("img")String img){
        this.index = index;
        this.id = id;
        this.productID = productID;
        this.name = name;
        this.price = price;
        this.img = img;
    }

    /**
     * @return String return the index
     */
    public String getIndex() {
        return index;
    }

    /**
     * @param index the index to set
     */
    public void setIndex(String index) {
        this.index = index;
    }

    /**
     * @return String return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
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
     * @return String return the img
     */
    public String getImg() {
        return img;
    }

    /**
     * @param img the img to set
     */
    public void setImg(String img) {
        this.img = img;
    }
    
    /**
     * @return String return the img
     */
    public String getType() {
        return type;
    }

    /**
     * @param img the img to set
     */
    public void setType(String type) {
        this.type = type;
    }

}