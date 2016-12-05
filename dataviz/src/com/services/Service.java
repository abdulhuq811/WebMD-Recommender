package com.services;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.Classes.DAO;
import com.Classes.DonutOutputBean;
import com.Classes.InputBean;
import com.Classes.OutputBean;
import com.Classes.PostsOutputBean;
import com.Classes.TopicInputBean;
import com.Classes.TopicOutputBean;



@Path("/")
public class Service {

	@POST
	@Path("/getdetail")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getDetail(InputBean i) throws Exception {
		
		DAO dao=new DAO();
		OutputBean runOutput=dao.bodyPartRecommendation(i);

		return Response.status(200).entity(runOutput).build();
	}
	
	
	@POST
	@Path("/getcategories")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCategories(TopicInputBean i) throws Exception {
		
		DAO dao=new DAO();
		TopicOutputBean runOutput=dao.getCategories(i);

		return Response.status(200).entity(runOutput).build();
	}
	

	@POST
	@Path("/getdonut")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getDonut(InputBean i) throws Exception {
		
		DAO dao=new DAO();
		DonutOutputBean runOutput=dao.getDonut(i);

		return Response.status(200).entity(runOutput).build();
	}


	@POST
	@Path("/getPosts")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getPosts(InputBean i) throws Exception {
		
		DAO dao=new DAO();
		ArrayList<PostsOutputBean> runOutput=dao.getPosts(i);

		return Response.status(200).entity(runOutput).build();
	}

}
