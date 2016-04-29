package com.demo.dao.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.demo.dao.EmployeeDao;
import com.demo.vo.Employee;

@Component
public class EmployeeDaoIML implements EmployeeDao{

	@Autowired
	private SessionFactory factory;
	    
	public Employee getById(Integer key) {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().get(Employee.class,key);
	}

	public List<Employee> getAll() {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().createCriteria(Employee.class).list();
	}

	public void save(Employee object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().save(object);
	}

	public void update(Employee object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().update(object);
	}

	public void delete(Employee object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().delete(object);
	}

	
}
