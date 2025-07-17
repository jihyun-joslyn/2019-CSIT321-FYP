package com.project.sharity.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "sub_category")

public class SubCategory {
    private String subCID;
    private String cID;
    private String cName;

    public SubCategory() {}

    public SubCategory(@JsonProperty("subCID")String subCID, @JsonProperty("cID")String cID, @JsonProperty("cName")String cName){
        this.subCID = subCID;
        this.cID = cID;
        this.cName = cName;
    }

    /**
     * @return String return the subCID
     */
    @Id
    public String getSubCID() {
        return subCID;
    }

    /**
     * @param subCID the subCID to set
     */
    public void setSubCID(String subCID) {
        this.subCID = subCID;
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