package com.project.sharity.key;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import com.fasterxml.jackson.annotation.JsonProperty;
@Embeddable
public class PhotoID implements Serializable{
	/**
     *
     */
    private static final long serialVersionUID = 1L;
    @Column(name = "productID")
    private String productID;
	@Column(name = "img")
    private String img;

    public PhotoID() {}

    public PhotoID(@JsonProperty("productID")String productID, @JsonProperty("img")String img){
        this.productID = productID;
        this.img = img;
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


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PhotoID pID = (PhotoID) o;
        return productID.equals(pID.productID) &&
        		img.equals(pID.img);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productID, img);
    }

    


    
}
