package com.project.sharity.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OutputCategory {
    private int index;
    private String cID;
    private String name;

    public OutputCategory(){}

    public OutputCategory(@JsonProperty("index")int index, @JsonProperty("cID")String cID, @JsonProperty("name")String name){
        this.index = index;
        this.cID = cID;
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
     * @return String return the cID
     */
    public String getCID() {
        return cID;
    }

    /**
     * @param cID the cID to set
     */
    public void setCID(String cID) {
        this.cID = cID;
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