package com.project.sharity.dao;

import com.project.sharity.key.PhotoID;
import com.project.sharity.model.Photo;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface PhotoDao extends CrudRepository<Photo, PhotoID> {
	
    @Query(value = "SELECT * FROM photo where productID = :productID", nativeQuery = true)
    List<Photo> getphoto(@Param("productID")String productID);
    
    @Modifying@Transactional
   	@Query(value ="Insert into photo (productID,img) Values (:productID, :img)", nativeQuery = true)
   	Integer insertimg(@Param("productID") String productID,@Param("img") String img);
    
    @Modifying@Transactional
   	@Query(value ="UPDATE photo SET img= :img where productID= :productID", nativeQuery = true)
   	Integer updateimg(@Param("productID") String productID,@Param("img") String img);
    
    @Modifying@Transactional 
    @Query(value = "DELETE FROM photo WHERE productID = :productID", nativeQuery = true)
    int deletephoto(@Param("productID")String productID);
}