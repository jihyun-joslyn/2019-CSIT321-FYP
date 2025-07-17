package com.project.sharity.model;

public class OutputTransaction {
    private int index;
    private String transactionID;
    private int tprice;
    private String date_added;
    private String photo1;
    private String photo2;
    private String photo3;


    public int getIndex() {
        return index;
    }


    public void setIndex(int index) {
        this.index = index;
    }


    public String getTransactionID() {
        return transactionID;
    }


    public void setTransactionID(String transactionID) {
        this.transactionID = transactionID;
    }

    public int getTPrice() {
        return tprice;
    }


    public void setTPrice(int tprice) {
        this.tprice = tprice;
    }
    
    public String getDate_added() {
        return date_added;
    }

    public void setDate_added(String string) {
        this.date_added = string;
    }

    public String getPhoto1() {
        return photo1;
    }

    public void setPhoto1(String photo1) {
        this.photo1 = photo1;
    }

    public String getPhoto2() {
        return photo2;
    }

    public void setPhoto2(String photo2) {
        this.photo2 = photo2;
    }
    
    public String getPhoto3() {
        return photo3;
    }

    public void setPhoto3(String photo3) {
        this.photo3 = photo3;
    }
}