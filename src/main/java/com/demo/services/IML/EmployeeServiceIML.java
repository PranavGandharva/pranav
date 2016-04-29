package com.demo.services.IML;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.demo.dao.EmployeeDao;
import com.demo.services.EmployeeService;
import com.demo.vo.Employee;

@Service
@EnableTransactionManagement
public class EmployeeServiceIML implements EmployeeService {

	@Autowired
	private EmployeeDao dao;
	
	@Transactional
	public void insert(Employee object) {
		// TODO Auto-generated method stub
		dao.save(object);
	}

	@Transactional
	public void update(Employee object) {
		// TODO Auto-generated method stub
		dao.update(object);
	}

	@Transactional
	public void delete(Employee object) {
		// TODO Auto-generated method stub
		dao.delete(object);
	}

	@Transactional
	public List<Employee> getAll() {
		// TODO Auto-generated method stub
		return dao.getAll();
	}

	@Transactional
	public Employee getById(Integer id) {
		// TODO Auto-generated method stub
		return dao.getById(id);
	}

}
