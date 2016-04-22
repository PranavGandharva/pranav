package com.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.demo.services.MeasurementUnitService;
import com.demo.vo.MeasurementUnit;

@Controller
public class MeasurementController {

	@Autowired
	MeasurementUnitService service;
	
	@RequestMapping(value="/addMeasurementUnit",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> insert(MeasurementUnit object){
		service.insert(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/updateMeasurementUnit",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> update(MeasurementUnit object){
		service.update(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/deleteMeasurementUnit",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> delete(MeasurementUnit object){
		service.delete(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	
}
