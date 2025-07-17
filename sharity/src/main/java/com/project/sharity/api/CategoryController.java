package com.project.sharity.api;

import java.util.ArrayList;
import java.util.List;

import com.project.sharity.dao.CategoryDao;
import com.project.sharity.model.Category;
import com.project.sharity.model.OutputCategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryDao dao;

    @GetMapping(path = "/getCatList", produces = "application/json")
    public @ResponseBody List<OutputCategory> getCatList(){
        List<Category> cList = dao.getAllCat();
        List<OutputCategory> result = new ArrayList<OutputCategory>();

        for(int i = 0; i < cList.size(); i++)
        {
            OutputCategory temp = new OutputCategory(i, cList.get(i).getCategoryID(), cList.get(i).getCName());

            result.add(temp);
        }

        return result;
    }
}