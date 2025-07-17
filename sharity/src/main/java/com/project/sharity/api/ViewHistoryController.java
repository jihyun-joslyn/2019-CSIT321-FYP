package com.project.sharity.api;

import com.project.sharity.dao.ViewHistoryDao;
import com.project.sharity.model.ViewHistory;
import com.project.sharity.model.OutputHistory;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/viewHis")
public class ViewHistoryController {
    @Autowired
    private ViewHistoryDao dao;
    
    @GetMapping(path = "/insertRecord", produces = "application/json")
    public @ResponseBody int insertKeyword(@RequestParam(required = false, name = "userID")String userID,@RequestParam(required = false, name = "name")String name)
    {
    	if(dao.checkviewbefore(userID, name)==0) {
    		return dao.insertkeyword(userID, name);
    	}else {
    		return 0;
    	}
    }
	
	@GetMapping(path = "/viewRecord", produces = "application/json")
    public @ResponseBody List<OutputHistory> viewRecord(@RequestParam(required = false, name = "userID")String userID)
    {
		
        List<ViewHistory> vList = dao.getViewHis(userID);
        List<OutputHistory> result = new ArrayList<OutputHistory>();

        for(int i = 0; i < vList.size()&& i < 30; i++)
        {
            System.out.println(vList.get(i).getProductID());

            if(dao.getIName(vList.get(i).getProductID()) == null){
                OutputHistory temp = new OutputHistory(Integer.toString(i), Integer.toString(vList.get(i).getViewID()), vList.get(i).getProductID(), dao.getSName(vList.get(i).getProductID()), dao.getSPrice(vList.get(i).getProductID()), dao.getImg(vList.get(i).getProductID()));
                temp.setType("service");
                result.add(temp);
            }
            else {
                OutputHistory temp = new OutputHistory(Integer.toString(i), Integer.toString(vList.get(i).getViewID()), vList.get(i).getProductID(), dao.getIName(vList.get(i).getProductID()), dao.getIPrice(vList.get(i).getProductID()), dao.getImg(vList.get(i).getProductID()));
                temp.setType("goods");
                result.add(temp);
            }
            
        }
        
        return result;
    }
	
	@GetMapping(path = "/deleteRecord", produces = "application/json")
    public @ResponseBody int deleteRecord(@RequestParam(required = false, name = "userID")String userID,@RequestParam(required = false, name = "productID")String productID)
    {
		int temp = 0;
		temp=dao.deleteRecord(productID,userID);
            
        
        
        return temp;
    }
}