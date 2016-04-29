package com.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.demo.services.ProjectStatusService;
import com.demo.vo.ProjectStatus;

@Controller
public class ProjectStatusController {

	@Autowired
	private ProjectStatusService service;
	
	@RequestMapping(value="/addProjectStatus",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> addStatus(ProjectStatus object){
	System.out.println("addStatus");
		service.insert(object);
		
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	@RequestMapping(value="/updateProjectStatus",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> updateStatus(ProjectStatus object){
		service.update(object);
		
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	@RequestMapping(value="/deleteProjectStatus",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> deleteStatus(ProjectStatus object){
		service.delete(object);
		
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
}
