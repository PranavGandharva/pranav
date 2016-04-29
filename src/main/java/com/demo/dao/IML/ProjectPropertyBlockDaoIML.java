package com.demo.dao.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.demo.dao.ProjectpropertyBlockDao;
import com.demo.vo.ProjectPropertyBlock;

@Component
public class ProjectPropertyBlockDaoIML implements ProjectpropertyBlockDao{

	@Autowired
	private SessionFactory factory;
	
	public ProjectPropertyBlock getById(Integer key) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<ProjectPropertyBlock> getAll() {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().createCriteria(ProjectPropertyBlock.class).list();
	}

	public void save(ProjectPropertyBlock object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().save(object);
	}

	public void update(ProjectPropertyBlock object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().update(object);
	}

	public void delete(ProjectPropertyBlock object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().delete(object);
	}
	

}
