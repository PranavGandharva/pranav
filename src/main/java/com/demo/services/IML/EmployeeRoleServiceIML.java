package com.demo.services.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.demo.dao.EmployeeRoleDao;
import com.demo.services.EmployeeRoleService;
import com.demo.vo.EmployeeRole;

@Service
@EnableTransactionManagement
public class EmployeeRoleServiceIML implements EmployeeRoleService{

	@Autowired
	private EmployeeRoleDao dao;
	
	@Autowired
	private SessionFactory factory;
	
	@Transactional
	public void insert(EmployeeRole object) {
		// TODO Auto-generated method stub
		dao.save(object);
	}
    @Transactional
	public void update(EmployeeRole object) {
		// TODO Auto-generated method stub
		dao.update(object);
	}

    @Transactional
	public void delete(EmployeeRole object) {
		// TODO Auto-generated method stub
		dao.delete(object);
	}
    
    @Transactional
	public List<EmployeeRole> getAll() {
		// TODO Auto-generated method stub
		return dao.getAll();
	}
    
    @Transactional
	public EmployeeRole getById(Integer key) {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().get(EmployeeRole.class,key);
	}

    
    
}
