package com.project.sharity.model;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.project.sharity.key.SearchHistoryID;

@Entity
@Table(name = "search_history")

public class SearchHistory implements Serializable{
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private SearchHistoryID searchHistoryID;

    public SearchHistory() {}

    public SearchHistory(SearchHistoryID searchHistoryID){
        this.searchHistoryID = searchHistoryID;
    }

    /**
     * @return SearchHistoryID return the searchHistoryID
     */
    public SearchHistoryID getSearchHistoryID() {
        return searchHistoryID;
    }

    /**
     * @param searchHistoryID the searchHistoryID to set
     */
    public void setSearchHistoryID(SearchHistoryID searchHistoryID) {
        this.searchHistoryID = searchHistoryID;
    }

}