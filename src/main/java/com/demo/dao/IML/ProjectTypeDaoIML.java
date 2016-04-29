package com.demo.dao.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.demo.dao.ProjectTypeDao;
import com.demo.vo.ProjectType;

@Component
public class ProjectTypeDaoIML implements ProjectTypeDao {

	@Autowired
	private SessionFactory factory;
	
	public ProjectType getById(Integer key) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<ProjectType> getAll() {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().createCriteria(ProjectType.class).list();
	}

	public void save(ProjectType object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().save(object);
	}

	public void update(ProjectType object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().update(object);
	}

	public void delete(ProjectType object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().delete(object);
	}

}
