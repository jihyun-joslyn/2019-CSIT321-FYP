package com.project.sharity.api;

import java.util.ArrayList;
import java.util.List;

import com.project.sharity.dao.SearchHistoryDao;
import com.project.sharity.model.OutputKeyword;
import com.project.sharity.model.SearchHistory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/searchHis")
public class SearchHistoryController {
    @Autowired
    private SearchHistoryDao dao;

    @GetMapping(path = "/getKeywordList", produces = "application/json")
    public @ResponseBody List<OutputKeyword> getKeywordList(@RequestParam(required = false, name = "userID")String userID)
    {
        List<SearchHistory> sList = dao.KeywordList(userID);
        List<OutputKeyword> result = new ArrayList<OutputKeyword>();

        System.out.printf("Keyword list length = %d\n", sList.size());
        if (!sList.isEmpty()) {
            for (int i = 0; i < sList.size(); i++) {
                if (sList.get(i).getSearchHistoryID().getKeyword().equals("")
                        || sList.get(i).getSearchHistoryID().getKeyword().isEmpty()
                        || sList.get(i).getSearchHistoryID().getKeyword().equals(null))
                    continue;
                else {
                    OutputKeyword temp = new OutputKeyword(i, sList.get(i).getSearchHistoryID().getKeyword());
                    result.add(temp);
                }
            }
        }
        return result;
    }
    
    @GetMapping(path = "/insertKeyword", produces = "application/json")
    public @ResponseBody int insertKeyword(@RequestParam(required = false, name = "userID")String userID,@RequestParam(required = false, name = "name")String name)
    {
    	if(dao.checkinsertbefore(userID, name)==0) {
    		return dao.insertkeyword(userID, name);
    	}else {
    		return 0;
    	}
    }
}