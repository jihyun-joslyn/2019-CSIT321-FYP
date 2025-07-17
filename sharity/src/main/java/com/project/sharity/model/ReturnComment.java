package com.project.sharity.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ReturnComment {
    private String code;
    private String commentID;
    private String content;

    public ReturnComment() {
    }

    public ReturnComment(@JsonProperty("code") String code, @JsonProperty("commentID") String commentID,
            @JsonProperty("content") String content) {
        this.code = code;
        this.commentID = commentID;
        this.content = content;
    }

    public ReturnComment(@JsonProperty("commentID") String commentID,
            @JsonProperty("content") String content) {
        this.commentID = commentID;
        this.content = content;
    }

    /**
     * @return String return the code
     */
    public String getCode() {
        return code;
    }

    /**
     * @param code the code to set
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * @return String return the content
     */
    public String getContent() {
        return content;
    }

    /**
     * @param content the content to set
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * @return String return the commentID
     */
    public String getCommentID() {
        return commentID;
    }

    /**
     * @param commentID the commentID to set
     */
    public void setCommentID(String commentID) {
        this.commentID = commentID;
    }

}