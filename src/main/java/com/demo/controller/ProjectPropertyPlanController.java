package com.demo.controller;

import java.beans.PropertyEditorSupport;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.services.ProjectPropertyBlockService;
import com.demo.services.ProjectPropertyPlanService;
import com.demo.services.ProjectService;
import com.demo.services.PropertyTypeService;
import com.demo.vo.Project;
import com.demo.vo.ProjectPropertyBlock;
import com.demo.vo.ProjectPropertyPlan;
import com.demo.vo.PropertyType;

@Controller
public class ProjectPropertyPlanController {

	@Autowired
	private ProjectPropertyPlanService service;
	
	@Autowired
	private ProjectService proservice;
	
	@Autowired
	private PropertyTypeService propservice;
	
	@Autowired
	private ProjectPropertyBlockService blockservice;
	
	@RequestMapping(value="/addPropertyPlan",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> addPlan(ProjectPropertyPlan object){
		service.insert(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/deleteProjectPropertyPlan",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> deletePlan(ProjectPropertyPlan object){
		service.delete(object);		
		
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/getPlan/{id}",method=RequestMethod.GET)
	public @ResponseBody 
	List<ProjectPropertyPlan> getPlan(@PathVariable int id){
    return service.getPlan(id);	
	}
		
	@InitBinder
	public void binder(WebDataBinder binder){
		binder.registerCustomEditor(Project.class,new ProjectConversion());
		binder.registerCustomEditor(PropertyType.class,new PropertyConversion());
		binder.registerCustomEditor(ProjectPropertyBlock.class,new BlockConversion());
	}
	
	public class ProjectConversion extends PropertyEditorSupport{
		@Override
		public void setAsText(String text) throws IllegalArgumentException {
			// TODO Auto-generated method stub
		setValue(proservice.getById(Integer.parseInt(text)));
		}
	}
	
	public class PropertyConversion extends PropertyEditorSupport{
		
		@Override
		public void setAsText(String text) throws IllegalArgumentException {
			// TODO Auto-generated method stub
		setValue(propservice.getById(Integer.parseInt(text)));
		}
	}
	public class BlockConversion extends PropertyEditorSupport{
		@Override
		public void setAsText(String text) throws IllegalArgumentException {
			// TODO Auto-generated method stub
         setValue(blockservice.getById(Integer.parseInt(text)));
		}
	}
	
	}
