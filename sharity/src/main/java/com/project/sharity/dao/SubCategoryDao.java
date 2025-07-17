package com.project.sharity.dao;

import java.util.List;

import com.project.sharity.model.SubCategory;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface SubCategoryDao extends CrudRepository<SubCategory, String> {
    @Query(value = "SELECT * FROM sub_category WHERE cID = :cID", nativeQuery = true)
    List<SubCategory> getSubCatList(@Param("cID")String cID);
}