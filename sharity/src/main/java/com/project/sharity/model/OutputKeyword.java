package com.project.sharity.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OutputKeyword {
    private int index;
    private String keyword;

    public OutputKeyword(){}

    public OutputKeyword(@JsonProperty("index")int index, @JsonProperty("keyword")String keyword){
        this.index = index;
        this.keyword = keyword;
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
     * @return String return the keyword
     */
    public String getKeyword() {
        return keyword;
    }

    /**
     * @param keyword the keyword to set
     */
    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

}