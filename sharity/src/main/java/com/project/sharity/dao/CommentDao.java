package com.project.sharity.dao;

import java.util.List;

import com.project.sharity.model.Comment;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CommentDao extends CrudRepository<Comment, String> {
    @Query(value = "SELECT * FROM comments WHERE productID = :pID AND parent = 'NULL' ORDER BY date_added DESC", nativeQuery = true)
    List<Comment> getParentComments(@Param("pID") String pID);

    @Query(value = "SELECT * FROM comments WHERE productID = :pID AND parent = :cID ORDER BY date_added DESC", nativeQuery = true)
    List<Comment> getChildComments(@Param("pID") String pID, @Param("cID") String cID);

    @Query(value = "SELECT userID FROM user WHERE accountID = :id", nativeQuery = true)
    String getUserID(@Param("id") String accountID);

    @Query(value = "SELECT accountID FROM user WHERE userID = :id", nativeQuery = true)
    String getAccountID(@Param("id") String userID);

    @Query(value = "SELECT rating FROM rating WHERE commentID = :cID", nativeQuery = true)
    int getRatingByComment(@Param("cID") String cID);
}