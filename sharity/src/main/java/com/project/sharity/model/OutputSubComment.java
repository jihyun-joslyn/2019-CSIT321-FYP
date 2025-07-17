package com.project.sharity.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OutputSubComment {
    private int index;
    private String parent;
    private String userID;
    private String content;
    private String date_added;


    public OutputSubComment() {}

    public OutputSubComment(@JsonProperty("index") int index, @JsonProperty("parent") String parent, @JsonProperty("userID") String userID, @JsonProperty("content") String content, @JsonProperty("date_added") String date_added) {
        this.index = index;
        this.userID = userID;
        this.parent = parent;
        this.content = content;
        this.date_added = date_added;
    }

    public OutputSubComment(@JsonProperty("index") int index, @JsonProperty("userID") String userID,
            @JsonProperty("content") String content, @JsonProperty("date_added") String date_added) {
        this.index = index;
        this.userID = userID;
        this.content = content;
        this.date_added = date_added;
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
     * @return String return the userID
     */
    public String getUserID() {
        return userID;
    }

    /**
     * @param userID the userID to set
     */
    public void setUserID(String userID) {
        this.userID = userID;
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
     * @return String return the date_added
     */
    public String getDate_added() {
        return date_added;
    }

    /**
     * @param date_added the date_added to set
     */
    public void setDate_added(String date_added) {
        this.date_added = date_added;
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

}