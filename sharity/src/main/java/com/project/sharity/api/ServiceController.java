package com.project.sharity.api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.project.sharity.dao.ServiceDao;
import com.project.sharity.model.OutputDetail;
import com.project.sharity.model.OutputItem;
import com.project.sharity.model.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/service")
public class ServiceController {
    @Autowired
    private ServiceDao dao;

    @GetMapping(path = "/getAllServices", produces = "application/json")
    public @ResponseBody List<OutputItem> getAllServices() {
        List<Service> sList = dao.getAllServices();
        List<OutputItem> result = new ArrayList<OutputItem>();

        for (int i = 0; i < sList.size(); i++) {
            OutputItem temp = new OutputItem();
            Service temp1 = sList.get(i);

            temp.setIndex(i);
            temp.setProductID(temp1.getServiceID());
            temp.setCID(temp1.getCID());
            temp.setName(temp1.getSName());
            temp.setPrice(temp1.getPrice());
            temp.setSellerName(dao.getSellerName(temp1.getServiceID()));
            temp.setimg(dao.getserviceimg(temp1.getServiceID()));
            temp.setType("service");


            result.add(temp);
        }

        return result;

    }

    @GetMapping(path = "/getSTServices", produces = "application/json")
    public @ResponseBody List<OutputItem> getSTServices() {
        List<Service> sList = dao.getAllServices();
        List<OutputItem> result = new ArrayList<OutputItem>();

        for (int i = 0; i < 14; i++) {
            OutputItem temp = new OutputItem();
            Service temp1 = sList.get(i);

            temp.setIndex(i);
            temp.setProductID(temp1.getServiceID());
            temp.setCID(temp1.getCID());
            temp.setName(temp1.getSName());
            temp.setPrice(temp1.getPrice());
            temp.setSellerName(dao.getSellerName(temp1.getServiceID()));
            temp.setimg(dao.getserviceimg(temp1.getServiceID()));
            temp.setType("service");


            result.add(temp);
        }

        return result;

    }

    @GetMapping(path = "/getSearchResult", produces = "application/json")
    public @ResponseBody List<OutputItem> getSearchResult(@RequestParam(required = false, name = "name") String name) {
        List<Service> sList = dao.getSearchResult(name);
        List<OutputItem> result = new ArrayList<OutputItem>();

        System.out.printf("%s", name);

        for (int i = 0; i < sList.size(); i++) {
            OutputItem temp = new OutputItem();
            Service temp1 = sList.get(i);

            temp.setIndex(i);
            temp.setProductID(temp1.getServiceID());
            temp.setCID(temp1.getCID());
            temp.setName(temp1.getSName());
            temp.setPrice(temp1.getPrice());
            temp.setSellerName(dao.getSellerName(temp1.getServiceID()));
            temp.setimg(dao.getserviceimg(temp1.getServiceID()));
            temp.setType("service");

            result.add(temp);
        }

        return result;

    }

    @GetMapping(path = "/getServiceDetails", produces = "application/json")
    public @ResponseBody OutputDetail getServiceDetails(@RequestParam(required = false, name = "pID") String pID) {
    	Service temp = dao.getServiceDetail(pID);
        OutputDetail result = new OutputDetail();
       
        	result.setProductID(pID);
            result.setName(temp.getSName());
            result.setCategory(dao.getCategoryName(pID));
            result.setDescription(temp.getDescription());
            result.setSeller(dao.getSellerName(pID));
            result.setPrice(temp.getPrice());
            result.setEditPrice(String.valueOf(temp.getPrice()));
        


        return result;
    }

    @GetMapping(path = "/uploadService", produces = "application/json")
    public @ResponseBody UUID uploadService(@RequestParam(required = false, name = "cID") String cID,
            @RequestParam(required = false, name = "name") String name,
            @RequestParam(required = false, name = "descripiton") String desc,
            @RequestParam(required = false, name = "seller") String seller,
            @RequestParam(required = false, name = "price") int price) {


        UUID tID = UUID.randomUUID();
        String id = tID.toString();
        Date date = new Date();
        String accountID = dao.getAccountID(seller);
        
        Service temp = new Service(id, cID, name, desc, accountID, price, date);

        dao.save(temp);


        return tID;
    }

    @GetMapping(path = "/updateService", produces = "application/json")
    public @ResponseBody String updateService(@RequestParam(required = false, name = "ServiceID") String ServiceID,
            @RequestParam(required = false, name = "cID") String cID,
            @RequestParam(required = false, name = "name") String name,
            @RequestParam(required = false, name = "descripiton") String desc,
            @RequestParam(required = false, name = "price") int price) {
        int _result = 0;
        String result;

        try {
            dao.updateService(cID, desc, name, price, ServiceID);
        } catch (Exception e) {
            _result = -1;
        }

        if (_result != -1)
            result = "265";
        else
            result = "465";

        return result;
    }

    @GetMapping(path = "/deleteService", produces = "application/json")
    public @ResponseBody String deleteService(@RequestParam(required = false, name = "ServiceID")String ServiceID)
    {
        int _result = 0;
        String result;

        try{
            dao.deleteById(ServiceID);
        } catch (Exception e) {
            _result = -1;
        }

        if (_result != -1)
            result = "265";
        else
            result = "465";

        return result;
    }

