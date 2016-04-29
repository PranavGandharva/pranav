package com.demo.services;

import java.util.List;

import com.demo.vo.Employee;

public interface EmployeeService {

	public void insert(Employee object);
	public void update(Employee object);
	public void delete(Employee object);
	public List<Employee> getAll();
	public Employee getById(Integer id);
	
}
