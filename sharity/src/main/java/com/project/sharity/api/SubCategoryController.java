package com.project.sharity.api;

import java.util.ArrayList;
import java.util.List;

import com.project.sharity.dao.SubCategoryDao;
import com.project.sharity.model.OutputCategory;
import com.project.sharity.model.SubCategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/subCat")
public class SubCategoryController {
    @Autowired
    private SubCategoryDao dao;

    @GetMapping(path = "/getSubCat", produces = "application/json")
    public @ResponseBody List<OutputCategory> getSubCat(@RequestParam(required = false, name = "cID")String cID){
        List<SubCategory> sList = dao.getSubCatList(cID);
        List<OutputCategory> result = new ArrayList<OutputCategory>();

        System.out.printf("%s\n", cID);
        for(int i = 0; i < sList.size(); i++){
            OutputCategory temp = new OutputCategory(i, sList.get(i).getSubCID(), sList.get(i).getCName());

            result.add(temp);
        }

        return result;
    }    
}