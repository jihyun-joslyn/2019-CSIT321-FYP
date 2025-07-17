package com.project.sharity.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "category")
public class Category {
    private String categoryID;
    private String cName;

    public Category() {}

    public Category(@JsonProperty("categoryID") String categoryID, @JsonProperty("cName")String cName){
        this.categoryID = categoryID;
        this.cName = cName;
    }

    /**
     * @return String return the categoryID
     */
    @Id
    public String getCategoryID() {
        return categoryID;
    }

    /**
     * @param categoryID the categoryID to set
     */
    public void setCategoryID(String categoryID) {
        this.categoryID = categoryID;
    }

    /**
     * @return String return the cName
     */
    public String getCName() {
        return cName;
    }

    /**
     * @param cName the cName to set
     */
    public void setCName(String cName) {
        this.cName = cName;
    }

}