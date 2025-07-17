package com.project.sharity.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.sharity.key.FavouritesID;

@Entity
@Table(name = "favourites")
public class Favourites implements Serializable{
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private FavouritesID favouritesID;
    private Date dateAdded;

    public Favourites() {}
    
    public Favourites(FavouritesID favouritesID, @JsonProperty("dateAdded")Date dateAdded){
        this.favouritesID = favouritesID;
        this.dateAdded = dateAdded;
    }
    

    /**
     * @return FavouritesID return the favouritesID
     */
    public FavouritesID getFavouritesID() {
        return favouritesID;
    }

    /**
     * @param favouritesID the favouritesID to set
     */
    public void setFavouritesID(FavouritesID favouritesID) {
        this.favouritesID = favouritesID;
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