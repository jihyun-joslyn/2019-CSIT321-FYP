package com.project.sharity.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.sharity.key.CartID;

@Entity
@Table(name = "cart")
public class Cart implements Serializable {
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private CartID cartID;
    private int quantity;
    private Date dateAdded;

    public Cart() {
    }

    public Cart(CartID cartID, @JsonProperty("quantity") int quantity,@JsonProperty("dateAdded") Date dateAdded) {
        this.cartID = cartID;
        this.quantity = quantity;
        this.dateAdded = dateAdded;
    }

    /**
     * @return CartID return the cartID
     */
    public CartID getCartID() {
        return cartID;
    }

    /**
     * @param cartID the cartID to set
     */
    public void setCartID(CartID cartID) {
        this.cartID = cartID;
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
     * @return Date return the dateAdded
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * @param dateAdded the dateAdded to set
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}