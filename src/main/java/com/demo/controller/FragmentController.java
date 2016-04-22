package com.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.demo.services.MeasurementUnitService;
import com.demo.services.MemberDetailService;
import com.demo.services.StateService;
import com.demo.vo.Employee;
import com.demo.vo.MeasurementUnit;
import com.demo.vo.MemberDetail;
import com.demo.vo.State;

@Controller
public class FragmentController {

	@Autowired
	private StateService service;
	
	@Autowired
	private MeasurementUnitService mservice;
	
	@Autowired
	private MemberDetailService memservice;
	
	@RequestMapping("fragment/fragement_manage_state")
	public String getStateFragment(Model model){
	model.addAttribute("stateModel",new State());
	model.addAttribute("states",service.getAll());
		return"admin/fragments/manage_state";
	}
	
	@RequestMapping("fragment/fragement_manage_measurement")	
	public String getunit(Model model){
		model.addAttribute("measurementModel",new MeasurementUnit());
		model.addAttribute("measurements",service.getAll());
		return"admin/fragments/manage_measurement";
	}
	
	@RequestMapping("fragment/fragement_manage_member_detail")
	public String getMember(Model model){
        model.addAttribute("employee",new Employee());
        model.addAttribute("members",memservice.getAll());
		return "admin/fragments/manage_member_detail";
	}
	
	
}
