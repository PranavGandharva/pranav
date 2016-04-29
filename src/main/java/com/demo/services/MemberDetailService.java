package com.demo.services;

import java.util.List;

import com.demo.vo.Employee;
import com.demo.vo.MemberDetail;

public interface MemberDetailService {

	public Employee getById(Integer id);
	public void insert(Employee object);
	public void update(Employee object);
	public void delete(Employee object);
	public List<Employee> getAll();
	
}
