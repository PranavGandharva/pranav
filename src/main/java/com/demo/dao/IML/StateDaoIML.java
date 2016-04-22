package com.demo.dao.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.demo.dao.StateDAO;
import com.demo.vo.State;

@Component
@EnableTransactionManagement
public class StateDaoIML implements StateDAO{

	@Autowired
	private SessionFactory factory;
	
	public State getById(Integer key) {
		// TODO Auto-generated method stub
		return null;
	}
    @Transactional
	public List<State> getAll() {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().createCriteria(State.class).list();
	}
	@Transactional
	public void save(State object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().save(object);
	}

	public void update(State object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().update(object);
	}

	public void delete(State object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().delete(object);
	}

}
