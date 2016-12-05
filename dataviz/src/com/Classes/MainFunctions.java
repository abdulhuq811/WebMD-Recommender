package com.Classes;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

public class MainFunctions {

	public ArrayList<String> bodySuggest(String gender,ArrayList<String> bodyParts) {
		ArrayList<String> suggestedParts=new ArrayList<String>();
		Set<String> suggestedPartSet=new HashSet<String>();
		DAO dao=new DAO();
		Connection c=dao.dbConnection();
		gender=gender.toLowerCase();
		for(String part:bodyParts){
			try{
				
				Statement s=c.createStatement();
				String sql="select * from category_main where LOWER(bodypart) like \'%"+part+"%\' and LOWER(gender) not like \'%"+gender+"%\' ";
				ResultSet r=s.executeQuery(sql);
				while(r.next()){
					suggestedPartSet.add(r.getString(1));
				}
				r.close();s.close();
			}catch(SQLException e){
				//e.printStackTrace();
			}
		}
		suggestedParts.addAll(suggestedPartSet);
		return suggestedParts;
	}
	
	public ArrayList<String> topicSuggest(String gender,ArrayList<String> bodyParts,String topic) {
		ArrayList<String> suggestedTopics=new ArrayList<String>();
		//topic will be like disease 
		Set<String> suggestedTopicSet=new HashSet<String>();
		DAO dao=new DAO();
		Connection c=dao.dbConnection();
		gender=gender.toLowerCase();
		for(String part:bodyParts){
			try{
				
				Statement s=c.createStatement();
				String sql="select * from category_main where  LOWER(bodypart) like \'%"+part+"%\' and LOWER(gender) not like \'%"+gender+"%\' and LOWER(category) like \'%"+topic+"%\' ";
				ResultSet r=s.executeQuery(sql);
				while(r.next()){
					suggestedTopicSet.add(r.getString(5));
				}
				r.close();s.close();
			}catch(SQLException e){
				//e.printStackTrace();
			}
		}
		suggestedTopics.addAll(suggestedTopicSet);
		return suggestedTopics;
		
	}
	
	public static HashMap<String,Integer> wrapperSuggestTopics(String gender, ArrayList<String> bodyParts) {
		HashMap<String,Integer> topicCount=new HashMap<>();
		// Iterate through all the topics, invoking topicSuggest() retrieving count
		return topicCount;
	}
	
	public ArrayList<String> getPosts(String gender, ArrayList<String> bodyParts) {
		// Iterate over body parts 
		// topic-name, topicname, category, bodypart
		// topic-name --> posts (sort using votes/helpfulness)
		// Iterate through all the topics, invoking topicSuggest() retrieving count
		return new ArrayList<String>(); //type Posts
		// post -> bean -> question, votes, helpfile, list[topics]
	}
	
}
