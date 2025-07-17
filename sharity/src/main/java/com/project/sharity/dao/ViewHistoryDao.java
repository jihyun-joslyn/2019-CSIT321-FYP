package com.project.sharity.dao;

import java.util.List;

import javax.transaction.Transactional;

import com.project.sharity.model.ViewHistory;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ViewHistoryDao extends CrudRepository<ViewHistory, String> {
    @Modifying@Transactional
    @Query(value = "insert into view_history (accountID,productID) values((select accountID from user where userID=:userID),:name)", nativeQuery = true)
    int insertkeyword(@Param("userID")String userID,@Param("name")String name);
    
    @Query(value = "select count(*) from view_history where accountID=(select accountID from user where userID=:userID) and productID=:name", nativeQuery = true)
    int checkviewbefore(@Param("userID")String userID,@Param("name")String name);
	
	 @Query(value = "SELECT * FROM view_history WHERE accountID IN (SELECT accountID FROM user WHERE userID = :uID) ORDER BY viewID DESC", nativeQuery = true)
    List<ViewHistory> getViewHis(@Param("uID")String uID);
	
    @Query(value = "SELECT iName FROM item WHERE itemID = :pID", nativeQuery = true)
    String getIName(@Param("pID")String pID);
	
    @Query(value = "SELECT price FROM item WHERE itemID = :pID", nativeQuery = true)
    int getIPrice(@Param("pID")String pID);
	
    @Query(value = "SELECT sName FROM service WHERE serviceID = :pID", nativeQuery = true)
    String getSName(@Param("pID")String pID);
	
    @Query(value = "SELECT price FROM service WHERE serviceID = :pID", nativeQuery = true)
    int getSPrice(@Param("pID")String pID);
	
    @Query(value = "SELECT img FROM photo WHERE productID = :pID", nativeQuery = true)
    String getImg(@Param("pID")String pID);
	
    @Modifying@Transactional 
    @Query(value = "DELETE FROM view_history WHERE productID = :productID and accountID=(select accountID from user where userID= :userID)", nativeQuery = true)
    int deleteRecord(@Param("productID")String productID,@Param("userID")String userID);
}