package com.demo.services.IML;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.demo.dao.StateDAO;
import com.demo.services.StateService;
import com.demo.vo.State;

@Component
@EnableTransactionManagement
public class StateServiceIML implements StateService{

	@Autowired
	StateDAO dao;
	
	@Autowired
	private SessionFactory factory;
	
	public void insert(State object) {
		// TODO Auto-generated method stub
		dao.save(object);
	}

	@Transactional
	public void update(State object) {
		// TODO Auto-generated method stub
		
		dao.update(object);
	}

	public List<State> getAll() {
		// TODO Auto-generated method stub
		return dao.getAll();
	}
    
	@Transactional
	public void delete(State object) {
		// TODO Auto-generated method stub
		dao.delete(object);
	}

	@Transactional
	public State getById(Integer id) {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().get(State.class, id);
	}

	
}
