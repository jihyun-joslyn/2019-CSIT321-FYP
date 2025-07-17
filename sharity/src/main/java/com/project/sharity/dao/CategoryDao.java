package com.project.sharity.dao;

import java.util.List;

import com.project.sharity.model.Category;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CategoryDao extends CrudRepository<Category, String> {
    @Query(value = "SELECT * FROM category", nativeQuery = true)
    List<Category> getAllCat();
}