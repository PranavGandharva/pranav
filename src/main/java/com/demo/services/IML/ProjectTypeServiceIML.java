package com.demo.services.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.demo.dao.ProjectTypeDao;
import com.demo.services.ProjectService;
import com.demo.services.ProjectTypeService;
import com.demo.vo.Project;
import com.demo.vo.ProjectType;

@Service
@EnableTransactionManagement
public class ProjectTypeServiceIML implements ProjectTypeService{

	@Autowired
	private ProjectTypeDao dao;

	@Autowired
	private SessionFactory factory;
	
	@Transactional
	public void insert(ProjectType object) {
		// TODO Auto-generated method stub
		dao.save(object);
	}

	@Transactional
	public void delete(ProjectType object) {
		// TODO Auto-generated method stub
		dao.delete(object);
	}

	@Transactional
	public void update(ProjectType object) {
		// TODO Auto-generated method stub
		dao.update(object);
	}

	@Transactional
	public List<ProjectType> getAll() {
		// TODO Auto-generated method stub
		return dao.getAll();
	}

	@Override
	@Transactional
	public ProjectType getById(Integer id) {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().get(ProjectType.class, id);
	}
	



}
