package com.project.sharity.model;


import com.fasterxml.jackson.annotation.JsonProperty;

public class OutputOrder {
    private int index;
    private String productID;
    private String name;
    private String sellerName;
    private int price;
    private String image;
    private String type;

    public OutputOrder(){};

    public OutputOrder(@JsonProperty("index")int index, @JsonProperty("productID")String productID,@JsonProperty("name")String name, @JsonProperty("description")String description, @JsonProperty("sellerID")String sellerName, @JsonProperty("price")int price, @JsonProperty("image")String image){
        this.index = index;
        this.productID = productID;
        this.name = name;
        this.sellerName = sellerName;
        this.price = price;
        this.image = image;
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
     * @param sellerName the sellerName to set
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
    public String getImage() {
        return image;
    }

    /**
     * @param type the type to set
     */
    public void setImage(String image) {
        this.image = image;
    }
}