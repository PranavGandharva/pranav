package com.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.demo.dao.ProjectTypeDao;
import com.demo.services.ProjectTypeService;
import com.demo.vo.ProjectType;

@Controller
public class ProjectTypeController {

	@Autowired
	private ProjectTypeService service;
	
	@RequestMapping(value="/addProjectType",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> addProjecttype(ProjectType object){
		service.insert(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}

	@RequestMapping(value="/updateProjectType",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> updateProjecttype(ProjectType object){
		service.update(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}

	@RequestMapping(value="/deleteProjectType",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> deleteProjecttype(ProjectType object){
		service.delete(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}

}
