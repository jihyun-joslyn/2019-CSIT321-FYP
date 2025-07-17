package com.project.sharity.model;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.sharity.key.RatingID;

@Entity
@Table(name = "rating")

public class Rating implements Serializable{
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private RatingID ratingID;
    private int rating;
    private String commentID;

    public Rating() {}

    public Rating(RatingID ratingID, @JsonProperty("rating")int rating){
        this.ratingID = ratingID;
        this.rating = rating;
    }
    
    public Rating(RatingID ratingID, @JsonProperty("rating")int rating,@JsonProperty("cID")String cID){
        this.ratingID = ratingID;
        this.rating = rating;
        this.commentID = cID;
    }


    /**
     * @return RatingID return the ratingID
     */
    public RatingID getRatingID() {
        return ratingID;
    }

    /**
     * @param ratingID the ratingID to set
     */
    public void setRatingID(RatingID ratingID) {
        this.ratingID = ratingID;
    }

    /**
     * @return int return the rating
     */
    public int getRating() {
        return rating;
    }

    /**
     * @param rating the rating to set
     */
    public void setRating(int rating) {
        this.rating = rating;
    }
    
    /**
     * @return String return the commentID
     */
    public String getCommentID() {
        return commentID;
    }

    /**
     * @param String the commentID to set
     */
    public void setCommentID(String commentID) {
        this.commentID = commentID;
    }

}