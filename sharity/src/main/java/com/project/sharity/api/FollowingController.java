package com.project.sharity.api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.project.sharity.dao.FollowingDao;
import com.project.sharity.key.FollowingID;
import com.project.sharity.model.Following;
import com.project.sharity.model.OutputFollowing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/following")
public class FollowingController {
    @Autowired
    private FollowingDao dao;

    @GetMapping(path = "/getList", produces = "application/json")
    public @ResponseBody List<OutputFollowing> getFollowingList(
            @RequestParam(required = false, name = "userID") String userID) {
        List<Following> fList = dao.FollowingList(userID);
        List<OutputFollowing> result = new ArrayList<OutputFollowing>();

        for (int i = 0; i < fList.size(); i++) {
            OutputFollowing temp = new OutputFollowing(i, dao.getUserID(fList.get(i).getFollowingID().getFollowingID()),
                    dao.getUserName(fList.get(i).getFollowingID().getFollowingID()));

            result.add(temp);
        }

        return result;
    }

    @GetMapping(path = "/follow", produces = "application/json")
    public @ResponseBody String follow(@RequestParam(required = false, name = "userID") String userID,
            @RequestParam(required = false, name = "followID") String followID) {
        int _result = 0;
        String result;

        FollowingID fID = new FollowingID(dao.getAccountID(userID), dao.getAccountID(followID));
        Date date = new Date();

        Following temp = new Following(fID, date);

        try {
            dao.save(temp);
        } catch (Exception E) {
            _result = -1;
        }

        if (_result != -1)
            result = "270";
        else
            result = "470";

        return result;
    }

    @GetMapping(path = "/checkfollow", produces = "application/json")
    public @ResponseBody String checkfollow(@RequestParam(required = false, name = "userID") String userID,
            @RequestParam(required = false, name = "followID") String followID) {
    	String _result = dao.checkfollow(dao.getAccountID(userID), dao.getAccountID(followID));
        if(_result==null) {
        	return "0";
        }else {
        	return "1";
        }
    }
    
    @GetMapping(path = "/unfollow", produces = "application/json")
    public @ResponseBody String unfollow(@RequestParam(required = false, name = "userID") String userID,
            @RequestParam(required = false, name = "followID") String followID) {
        int _result = 0;
        String result;

        FollowingID fID = new FollowingID(dao.getAccountID(userID), dao.getAccountID(followID));

        try {
            dao.deleteById(fID);
        } catch (Exception E) {
            _result = -1;
        }

        if (_result != -1)
            result = "275";
        else
            result = "475";

        return result;
    }
}