package com.demo.dao.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.demo.dao.EmployeeRoleDao;
import com.demo.vo.EmployeeRole;

@Component
public class EmployeeRoleDaoIML implements EmployeeRoleDao{

	@Autowired
	private SessionFactory factory;
	
	public EmployeeRole getById(Integer key) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<EmployeeRole> getAll() {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().createCriteria(EmployeeRole.class).list();
	}

	public void save(EmployeeRole object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().save(object);
	}

	public void update(EmployeeRole object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().update(object);
	}

	public void delete(EmployeeRole object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().delete(object);
	}

}
