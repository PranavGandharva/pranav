package com.demo.dao.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.demo.dao.ProjectPropertyPlanDao;
import com.demo.vo.ProjectPropertyPlan;

@Component
public class ProjectPropertyPlanDaoIML implements ProjectPropertyPlanDao {
   
	@Autowired
	private SessionFactory factory;
	
	@Override
	public ProjectPropertyPlan getById(Integer key) {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().get(ProjectPropertyPlan.class, key);
	}

	@Override
	public List<ProjectPropertyPlan> getAll() {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().createCriteria(ProjectPropertyPlan.class).list();
	}

	@Override
	public void save(ProjectPropertyPlan object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().save(object);
	}

	@Override
	public void update(ProjectPropertyPlan object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().update(object);
	}

	@Override
	public void delete(ProjectPropertyPlan object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().delete(object);
	}

}
