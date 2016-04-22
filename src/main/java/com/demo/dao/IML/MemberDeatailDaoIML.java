package com.demo.dao.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.demo.dao.MemberDetailDao;
import com.demo.vo.Employee;
import com.demo.vo.MemberDetail;

@Component
public class MemberDeatailDaoIML implements MemberDetailDao{

	@Autowired
	private SessionFactory factory;

	public Employee getById(Integer key) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Employee> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	public void save(Employee object) {
		// TODO Auto-generated method stub
		
	}

	public void update(Employee object) {
		// TODO Auto-generated method stub
		
	}

	public void delete(Employee object) {
		// TODO Auto-generated method stub
		
	}	
	
	
}
