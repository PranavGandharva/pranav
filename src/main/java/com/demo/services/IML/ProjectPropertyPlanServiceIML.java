package com.demo.services.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.ResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.demo.dao.ProjectPropertyPlanDao;
import com.demo.services.ProjectPropertyPlanService;
import com.demo.vo.ProjectPropertyBlock;
import com.demo.vo.ProjectPropertyPlan;

@Service
@Transactional
public class ProjectPropertyPlanServiceIML implements ProjectPropertyPlanService{

	@Autowired
	private ProjectPropertyPlanDao dao;
	
	@Autowired
	private SessionFactory factory;
	
	@Override
	public void insert(ProjectPropertyPlan object) {
		// TODO Auto-generated method stub
		dao.save(object);
	}

	@Override
	public void update(ProjectPropertyPlan object) {
		// TODO Auto-generated method stub
		dao.update(object);
	}

	@Override
	public void delete(ProjectPropertyPlan object) {
		// TODO Auto-generated method stub
		dao.delete(object);
	}

	@Override
	public List<ProjectPropertyPlan> getAll() {
		// TODO Auto-generated method stub
		return dao.getAll();
	}

	@Override
	public ProjectPropertyPlan getById(Integer key) {
		// TODO Auto-generated method stub
		return dao.getById(key);
	}

	public List<ProjectPropertyPlan> getPlan(Integer id){
    return factory.getCurrentSession().createCriteria(ProjectPropertyPlan.class)
     .add(Restrictions.eq("block.id",id)).list();
   
     
	}
}
