package com.project.sharity.api;

import java.util.List;
import java.util.UUID;

import com.project.sharity.dao.UserDao;
import com.project.sharity.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserDao dao;

    @GetMapping(path = "/checkUser", produces = "application/json")
    public @ResponseBody String checkUser(@RequestParam(required = false, name = "userID") String id,
            @RequestParam(required = false, name = "pwd") String input) {
        String result = "";
        String pwd = dao.checkUser(id);

        if (input.equals(pwd))
            result = "210";
        else if ((!input.equals(pwd)) && pwd != null)
            result = "410";
        else if (pwd == null)
            result = "405";

        return result;
    }

    @GetMapping(path = "/userRegister", produces = "application/json")
    public @ResponseBody String userRegister(@RequestParam(required = false, name = "userID") String id,
            @RequestParam(required = false, name = "pwd") String pwd,
            @RequestParam(required = false, name = "name") String name,
            @RequestParam(required = false, name = "phone") String phone,
            @RequestParam(required = false, name = "email") String email) {
        UUID temp = UUID.randomUUID();
        int result = 0;
        String _result;

        User _user = new User(temp.toString(), id, pwd, name, phone, email);

        try {
            dao.save(_user);
        } catch (Exception e) {
            result = -1;
        }
        if (result != -1)
            _result = "220"; // code 220: register success
        else
            _result = "420"; // code 420: register fail

        return _result;
    }

    @GetMapping(path = "/changePwd", produces = "application/json")
    public @ResponseBody String changePwd(@RequestParam(required = false, name = "nPwd") String nPwd,
            @RequestParam(required = false, name = "oPwd") String oPwd,
            @RequestParam(required = false, name = "userID") String id) {
        String result = "";
        int _result = 0;
        String ans = dao.checkUser(id);

        if (ans.equals(oPwd)) {
            _result = dao.changePwd(nPwd, id);

            if (_result == 1)
                result = "205";
            else if (_result == 0)
                result = "415";

        } else
            result = "410";

        return result;
    }

    @GetMapping(path = "/checkUID", produces = "application/json")
    public @ResponseBody String checkUID(@RequestParam(required = false, name = "input") String input) {
        String result = "";
        String aID = dao.checkUser(input);

        if (aID.equals(""))
            result = "225";
        else
            result = "425";

        return result;
    }

    @GetMapping(path = "/getUserDetail", produces = "application/json")
    public @ResponseBody User getUserDetail(@RequestParam(required = false, name = "uID") String uID) {
        return dao.selectUser(uID);
    }

    @GetMapping(path = "/changeUserInfo", produces = "application/json")
    public @ResponseBody String changeUserInfo(@RequestParam(required = false, name = "accountID") String id,
            @RequestParam(required = false, name = "userID") String uID,
            @RequestParam(required = false, name = "name") String name,
            @RequestParam(required = false, name = "email") String email,
            @RequestParam(required = false, name = "address") String addr,
            @RequestParam(required = false, name = "bio") String bio) {
    	System.out.println(id);
    	System.out.println(uID);
    	System.out.println(name);
    	System.out.println(email);
    	System.out.println(addr);
    	System.out.println(bio);
        String _result = "";
        int result = 0;

        try {
            dao.changeInfo(uID, email, addr, bio, id, name);
        	System.out.println(dao.changeInfo(uID, email, addr, bio, id, name));

        } catch (Exception e) {
            result = -1;
        }
        if (result != -1)
            _result = "205"; // code 220: register success
        else
            _result = "405"; // code 420: register fail

        return _result;
    }
    
    @GetMapping(path = "/getPhone", produces = "application/json")
    public @ResponseBody String getPhone (@RequestParam(required = false, name = "sellerID")String sellerID)
    {
        return dao.getPhone(sellerID);
    }
    
    @GetMapping(path = "/getUID", produces = "application/json")
    public @ResponseBody User getUID(@RequestParam(required = false, name = "userid") String userid) {
        return dao.selectUser(userid);
    }
    
    @GetMapping(path = "/getAllUser", produces = "application/json")
    public @ResponseBody List<User> getAllUser() {
        return dao.getAllUser();
    }
    
    @GetMapping(path = "/getByUsername", produces = "application/json")
    public @ResponseBody  List<User> getByUsername(@RequestParam(required = false, name = "username") String username) {
        return dao.getByUsername(username);
    }
}