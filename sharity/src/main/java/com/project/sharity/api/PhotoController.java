package com.project.sharity.api;

import com.project.sharity.dao.PhotoDao;
import com.project.sharity.model.Item;
import com.project.sharity.model.OutputKeyword;
import com.project.sharity.model.Photo;
import com.project.sharity.model.SearchHistory;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/sPhoto")
public class PhotoController {
    @Autowired
    private PhotoDao dao;

    @GetMapping(path = "/getphoto", produces = "application/json")
    public @ResponseBody List<Photo> getphoto(@RequestParam(required = false, name = "productID")String productID)
    {
        return dao.getphoto(productID);
    }
    
    @GetMapping(path = "/uploadphoto", produces = "application/json")
    public @ResponseBody String getphoto(@RequestParam(required = false, name = "productID")String productID,@RequestParam(required = false, name = "img")String img)
    {
    	
    	int temp=dao.insertimg(productID,img);
    	if(temp==1) {
    		return "260";
    	}else {
    		return "460";
    	}
        		
    }
    
    @GetMapping(path = "/updatephoto", produces = "application/json")
    public @ResponseBody String updatephoto(@RequestParam(required = false, name = "productID")String productID,@RequestParam(required = false, name = "img")String img)
    {
    	String result;
        int _result = 0;

        try {
            dao.updateimg(productID,img);
        } catch (Exception e) {
            _result = -1;
        }

        if (_result != -1)
            result = "260";
        else
            result = "460";

        return result;
    }
    
    @GetMapping(path = "/deletephoto", produces = "application/json")
    public @ResponseBody String deletephoto(@RequestParam(required = false, name = "productID")String productID)
    {
    	String result;
        int _result = 0;

        try {
            dao.deletephoto(productID);
        } catch (Exception e) {
            _result = -1;
        }

        if (_result != -1)
            result = "260";
        else
            result = "460";

        return result;
    }
}