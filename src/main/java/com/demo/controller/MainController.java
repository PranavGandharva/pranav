package com.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {

	@RequestMapping("misc")
	public String getMisc() {
		System.out.println("mainController");
		return "admin/manage_misc";
	}

	@RequestMapping("members")
	public String getMem(){
		return "admin/manage_member";
	}
	
	@RequestMapping("employees")
	public String getEmployee(){
		return "admin/manage_employee";
	}
	
	@RequestMapping("projects")
	public String getProject(){
		return"admin/manage_project";
	}
	@RequestMapping("properties")
	public String getProperty(){
		return "admin/manage_property";
		}
	
}
