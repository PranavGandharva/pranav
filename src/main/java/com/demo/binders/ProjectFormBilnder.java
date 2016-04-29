package com.demo.binders;

import java.util.List;

import com.demo.vo.Employee;
import com.demo.vo.Project;
import com.demo.vo.PropertyType;

public class ProjectFormBilnder {

	private Project project;
	private List<Employee> employee;
	private List<PropertyType> propertyType;
	public Project getProject() {
		return project;
	}
	public void setProject(Project project) {
		this.project = project;
	}
	public List<Employee> getEmployee() {
		return employee;
	}
	public void setEmployee(List<Employee> employee) {
		this.employee = employee;
	}
	public List<PropertyType> getPropertyType() {
		return propertyType;
	}
	public void setPropertyType(List<PropertyType> propertyType) {
		this.propertyType = propertyType;
	}
	
	
	
}
