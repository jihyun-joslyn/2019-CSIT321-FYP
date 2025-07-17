package com.project.sharity.api;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.project.sharity.dao.CommentDao;
import com.project.sharity.model.Comment;
import com.project.sharity.model.OutputComment;
import com.project.sharity.model.OutputSubComment;
import com.project.sharity.model.ReturnComment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private CommentDao dao;

    @GetMapping(path = "/getParentComment", produces = "application/json")
    public @ResponseBody List<OutputComment> getParentComments(
            @RequestParam(required = false, name = "productID") String pID) {
        List<Comment> cList = dao.getParentComments(pID);
        List<OutputComment> result = new ArrayList<OutputComment>();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

        for (int i = 0; i < cList.size(); i++) {
            Comment c = cList.get(i);
			int rating = dao.getRatingByComment(c.getCommentID());
            System.out.println(rating);
            OutputComment temp = new OutputComment(i, c.getCommentID(),dao.getUserID(c.getAccountID()), c.getContent(),
                    formatter.format(c.getDateAdded()), rating);

            result.add(temp);
        }

        return result;
    }

    @GetMapping(path = "/getChildComment", produces = "application/json")
		public @ResponseBody List<OutputSubComment> getChildComments(
        @RequestParam(required = false, name = "productID") String pID) {
        List<Comment> cList = dao.getParentComments(pID);
        List<OutputSubComment> result = new ArrayList<OutputSubComment>();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

        for (int i = 0; i < cList.size(); i++) {
            Comment c = cList.get(i);
			List<Comment> sList = dao.getChildComments(pID, c.getCommentID());
            if(!sList.isEmpty())
            for (int j = 0; j < sList.size(); j++) {
                OutputSubComment temp = new OutputSubComment(j, sList.get(j).getParent(),
                        dao.getUserID(c.getAccountID()), sList.get(j).getContent(),
                        formatter.format(sList.get(j).getDateAdded()));
                result.add(temp);
            }
        }
        return result;
    }

	@GetMapping(path = "/getSubComment", produces = "application/json")
    public @ResponseBody List<OutputSubComment> getSubComments(
            @RequestParam(required = false, name = "commentID") String cID, @RequestParam(required = false, name = "productID")String pID) {
        List<Comment> cList = dao.getChildComments(pID, cID);
        List<OutputSubComment> result = new ArrayList<OutputSubComment>();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        for(int i = 0; i < cList.size(); i++)
        {
            OutputSubComment temp = new OutputSubComment(i, dao.getUserID(cList.get(i).getAccountID()), cList.get(i).getContent(), formatter.format(cList.get(i).getDateAdded()));
            result.add(temp);
        }
        return result;
    }

    @GetMapping(path = "/submitComment", produces = "application/json")
    public @ResponseBody ReturnComment submitComment(@RequestParam(required = false, name = "productID") String pID,
            @RequestParam(required = false, name = "userID") String userID,
            @RequestParam(required = false, name = "content") String content) {
        UUID temp = UUID.randomUUID();
        String cID = temp.toString();
        Date date = new Date();

        Comment c = new Comment(cID, dao.getAccountID(userID), pID, "NULL", content, date);
        ReturnComment result = new ReturnComment(cID, content);

        try {
            dao.save(c);
            result.setCode("250");
        } catch (Exception e) {
            result.setCode("450");
        }

        return result;
    }

    @GetMapping(path = "/submitChildComment", produces = "application/json")
    public @ResponseBody List<OutputSubComment> submitChildComment(@RequestParam(required = false, name = "productID") String pID,
            @RequestParam(required = false, name = "userID") String userID,
            @RequestParam(required = false, name = "content") String content,
            @RequestParam(required = false, name = "parent") String parent) {

        UUID temp = UUID.randomUUID();
        String cID = temp.toString();
        Date date = new Date();

        Comment c = new Comment(cID, dao.getAccountID(userID), pID, parent, content, date);

        dao.save(c);

        return  getSubComments(parent, pID);
    }
}