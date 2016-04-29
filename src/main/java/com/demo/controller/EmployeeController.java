package com.demo.controller;

import java.beans.PropertyEditorSupport;

import javax.servlet.http.HttpSession;
import javax.validation.ConstraintViolationException;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.demo.services.EmployeeRoleService;
import com.demo.services.EmployeeService;
import com.demo.services.StateService;
import com.demo.vo.Employee;
import com.demo.vo.EmployeeRole;
import com.demo.vo.State;
import com.mysql.jdbc.MysqlErrorNumbers;

@Controller
public class EmployeeController {

	@Autowired
	private EmployeeService service;

	@Autowired
	private StateService statservice;

	@Autowired
	private EmployeeRoleService role;

	@RequestMapping(value = "/addEmployee", method = RequestMethod.POST)
	public ResponseEntity<HttpStatus> addEmployee(Employee object, HttpSession session) {
		try {
			service.insert(object);
		} catch (DataIntegrityViolationException ex) {
			Throwable throwable = ex.getCause();
			if (throwable instanceof org.hibernate.exception.ConstraintViolationException) {
				org.hibernate.exception.ConstraintViolationException exception = (org.hibernate.exception.ConstraintViolationException) throwable;
				String constraintname = exception.getConstraintName();
				System.out.println("constraintName:===" + exception.getConstraintName().toString() + "code:=="
						+ exception.getErrorCode());
				;
				switch (exception.getErrorCode()) {
				case MysqlErrorNumbers.ER_DUP_ENTRY:
					if (constraintname.equals("UNIQUE_USERNAME")) {
						session.setAttribute("errorMsg", "Error:UserName must be Unique");
					}
					break;

				default:
					break;
				}

			}

		}

		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	@RequestMapping(value="/deleteEmployee",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> delete(Employee object){
		service.delete(object);		
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}

	@RequestMapping(value="/updateEmployee",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> updateEmployee(Employee object){
		service.update(object);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
	
	@InitBinder
	public void initbinder(WebDataBinder binder) {
		binder.registerCustomEditor(State.class, new getStates());
		binder.registerCustomEditor(EmployeeRole.class, new getRole());
	}

	public class getStates extends PropertyEditorSupport {
		@Override
		public void setAsText(String id) throws IllegalArgumentException {
			setValue(statservice.getById(Integer.parseInt(id)));
		}
	}

	public class getRole extends PropertyEditorSupport {

		@Override
		public void setAsText(String text) throws IllegalArgumentException {
			// TODO Auto-generated method stub
			setValue(role.getById(Integer.parseInt(text)));
		}
	}

}
