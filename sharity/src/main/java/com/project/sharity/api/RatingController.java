package com.project.sharity.api;

import java.util.List;

import com.project.sharity.dao.RatingDao;
import com.project.sharity.key.RatingID;
import com.project.sharity.model.Rating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rating")
public class RatingController {
    @Autowired
    private RatingDao dao;

    @GetMapping(path = "/getProductRating", produces = "application/json")
    public @ResponseBody int getProductRating(@RequestParam(required = false, name = "productID") String pID) {
        List<Integer> rList = dao.getProductRating(pID);
        int result = 0;


        for (int i = 0; i < rList.size(); i++)
            result = result + rList.get(i);

        return result;
    }

    @GetMapping(path = "/addRating", produces = "application/json")
    public @ResponseBody String addRating(@RequestParam(required = false, name = "productID") String pID, @RequestParam(required = false, name = "userID")String uID, @RequestParam(required = false, name = "commentID")String cID, @RequestParam(required = false, name = "rating")int rating){
        String result;
        RatingID rID = new RatingID(dao.getAccountID(uID), pID);

        Rating r = new Rating(rID, rating, cID);

        try{
            dao.save(r);

            result = "230";
        }catch (Exception e) {
            result = "430";
        }
        
        return result;
    }
}