package com.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.demo.services.MemberDetailService;
import com.demo.vo.Employee;

@Controller
public class MemberDetailController {

	@Autowired
	private MemberDetailService service;
	
	
	@RequestMapping(value="/addMemberDetail",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> addMember(Employee object){

		service.insert(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/deleteMemberDetail",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> deleteMember(Employee object){
		service.delete(object);
				
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}

	@RequestMapping(value="/fragment/fragment_edit_member_detail",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> updateMember(Employee object){
		service.delete(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
}
