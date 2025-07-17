package com.project.sharity.key;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import com.fasterxml.jackson.annotation.JsonProperty;
@Embeddable
public class FollowingID implements Serializable{
	
    private static final long serialVersionUID = 1L;
    @Column(name = "accountID")
    private String accountID;
	@Column(name = "followingID")
    private String followingID;

    public FollowingID() {}

    public FollowingID(@JsonProperty("accountID")String accountID, @JsonProperty("followingID")String followingID){
        this.accountID = accountID;
        this.followingID = followingID;
    }

    /**
     * @return String return the accountID
     */
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
     * @return String return the followingID
     */
    public String getFollowingID() {
        return followingID;
    }

    /**
     * @param followingID the followingID to set
     */
    public void setFollowingID(String followingID) {
        this.followingID = followingID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FollowingID fID = (FollowingID) o;
        return accountID.equals(fID.accountID) &&
        		followingID.equals(fID.followingID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(accountID, followingID);
    }

    


    

}
