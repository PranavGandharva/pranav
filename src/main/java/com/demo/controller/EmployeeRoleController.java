package com.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.demo.services.EmployeeRoleService;
import com.demo.vo.EmployeeRole;

@Controller
public class EmployeeRoleController {

	@Autowired
	private EmployeeRoleService service;
	
	@RequestMapping(value="/addEmployeeRole",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> insert(EmployeeRole object){
	service.insert(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/updateEmployeeRole",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> update(EmployeeRole object){
	service.update(object);
		
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/deleteEmployeeRole",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> delete(EmployeeRole object){
	service.delete(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	
}
