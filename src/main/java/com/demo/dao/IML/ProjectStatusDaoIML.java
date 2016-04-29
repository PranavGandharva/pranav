package com.demo.dao.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.demo.dao.ProjectStatusDao;
import com.demo.dao.PropertyTypeDao;
import com.demo.vo.ProjectStatus;
import com.demo.vo.PropertyType;

@Component
public class ProjectStatusDaoIML implements ProjectStatusDao{

	@Autowired
	private SessionFactory factory;

	public ProjectStatus getById(Integer key) {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().get(ProjectStatus.class,key);
	}

	public List<ProjectStatus> getAll() {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().createCriteria(ProjectStatus.class).list();
	}

	public void save(ProjectStatus object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().save(object);
	}

	public void update(ProjectStatus object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().update(object);
	}

	public void delete(ProjectStatus object) {
		// TODO Auto-generated method stub
		
		factory.getCurrentSession().delete(object);
	}
	
	

}
