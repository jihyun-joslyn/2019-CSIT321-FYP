package com.project.sharity.api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.project.sharity.dao.FavouritesDao;
import com.project.sharity.key.FavouritesID;
import com.project.sharity.model.Favourites;
import com.project.sharity.model.OutputItem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/fav")
public class FavouritesController {
    @Autowired
    private FavouritesDao dao;

    @GetMapping(path = "/addFav", produces = "application/json")
    public @ResponseBody String addFav(@RequestParam(required = false, name = "userID") String userID,
            @RequestParam(required = false, name = "productID") String productID) {
        String accountID = dao.getAccountID(userID);
        FavouritesID fID = new FavouritesID(accountID, productID);
        Date date = new Date();
        Favourites fav = new Favourites(fID, date);
        int result = 0;
        String _result;

        try {
            dao.save(fav);
        } catch (Exception e) {
            result = -1;
        }
        if (result != -1)
            _result = "290"; // add success
        else
            _result = "490"; // add fail

        return _result;
    }

    @GetMapping(path = "/showFav", produces = "application/json")
    public @ResponseBody List<OutputItem> showFav(@RequestParam(required = false, name = "userID") String userID) {
        List<Favourites> fList = dao.getFavList(userID);
        List<OutputItem> result = new ArrayList<OutputItem>();

        for (int i = 0; i < fList.size(); i++) {
            OutputItem temp = new OutputItem();

            if (dao.getItemName(fList.get(i).getFavouritesID().getProductID(),
                    fList.get(i).getFavouritesID().getAccountID()) == null) {
                temp.setName(dao.getServiceName(fList.get(i).getFavouritesID().getProductID(),
                        fList.get(i).getFavouritesID().getAccountID()));
                temp.setPrice(dao.getServicePrice(fList.get(i).getFavouritesID().getProductID(),
                        fList.get(i).getFavouritesID().getAccountID()));
                temp.setSellerName(dao.getServiceSeller(fList.get(i).getFavouritesID().getProductID()));
                temp.setType("service");
				temp.setimg(dao.getimg(fList.get(i).getFavouritesID().getProductID()));

            } else {
                temp.setName(dao.getItemName(fList.get(i).getFavouritesID().getProductID(),
                        fList.get(i).getFavouritesID().getAccountID()));
                temp.setPrice(dao.getItemPrice(fList.get(i).getFavouritesID().getProductID(),
                        fList.get(i).getFavouritesID().getAccountID()));
                temp.setSellerName(dao.getItemSeller(fList.get(i).getFavouritesID().getProductID()));
                temp.setType("goods");
				temp.setimg(dao.getimg(fList.get(i).getFavouritesID().getProductID()));

            }

            temp.setIndex(i);
            temp.setProductID(fList.get(i).getFavouritesID().getProductID());

            result.add(temp);
        }
        return result;

    }

    @GetMapping(path = "/deleteFav", produces = "application/json")
    public @ResponseBody String deleteFav(@RequestParam(required = false, name = "userID") String userID,
            @RequestParam(required = false, name = "productID") String productID) {
        int _result = 0;
        String result;

        String accountID = dao.getAccountID(userID);

        FavouritesID _temp = new FavouritesID(accountID, productID);

        try {
            dao.deleteById(_temp);
        } catch (Exception e) {
            _result = -1;
        }

        if (_result != -1)
            result = "295";
        else
            result = "495";

        return result;
    }
}