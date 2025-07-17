package com.project.sharity.api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.project.sharity.dao.ItemDao;
import com.project.sharity.model.Item;
import com.project.sharity.model.OutputDetail;
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
@RequestMapping("/item")
public class ItemController {
    @Autowired
    private ItemDao dao;

    @GetMapping(path = "/getAllItems", produces = "application/json")
    public @ResponseBody List<OutputItem> getAllItems() {
        List<Item> iList = dao.getAllItems();
        List<OutputItem> result = new ArrayList<OutputItem>();

        for (int i = 0; i < iList.size(); i++) {
            OutputItem temp = new OutputItem();
            Item temp1 = iList.get(i);

            temp.setIndex(i);
            temp.setProductID(temp1.getItemID());
            temp.setCID(temp1.getCID());
            temp.setName(temp1.getIName());
            temp.setPrice(temp1.getPrice());
            temp.setSellerName(dao.getSellerName(temp1.getSellerID()));
            temp.setimg(dao.getitemimg(temp1.getItemID()));
            temp.setType("item");

            result.add(temp);
        }

        return result;

    }

    @GetMapping(path = "/getSTItems", produces = "application/json")
    public @ResponseBody List<OutputItem> getSTItems() {
        List<Item> iList = dao.getAllItems();
        List<OutputItem> result = new ArrayList<OutputItem>();

        for (int i = 0; i < 16; i++) {
            OutputItem temp = new OutputItem();
            Item temp1 = iList.get(i);

            temp.setIndex(i);
            temp.setProductID(temp1.getItemID());
            temp.setCID(temp1.getCID());
            temp.setName(temp1.getIName());
            temp.setPrice(temp1.getPrice());
            temp.setSellerName(dao.getSellerName(temp1.getSellerID()));
            temp.setimg(dao.getitemimg(temp1.getItemID()));
            temp.setType("item");

            result.add(temp);
        }

        return result;

    }

    @GetMapping(path = "/getSearchResult", produces = "application/json")
    public @ResponseBody List<OutputItem> getSearchResult(@RequestParam(required = false, name = "name") String name) {
        List<Item> iList = dao.getSearchResult(name);
        List<OutputItem> result = new ArrayList<OutputItem>();

        for (int i = 0; i < iList.size(); i++) {
            OutputItem temp = new OutputItem();
            Item temp1 = iList.get(i);

            temp.setIndex(i);
            temp.setProductID(temp1.getItemID());
            temp.setCID(temp1.getCID());
            temp.setName(temp1.getIName());
            temp.setPrice(temp1.getPrice());
            temp.setSellerName(dao.getSellerName(temp1.getSellerID()));
            temp.setimg(dao.getitemimg(temp1.getItemID()));
            temp.setType("item");

            result.add(temp);
        }

        return result;

    }

    @GetMapping(path = "/getItemDetails", produces = "application/json")
    public @ResponseBody OutputDetail getItemDetails(@RequestParam(required = false, name = "pID") String pID) {
        Item temp = dao.getItemDetail(pID);
        OutputDetail result = new OutputDetail();

        result.setProductID(pID);
        result.setName(temp.getIName());
        result.setCategory(dao.getCategoryName(temp.getCID(), pID));
        result.setDescription(temp.getDescription());
        result.setSeller(dao.getSellerName(temp.getSellerID()));
        result.setPrice(temp.getPrice());
        result.setQuantity(temp.getQuantity());
        result.setEditPrice(String.valueOf(temp.getPrice()));
        result.setEditQuantity(String.valueOf(temp.getQuantity()));

        return result;
    }

