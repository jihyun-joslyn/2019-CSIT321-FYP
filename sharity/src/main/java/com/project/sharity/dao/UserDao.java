package com.project.sharity.dao;

import java.util.List;

import javax.transaction.Transactional;

import com.project.sharity.model.User;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserDao extends CrudRepository<User, String> {
    @Query(value = "SELECT password FROM user WHERE userID = :id", nativeQuery = true)
    String checkUser(@Param("id") String id);

    @Query(value = "SELECT accountID FROM user WHERE userID = :id", nativeQuery = true)
    String checkUID(@Param("id") String id);
    
    @Modifying@Transactional
    @Query(value = "UPDATE user SET password = :nPwd WHERE userID = :id", nativeQuery = true)
    int changePwd(@Param("nPwd") String nPwd, @Param("id")String id);

    @Modifying@Transactional 
    @Query(value = "UPDATE user SET userID = :uID, email = :email, address = :addr, bio = :bio, name = :name WHERE accountID = :id", nativeQuery = true)
    int changeInfo(@Param("uID") String uID, @Param("email") String email, @Param("addr") String addr, @Param("bio")String bio, @Param("id")String id, @Param("name")String name);
    
    @Query(value = "SELECT * FROM user WHERE userID = :id", nativeQuery = true)
    User selectUser(@Param("id")String id);
    
    @Query(value = "SELECT phone FROM user WHERE userID = :id", nativeQuery = true)
    String getPhone(@Param("id")String id);
    
    @Query(value = "SELECT * FROM user ", nativeQuery = true)
    List<User> getAllUser();
    
    @Query(value = "SELECT * FROM user WHERE userID LIKE CONCAT('%',:username,'%')", nativeQuery = true)
    List<User> getByUsername(@Param("username")String username);
}