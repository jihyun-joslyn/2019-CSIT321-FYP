package com.project.sharity.model;

import java.util.Date;

public class AdminRecentTrans {
    private String transactionID;
    private String accountID;
    private String method;
    private int tPrice;
    private Date date_added;


    public String getTransactionID() {
        return transactionID;
    }

    public void setTransactionID(String transactionID) {
        this.transactionID = transactionID;
    }


    public String getAccountID() {
        return accountID;
    }

    public void setAccountID(String accountID) {
        this.accountID = accountID;
    }


    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }


    public int getTPrice() {
        return tPrice;
    }

    public void setTPrice(int tPrice) {
        this.tPrice = tPrice;
    }


    public Date getDate_Added() {
        return date_added;
    }

    public void setDate_Added(Date date_added) {
        this.date_added = date_added;
    }


}