    @GetMapping(path = "/uploadItem", produces = "application/json")
    public @ResponseBody UUID uploadItem(@RequestParam(required = false, name = "cID") String cID,
            @RequestParam(required = false, name = "name") String name,
            @RequestParam(required = false, name = "description") String desc,
            @RequestParam(required = false, name = "seller") String seller,
            @RequestParam(required = false, name = "price") int price) {

        UUID tID = UUID.randomUUID();
        String id = tID.toString();
        Date date = new Date();
        String accountID = dao.getAccountID(seller);

        Item temp = new Item(id, cID, name, desc, accountID, price, 0, date);

        dao.save(temp);

        return tID;
    }

    @GetMapping(path = "/updateItem", produces = "application/json")
    public @ResponseBody String updateItem(@RequestParam(required = false, name = "itemID") String itemID,
            @RequestParam(required = false, name = "cID") String cID,
            @RequestParam(required = false, name = "name") String name,
            @RequestParam(required = false, name = "descripiton") String desc,
            @RequestParam(required = false, name = "price") int price,
            @RequestParam(required = false, name = "quantity") int quantity) {
        System.out.println(quantity);
        int _result = 0;
        String result;

        try {
            dao.updateItem(cID, desc, name, price, quantity, itemID);
        } catch (Exception e) {
            _result = -1;
        }

        if (_result != -1)
            result = "265";
        else
            result = "465";

        return result;
    }

    @GetMapping(path = "/deleteItem", produces = "application/json")
    public @ResponseBody String deleteItem(@RequestParam(required = false, name = "itemID") String itemID) {
        int _result = 0;
        String result;

        try {
            dao.deleteById(itemID);
        } catch (Exception e) {
            _result = -1;
        }

        if (_result != -1)
            result = "265";
        else
            result = "465";

        return result;
    }

    @GetMapping(path = "/getItemByCat", produces = "application/json")
    public @ResponseBody List<OutputItem> getItemByCat(@RequestParam(required = false, name = "cID") String cID) {
        List<Item> iList = dao.getItemByCat(cID);
        List<OutputItem> result = new ArrayList<OutputItem>();

        for (int i = 0; i < iList.size(); i++) {
            OutputItem temp = new OutputItem(i, iList.get(i).getItemID(), iList.get(i).getCID(),
                    iList.get(i).getIName(), dao.getSellerName(iList.get(i).getSellerID()), iList.get(i).getPrice(),
                    dao.getitemimg(iList.get(i).getItemID()));
            temp.setQuantity(iList.get(i).getQuantity());
            temp.setType("item");
            result.add(temp);
        }
        return result;
    }

    @GetMapping(path = "/getUploadList", produces = "application/json")
    public @ResponseBody List<OutputItem> getUploadList(@RequestParam(required = false, name = "uID") String uID) {
        List<Item> iList = dao.getUploadItem(uID);
        List<OutputItem> result = new ArrayList<OutputItem>();

        for (int i = 0; i < iList.size(); i++) {
            OutputItem temp = new OutputItem(i, iList.get(i).getItemID(), iList.get(i).getCID(),
                    iList.get(i).getIName(), dao.getSellerName(iList.get(i).getSellerID()), iList.get(i).getPrice(),
                    dao.getitemimg(iList.get(i).getItemID()));

            result.add(temp);
        }
        return result;
    }

    @GetMapping(path = "/changeQuantity", produces = "application/json")
    public @ResponseBody int changeQuantity(@RequestParam(required = false, name = "quantity") int quantity,
            @RequestParam(required = false, name = "pID") String pID) {
        return dao.changeQuantity(quantity, pID);
    }

    @GetMapping(path = "/searchByCat", produces = "application/json")
    public @ResponseBody List<OutputItem> getSearchItemByCat(@RequestParam(required = false, name = "cID") String cID,
            @RequestParam(required = false, name = "name") String name) {
        List<Item> iList = dao.getSearchItemByCat(cID, name);
        List<OutputItem> result = new ArrayList<OutputItem>();

        System.out.printf("%s", name);

        for (int i = 0; i < iList.size(); i++) {
            OutputItem temp = new OutputItem();
            Item temp1 = iList.get(i);

            temp.setIndex(i);
            temp.setProductID(temp1.getItemID());
            temp.setCID(temp1.getCID());
            temp.setName(temp1.getIName());
            temp.setPrice(temp1.getPrice());
            temp.setSellerName(dao.getSellerName(temp1.getSellerID()));
            temp.setimg(dao.getitemimg(temp1.getItemID()));
            temp.setType("item");

            result.add(temp);
        }

        return result;

    }

