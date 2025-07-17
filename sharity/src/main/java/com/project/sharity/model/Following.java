package com.project.sharity.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.sharity.key.FollowingID;

@Entity
@Table(name = "following")
public class Following implements Serializable{
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private FollowingID followingID;
    private Date dateAdded;

    public Following() {}

    public Following(FollowingID followingID, @JsonProperty("dateAdded")Date dateAdded){
        this.followingID = followingID;
        this.dateAdded = dateAdded;
    }


    /**
     * @return FollowingID return the followingID
     */
    public FollowingID getFollowingID() {
        return followingID;
    }

    /**
     * @param followingID the followingID to set
     */
    public void setFollowingID(FollowingID followingID) {
        this.followingID = followingID;
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