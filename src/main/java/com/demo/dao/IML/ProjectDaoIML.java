package com.demo.dao.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.demo.dao.ProjectDao;
import com.demo.vo.Project;

@Component
public class ProjectDaoIML implements ProjectDao{

	@Autowired
	private SessionFactory factory;
	
	public Project getById(Integer key) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Project> getAll() {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().createCriteria(Project.class).list();
	}

	public void save(Project object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().save(object);
	}

	public void update(Project object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().update(object);
	}

	public void delete(Project object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().delete(object);
	}

}