    @GetMapping(path = "/viewCatRecord", produces = "application/json")
    public @ResponseBody List<OutputItem> viewCatRecord(@RequestParam(required = false, name = "uID") String uID) {
        List<String> iList = dao.getRecommandViewItemCID(dao.getAccountID(uID));
        List<Integer> _iList = dao.getRecommandDataViewCount(dao.getAccountID(uID));
        List<String> iList1 = dao.getRecommandDataOrderCID(dao.getAccountID(uID));
        List<Integer> _iList1 = dao.getRecommandDataOrderCount(dao.getAccountID(uID));
        List<String> rList = new ArrayList<String>();
        List<Integer> _rList = new ArrayList<Integer>();
        List<OutputItem> itemResult = new ArrayList<OutputItem>();

        for (int i = 0; i < iList.size(); i++) {
            for (int j = 0; j < iList1.size(); j++) {
                if (iList.get(i).equals(iList1.get(j))) {
                    if (!rList.contains(iList.get(i))) {
                        rList.add(iList.get(i));
                        _rList.add(_iList.get(i) + _iList1.get(j));
                    } else
                        _rList.set(rList.indexOf(iList.get(i)),
                                _rList.get(rList.indexOf(iList.get(i))) + _iList.get(j));

                    break;
                } else {
                    if (!rList.contains(iList1.get(j))) {
                        rList.add(iList1.get(j));
                        _rList.add(_iList1.get(j));
                    }
                }
            }

            if (!rList.contains(iList.get(i))) {
                rList.add(iList.get(i));
                _rList.add(_iList.get(i));
            }
        }

        int rSize = 0;

        for (int i = 0; i < rList.size(); i++) {
            List<OutputItem> temp = getItemByCat(rList.get(i));

            for (int j = 0; j < temp.size(); j++) {
            	System.out.println(temp.get(j).getName());

                itemResult.add(temp.get(j));
                rSize++;

                if (rSize < 5)
                    break;
            }
        }

        for (int i = 0; i < itemResult.size(); i++)
            itemResult.get(i).setIndex(i);

        if (itemResult.isEmpty())
            itemResult = getSTItems();
        else if (itemResult.size() <= 10) {
            List<OutputItem> temp = getAllItems();

            for (int i = 0; i < temp.size(); i++) {
                int size = 0;

                if (!itemResult.contains(temp.get(i))) {
                	
                    itemResult.add(temp.get(i));
                    size++;
                }

                if (size >= 15)
                    break;
            }
        }

        return itemResult;
    }

    @GetMapping(path = "/searchBySubCat", produces = "application/json")
    public @ResponseBody List<OutputItem> searchBySubCat(@RequestParam(required = false, name = "cID")String cID, @RequestParam(required = false, name = "name") String name) {
        List<Item> iList = dao.getSearchItemBySubCat(cID, name);
        List<OutputItem> result = new ArrayList<OutputItem>();

        for (int i = 0; i < iList.size(); i++) {
            OutputItem temp = new OutputItem();
            Item temp1 = iList.get(i);

            temp.setIndex(i);
            temp.setProductID(temp1.getItemID());
            temp.setCID(temp1.getCID());
            temp.setName(temp1.getIName());
            temp.setPrice(temp1.getPrice());
            temp.setSellerName(dao.getSellerName(temp1.getSellerID()));
            temp.setimg(dao.getitemimg(temp1.getItemID()));
            temp.setType("item");

            result.add(temp);
        }

        return result;

    }

}