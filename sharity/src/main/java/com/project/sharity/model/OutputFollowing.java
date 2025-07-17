package com.project.sharity.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OutputFollowing {
    private int index;
    private String userID;
    private String name;

    public OutputFollowing(){}

    public OutputFollowing(@JsonProperty("index")int index, @JsonProperty("userID")String userID, @JsonProperty("name")String name){
        this.index = index;
        this.userID = userID;
        this.name = name;
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

}