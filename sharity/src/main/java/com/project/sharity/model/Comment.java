package com.project.sharity.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "comments")
public class Comment {
    private String commentID;
    private String accountID;
    private String productID;
    private String parent;
    private String content;
    private Date dateAdded;

    public Comment() {}

    public Comment(@JsonProperty("commentID")String commentID, @JsonProperty("accountID")String accountID, @JsonProperty("productID")String productID, @JsonProperty("parent")String parent, @JsonProperty("content")String content, @JsonProperty("dateAdded")Date dateAdded){
        this.commentID = commentID;
        this.accountID = accountID;
        this.productID = productID;
        this.parent = parent;
        this.content = content;
        this.dateAdded = dateAdded;
    }

    /**
     * @return String return the commentID
     */
    @Id
    public String getCommentID() {
        return commentID;
    }

    /**
     * @param commentID the commentID to set
     */
    public void setCommentID(String commentID) {
        this.commentID = commentID;
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

    /**
     * @return String return the parent
     */
    public String getParent() {
        return parent;
    }

    /**
     * @param parent the parent to set
     */
    public void setParent(String parent) {
        this.parent = parent;
    }

    /**
     * @return String return the content
     */
    public String getContent() {
        return content;
    }

    /**
     * @param content the content to set
     */
    public void setContent(String content) {
        this.content = content;
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