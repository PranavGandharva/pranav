package com.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.demo.services.StateService;
import com.demo.vo.State;

@Controller
public class StateController {

	@Autowired
	private StateService service;
	
	@RequestMapping(value="/addState",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> addState(State object){
	System.out.println("addState");
		service.insert(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/deleteState",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> deleteState(State object){
		service.delete(object);
		
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/updateState",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> update(State object){
		service.update(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	
}
