package com.Classes;

import java.util.ArrayList;

public class PostsOutputBean {

	String question;
	String questionURL;
	String rating;
	
	ArrayList<String> tags;
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getQuestionURL() {
		return questionURL;
	}
	public void setQuestionURL(String questionURL) {
		this.questionURL = questionURL;
	}
	
	public String getRating() {
		return rating;
	}
	public void setRating(String rating) {
		this.rating = rating;
	}
	public ArrayList<String> getTags() {
		return tags;
	}
	public void setTags(ArrayList<String> tags) {
		this.tags = tags;
	}
	
	
}
