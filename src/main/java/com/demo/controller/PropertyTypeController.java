package com.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.demo.services.PropertyTypeService;
import com.demo.vo.PropertyType;

@Controller
public class PropertyTypeController {

	@Autowired
	private PropertyTypeService service;
	
	@RequestMapping(value="/addPropertyType",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> addProperty(PropertyType object){
	service.insert(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	

	@RequestMapping(value="/deletePropertyType",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> deleteProperty(PropertyType object){
	service.delete(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	
		
}
