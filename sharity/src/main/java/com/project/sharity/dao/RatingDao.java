package com.project.sharity.dao;

import java.util.List;

import com.project.sharity.key.RatingID;
import com.project.sharity.model.Rating;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface RatingDao extends CrudRepository<Rating, RatingID> {
    @Query(value = "SELECT rating FROM rating WHERE productID = :pID", nativeQuery = true)
    List<Integer> getProductRating(@Param("pID") String pID);

    @Query(value = "SELECT userID FROM user WHERE accountID = :id", nativeQuery = true)
    String getUserID(@Param("id") String accountID);

    @Query(value = "SELECT accountID FROM user WHERE userID = :id", nativeQuery = true)
    String getAccountID(@Param("id") String userID);
}