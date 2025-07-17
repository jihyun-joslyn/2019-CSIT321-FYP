package com.project.sharity.dao;

import java.util.List;

import javax.transaction.Transactional;

import com.project.sharity.model.SearchHistory;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface SearchHistoryDao extends CrudRepository<SearchHistory, String> {
    @Query(value = "SELECT * FROM search_history WHERE accountID IN (SELECT accountID FROM user WHERE userID = :uID)", nativeQuery = true)
    List<SearchHistory> KeywordList(@Param("uID")String uID);
    
    @Modifying@Transactional
    @Query(value = "insert into search_history (accountID,keyword) values((select accountID from user where userID=:userID),:name)", nativeQuery = true)
    int insertkeyword(@Param("userID")String userID,@Param("name")String name);
    
    @Query(value = "select count(*) from search_history where accountID=(select accountID from user where userID=:userID) and keyword=:name", nativeQuery = true)
    int checkinsertbefore(@Param("userID")String userID,@Param("name")String name);
}