package com.project.sharity.key;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import com.fasterxml.jackson.annotation.JsonProperty;
@Embeddable
public class RatingID implements Serializable{
	
    private static final long serialVersionUID = 1L;
    @Column(name = "accountID")
    private String accountID;
	@Column(name = "productID")
    private String productID;

    public RatingID() {}

    public RatingID(@JsonProperty("accountID")String accountID, @JsonProperty("productID")String productID){
        this.accountID = accountID;
        this.productID = productID;
    }

    /**
     * @return String return the accountID
     */
    public String getAccountID() {
        return accountID;
    }

    /**
     * @param accountID the accountID to set
     */
    public void setAccountID(String accountID) {
        this.accountID = accountID;
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

    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RatingID ratingID = (RatingID) o;
        return accountID.equals(ratingID.accountID) &&
        		productID.equals(ratingID.productID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(accountID, productID);
    }

    

}
