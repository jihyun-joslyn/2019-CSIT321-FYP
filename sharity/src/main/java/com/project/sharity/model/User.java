package com.project.sharity.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "user")

public class User {
    private String accountID;
    private String userID;
    private String password;
    private String name;
    private String phone;
    private String email;
    private String address;
    private String bio;

    public User() {}

    public User(@JsonProperty("accountID")String accountID, @JsonProperty("userID")String userID, @JsonProperty("password")String password, @JsonProperty("name")String name, @JsonProperty("email")String email, @JsonProperty("address")String address, @JsonProperty("bio") String bio)
    {
        this.accountID = accountID;
        this.userID = userID;
        this.password = password;
        this.name = name;
        this.email = email;
        this.address = address;
        this.bio = bio;
    }

    public User(@JsonProperty("accountID")String accountID, @JsonProperty("userID")String userID, @JsonProperty("password")String password, @JsonProperty("name")String name, @JsonProperty("phone")String phone, @JsonProperty("email")String email)
    {
        this.accountID = accountID;
        this.userID = userID;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = "";
        this.bio = "";
    }

    /**
     * @return String return the accountID
     */
    @Id
    public String getAccountID() {
        return accountID;
    }

    /**
     * @param accountID the accountID to set
     */
    public void setAccountID(String accountID) {
        this.accountID = accountID;
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
     * @return String return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
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
    
    /**
     * @return String return the name
     */
    public String getphone() {
        return phone;
    }

    /**
     * @param name the name to set
     */
    public void setphone(String phone) {
        this.phone = phone;
    }
    
    /**
     * @return String return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return String return the address
     */
    public String getAddress() {
        return address;
    }

    /**
     * @param address the address to set
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * @return String return the bio
     */
    public String getBio() {
        return bio;
    }

    /**
     * @param bio the bio to set
     */
    public void setBio(String bio) {
        this.bio = bio;
    }



}