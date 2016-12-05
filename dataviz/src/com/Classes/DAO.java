package com.Classes;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class DAO {

	
	public OutputBean bodyPartRecommendation(InputBean ip) {
		OutputBean o=new OutputBean();
		
		ArrayList<ArrayList<String>> out=new ArrayList<ArrayList<String>>();
		Connection c=dbConnection();
		try {
			for(String str:ip.getTopics()){
				Statement s=c.createStatement();
				String sql="select * from bodypartrecommendation where LOWER(bodypart) like \'"+str.toLowerCase().trim()+"\'" ;
				System.out.println(sql);
				ResultSet r=s.executeQuery(sql);
//				List<String> list=new ArrayList<String>();
				while(r.next()){
					ArrayList<String> tmp=new ArrayList<>();
					if(r!=null && r.getString(2)!= null&& !r.getString(2).isEmpty() ){
						String[] strs=(r.getString(2).split(","));
						for(String str1:strs)tmp.add(str1);
						out.add(tmp);
//						System.out.println(r.getString(2));
					}
				}
				r.close();
				s.close();
			}
			Set<String> finalout=new HashSet<String>();
			if(out.size()==1){
				o.setBodyParts(out.get(0));
				return o;
			}
			ArrayList<String> firstlist=out.get(0);
			for(int i=1;i<out.size()-1;i++){
				ArrayList<String> st=intersection(firstlist, out.get(i));
				firstlist=new ArrayList<>(st);
				
			}
			finalout.addAll(intersection(firstlist, out.get(out.size()-1)));
			
			ArrayList<String> finList=new ArrayList<String>();
			finList.addAll(finalout);
			o.setBodyParts(finList);
			return o;
		} catch (SQLException e) {
			
			//e.printStackTrace();
		}
		
		return o;
	}
	
		public static ArrayList<String> intersection(ArrayList<String> list1, ArrayList<String> list2) {
	        ArrayList<String> list = new ArrayList<String>();

	        for (String t : list1) {
	            if(list2.contains(t)) {
	                list.add(t);
	            }
	        }

	        return list;
	    }
	
	public TopicOutputBean getCategories(TopicInputBean ip) {
		TopicOutputBean output=new TopicOutputBean();
		
		String tableName=ip.getCategory();
		List<TopicDetails> topics=new ArrayList<TopicDetails>();
		List<TopicDetails> topics2=new ArrayList<TopicDetails>();
		String gen=ip.gender.equalsIgnoreCase("m")?"w":"m";
		String wherecond="LOWER(gender) not like \'"+gen+"\' and ";
		for(int i=0;i<ip.getTopics().size();i++){
			if(i==0)wherecond+=("LOWER(bodypart) like \'"+ip.getTopics().get(i).toLowerCase().trim()+"\'");
			else 
				wherecond+=(" or LOWER(bodypart) like \'"+ip.getTopics().get(i).toLowerCase().trim()+"\'");
		}
		
		Connection c=dbConnection();
		try {
				Set<String> set=new HashSet<String>();
				Statement s=c.createStatement();
				String sql="select * from "+tableName+" where "+wherecond;
//				System.out.println(sql);
				ResultSet r=s.executeQuery(sql);
				while(r.next()){
					if(!(set.add(r.getString(4))))continue;
					topics.add(new TopicDetails(r.getString(4), r.getString(5),0));
				}
				r.close();
				s.close();
				/*for(TopicDetails topic:topics){
					System.out.println(topic.topicid+" "+topic.value);
				}*/
				for(TopicDetails to:topics){
					Statement st=c.createStatement();
					String sql1="select count(*) from webmdquestion where questiontopicid like \'%"+to.topicid+"%\'";
//					System.out.println(sql1);
					ResultSet rs=st.executeQuery(sql1);
					while(rs.next()){
						TopicDetails topicdet=new TopicDetails(to.topicid, to.topicname,rs.getInt(1));
//						System.out.println(rs.getInt(1));
						
						topics2.add(topicdet);
						
					}
					rs.close();
					st.close();
					
				}
			
		}catch(Exception e){
			e.printStackTrace();
		}
		/*for(TopicDetails topic:topics2){
			System.out.println(topic.topicid+" "+topic.value);
		}*/
		
		ArrayList<String> l=new ArrayList<String>();
		
		Collections.sort(topics2,new Comparator<TopicDetails>() {

			@Override
			public int compare(TopicDetails o1, TopicDetails o2) {
				
				return o2.value-o1.value;
			}
		});
		int count=0;
		for(TopicDetails topic:topics2){
//			System.err.println(topic.topicid+" "+topic.value);
			l.add(topic.topicname);
			count++;
			if(count==5)break;
		}
		output.setValues(l);
		return output;
	}
	
	public DonutOutputBean getDonut(InputBean ip) {
		DonutOutputBean o=new DonutOutputBean();
		
//		ArrayList<ArrayList<String>> out=new ArrayList<ArrayList<String>>();
		String[] tables={"diseases","allergies","disorders","drugs","infection","injury","med_cond","surgery","symptoms","treatments"};
		String gen=ip.gender.equalsIgnoreCase("m")?"w":"m";
		String wherecond="LOWER(gender) not like \'"+gen+"\' and ";
		for(int i=0;i<ip.getTopics().size();i++){
			if(i==0)wherecond+=("LOWER(bodypart) like \'"+ip.getTopics().get(i).toLowerCase().trim()+"\'");
			else 
				wherecond+=(" or LOWER(bodypart) like \'"+ip.getTopics().get(i).toLowerCase().trim()+"\'");
		}
		/*String query="";
		for(int i=0;i<tables.length;i++){
			if(i==0)query+=("select count(*) from "+tables[i]+" where "+wherecond);
			else query+=(" union select count(*) from "+tables[i]+" where "+wherecond);
		}*/
		
		Connection c=dbConnection();
		try {
			int i=0;
			for(String tableName:tables){

				Statement s=c.createStatement();
				String query="select count(*) from "+tableName+" where "+wherecond;
//				System.out.println(query);
				ResultSet r=s.executeQuery(query);
				
				while(r.next()){
					switch(i){
					case 0:
						o.setDiseases(r.getInt(1)+"");
						i++;
						break;
					case 1:
						o.setAllergies(r.getInt(1)+"");
						i++;
						break;
					case 2:
						o.setDisorders(r.getInt(1)+"");
						i++;
						break;
					case 3:
						o.setDrugs(r.getInt(1)+"");
						i++;
						break;
					case 4:
						o.setInfection(r.getInt(1)+"");
						i++;
						break;
					case 5:
						o.setInjury(r.getInt(1)+"");
						i++;
						break;
					case 6:
						o.setMedicalConditions(r.getInt(1)+"");
						i++;
						break;
					case 7:
						o.setSurgery(r.getInt(1)+"");
						i++;
						break;
					case 8:
						o.setSymptoms(r.getInt(1)+"");
						i++;
						break;
					case 9:
						o.setTreatments(r.getInt(1)+"");
						i++;
						break;
					}
				}
				r.close();
				s.close();
				
				
			}
		} catch (SQLException e) {
			
			//e.printStackTrace();
		}
		
		return o;
	}
	
	public ArrayList<PostsOutputBean> getPosts(InputBean ip) {
		ArrayList<PostsOutputBean> suggestions=new ArrayList<PostsOutputBean>();
		
//		ArrayList<ArrayList<String>> out=new ArrayList<ArrayList<String>>();
		String[] tables={"diseases","allergies","disorders","drugs","infection","injury","med_cond","surgery","symptoms","treatments"};
		String gen=ip.gender.equalsIgnoreCase("m")?"w":"m";
		String wherecond="LOWER(gender) not like \'"+gen+"\' and ";
		for(int i=0;i<ip.getTopics().size();i++){
			if(i==0)wherecond+=("LOWER(bodypart) like \'"+ip.getTopics().get(i).toLowerCase().trim()+"\'");
			else wherecond+=(" or LOWER(bodypart) like \'"+ip.getTopics().get(i).toLowerCase().trim()+"\'");
		}
		
		ArrayList<String> topicList=new ArrayList<String>();
		HashMap<String,String> topicCat=new HashMap<String,String>();
		Connection c=dbConnection();
	
		try {
			for(String tableName:tables){

				Statement s=c.createStatement();
				String query="select * from "+tableName+" where "+wherecond;
//				System.out.println(query);
				ResultSet r=s.executeQuery(query);
				
				while(r.next()){
					String key=r.getString(4).trim();
					topicList.add(key);

					if(topicCat.containsKey(key)){
						topicCat.put(key, topicCat.get(key).trim()+","+r.getString(2).trim());
					}else{
						topicCat.put(key, r.getString(2).trim());
					}

				}
				r.close();
				s.close();
				
			}
			ArrayList<String> quesList=new ArrayList<String>();
			int i=0;
			
			String topcwherecond="";
			for(int j=0;j<topicList.size();j++){
				if(j==0)topcwherecond+=("questiontopicid like \'%"+topicList.get(j)+"%\'");
				else topcwherecond+=(" or questiontopicid like \'%"+topicList.get(j)+"%\'");
			}
			
			//for(String topic:topicList){

				Statement s=c.createStatement();
//				String query="select questionid from webmdquestion where questiontopicid like \'%"+topic+"%\'";
				String query="select questionid from webmdquestion where "+topcwherecond;
//				System.out.println(query);
				ResultSet r=s.executeQuery(query);
				
				while(r.next()){
					quesList.add(r.getString(1));
					i++;
				}
				r.close();
				s.close();
				//if(i==10)break;
			//}			
			i=0;
			String inquery="";
			for(int j=0;j<quesList.size();j++){
				if(j==0)inquery+="\'"+quesList.get(j)+"\'";
				else inquery+=",\'"+quesList.get(j)+"\'";
			}
			//for(String ques:quesList){
				Set<String> set=new HashSet<String>();
				Statement s1=c.createStatement();
				String query1="select q.questiontitle,q.questionurl,(0.75*answerhelpfulnum+0.25*answervotenum),q.questiontopicid from webmdanswer a,webmdquestion q where a.questionid=q.questionid and a.questionid in ("+inquery+") order by (0.75*answerhelpfulnum+0.25*answervotenum) desc limit 100";
//				System.out.println(query1);
				ResultSet r1=s1.executeQuery(query1);
				
				while(r1.next()){
					String[] topics=r1.getString(4).split(",");
					Set<String> al=new HashSet<>();
					for(String st:topics){
//						if(topicCat.get(st.trim())!=null && topicCat.get(st.trim()).contains("Disorder,Disorder"))System.out.println("string=="+st);
						if(topicCat.get(st.trim())==null)System.out.println(st.trim());
						else {
							String[] spl=topicCat.get(st.trim()).split(",");
							for(String sp:spl)al.add(sp);
							//al.add(topicCat.get(st.trim()));
						}
					}
					if(al.isEmpty())continue;
					if(!(set.add(r1.getString(1))))continue;
					PostsOutputBean o=new PostsOutputBean();
					o.setTags(new ArrayList<String>(al));
					o.setQuestion(r1.getString(1));
					o.setQuestionURL(r1.getString(2));
					o.setRating(r1.getString(3));
					i++;
					suggestions.add(o);
					if(i==20)break;
				}
				r1.close();
				s1.close();
				//if(i==10)break;
			//}			
			
			
			
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		/*PostsOutputBean o=new PostsOutputBean();
		o.setTags(new ArrayList<>());
		o.setQuestion("asfsfd");
		o.setQuestionURL("assadfad");
		o.setRating("asdfasdfas");
		
		suggestions.add(o);*/
		
		return suggestions;
	}
	
	
	public Connection dbConnection() {
	      Connection connection = null;
	      try {
	    	 Class.forName("org.postgresql.Driver");
	         connection = DriverManager
	            .getConnection("jdbc:postgresql://localhost:5432/DV","postgres", "password");
	      } catch (Exception e) {
	         e.printStackTrace();
	         System.exit(0);
	      }

	      return connection;
	   }
}
class TopicDetails{
	String topicid;
	String topicname;
	int value;
	public TopicDetails(String topicid,String topicname,int value){
		this.topicid=topicid;
		this.topicname=topicname;
		this.value=value;
	}
}