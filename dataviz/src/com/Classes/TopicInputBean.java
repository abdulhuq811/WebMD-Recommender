package com.Classes;

import java.util.ArrayList;

public class TopicInputBean {
	String gender;
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public ArrayList<String> getTopics() {
		return topics;
	}
	public void setTopics(ArrayList<String> topics) {
		this.topics = topics;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	ArrayList<String> topics;
	String category;
}
