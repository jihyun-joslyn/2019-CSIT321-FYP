package com.project.sharity.dao;

import java.util.List;

import com.project.sharity.key.FollowingID;
import com.project.sharity.model.Following;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface FollowingDao extends CrudRepository<Following, FollowingID> {
    @Query(value = "SELECT * FROM following WHERE accountID IN (SELECT accountID FROM user WHERE userID = :userID) ORDER BY date_added DESC", nativeQuery = true)
    List<Following> FollowingList(@Param("userID")String userID);

    @Query(value = "SELECT userID FROM user WHERE accountID = :id", nativeQuery = true)
    String getUserID(@Param("id")String accountID);

    @Query(value = "SELECT name FROM user WHERE accountID = :uID", nativeQuery = true)
    String getUserName(@Param("uID")String userID);

    @Query(value = "SELECT accountID FROM user WHERE userID = :id", nativeQuery = true)
    String getAccountID(@Param("id")String userID);
    
    @Query(value = "SELECT * FROM following WHERE accountID = :userID and followingID= :followID", nativeQuery = true)
    String checkfollow(@Param("userID")String userID,@Param("followID")String followID);
}