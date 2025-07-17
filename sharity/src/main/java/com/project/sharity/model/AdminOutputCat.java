package com.project.sharity.model;

import org.springframework.web.bind.annotation.RequestParam;

public class AdminOutputCat {
    private String image;
    private String name;
    private int count;
    private String cID;



    public AdminOutputCat(){}

    public AdminOutputCat(@RequestParam("image")String image,@RequestParam("name")String name, @RequestParam("count")int count, @RequestParam("cID")String cID){
        this.image = image;
        this.name = name;
        this.count = count;
        this.cID = cID;

    }
    
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
    
    public String getcID() {
        return cID;
    }

    public void setcID(String cID) {
        this.cID = cID;
    }


}