    @GetMapping(path = "/getServiceByCat", produces = "application/json")
    public @ResponseBody List<OutputItem> getServiceByCat (@RequestParam(required = false, name = "cID")String cID)
    {
        List<Service> iList = dao.getServiceByCat(cID);
        List<OutputItem> result = new ArrayList<OutputItem>();

        for(int i = 0; i < iList.size(); i++)
        {
            OutputItem temp = new OutputItem(i, iList.get(i).getServiceID(), iList.get(i).getCID(), iList.get(i).getSName(), dao.getSellerName(iList.get(i).getServiceID()), iList.get(i).getPrice(),dao.getserviceimg(iList.get(i).getServiceID()));
            temp.setType("service");
            result.add(temp);
        }
        return result;
    }

    @GetMapping(path = "/getUploadList", produces = "application/json")
    public @ResponseBody List<OutputItem> getUploadList (@RequestParam(required = false, name = "uID")String uID)
    {
        List<Service> iList = dao.getUploadService(uID);
        List<OutputItem> result = new ArrayList<OutputItem>();

        for(int i = 0; i < iList.size(); i++)
        {
            OutputItem temp = new OutputItem(i, iList.get(i).getServiceID(), iList.get(i).getCID(), iList.get(i).getSName(), dao.getSellerName(iList.get(i).getServiceID()), iList.get(i).getPrice(),dao.getserviceimg(iList.get(i).getServiceID()));
            temp.setType("service");

            result.add(temp);
        }
        return result;
    }
    
    @GetMapping(path = "/searchByCat", produces = "application/json")
    public @ResponseBody List<OutputItem> getSearchServiceByCat (@RequestParam(required = false, name = "cID")String cID,@RequestParam(required = false, name = "name")String name)
    {
        List<Service> iList = dao.getSearchServiceByCat(cID,name);
        List<OutputItem> result = new ArrayList<OutputItem>();

        for(int i = 0; i < iList.size(); i++)
        {
            OutputItem temp = new OutputItem(i, iList.get(i).getServiceID(), iList.get(i).getCID(), iList.get(i).getSName(), dao.getSellerName(iList.get(i).getServiceID()), iList.get(i).getPrice(),dao.getserviceimg(iList.get(i).getServiceID()));
            temp.setType("service");

            result.add(temp);
        }
        return result;
    }
    
	@GetMapping(path = "/viewCatRecord", produces = "application/json")
    public @ResponseBody List<OutputItem> viewCatRecord(@RequestParam(required = false, name = "uID") String uID) {
        List<String> sList = dao.getRecommandViewSerCID(dao.getAccountID(uID));
        List<Integer> _sList = dao.getRecommandSerViewCount(dao.getAccountID(uID));
        List<String> sList1 = dao.getRecommandSerOrderCID(dao.getAccountID(uID));
        List<Integer> _sList1 = dao.getRecommandSerOrderCount(dao.getAccountID(uID));
        List<String> rList = new ArrayList<String>();
        List<Integer> _rList = new ArrayList<Integer>();
        List<OutputItem> serviceResult = new ArrayList<OutputItem>();
        for (int i = 0; i < sList.size(); i++) {
            for (int j = 0; j < sList1.size(); j++) {
                if (sList.get(i).equals(sList1.get(j))) {
                    if (!rList.contains(sList.get(i))) {
                        rList.add(sList.get(i));
                        _rList.add(_sList.get(i) + _sList1.get(j));
                    } else
                        _rList.set(rList.indexOf(sList.get(i)),
                                _rList.get(rList.indexOf(sList.get(i))) + _sList.get(j));
                    break;
                } else {
                    if (!rList.contains(sList1.get(j))) {
                        rList.add(sList1.get(j));
                        _rList.add(_sList1.get(j));
                    }
                }
            }
            if (!rList.contains(sList.get(i))) {
                rList.add(sList.get(i));
                _rList.add(_sList.get(i));
            }
        }
        int rSize = 0;
        for (int i = 0; i < rList.size(); i++) {
            List<OutputItem> temp = getServiceByCat(rList.get(i));
            for (int j = 0; j < temp.size(); j++) {
                serviceResult.add(temp.get(j));
                rSize++;
                if (rSize < 5)
                    break;
            }
        }
        if (serviceResult.isEmpty()) 
            serviceResult = getSTServices();
        else if (serviceResult.size() <= 10) {
            List<OutputItem> temp = getAllServices();
            for (int i = 0; i < temp.size(); i++) {
                int size = 0;
                    if (!serviceResult.contains(temp.get(i))) {
                        serviceResult.add(temp.get(i));
                        size++;
                        System.out.printf("added\n");
                    }
                if (size >= 15)
                    break;
            }
        }
        for (int i = 0; i < serviceResult.size(); i++)
            serviceResult.get(i).setIndex(i);

        
        return serviceResult;
    }
	
	@GetMapping(path = "/searchBySubCat", produces = "application/json")
    public @ResponseBody List<OutputItem> searchBySubCat(@RequestParam(required = false, name = "cID")String cID, @RequestParam(required = false, name = "name") String name) {
        List<Service> iList = dao.getSearchServiceBySubCat(cID, name);
        List<OutputItem> result = new ArrayList<OutputItem>();
        for (int i = 0; i < iList.size(); i++) {
            OutputItem temp = new OutputItem();
            Service temp1 = iList.get(i);
            temp.setIndex(i);
            temp.setProductID(temp1.getServiceID());
            temp.setCID(temp1.getCID());
            temp.setName(temp1.getSName());
            temp.setPrice(temp1.getPrice());
            temp.setSellerName(dao.getSellerName(temp1.getSellerID()));
            temp.setimg(dao.getserviceimg(temp1.getServiceID()));
            temp.setType("item");
            result.add(temp);
        }
        return result;
    }
}