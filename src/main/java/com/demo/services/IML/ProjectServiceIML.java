package com.demo.services.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.demo.dao.ProjectDao;
import com.demo.services.ProjectService;
import com.demo.vo.Project;

@Service
@EnableTransactionManagement
public class ProjectServiceIML implements ProjectService {

	@Autowired
	private ProjectDao dao;
	
	@Autowired
	private SessionFactory factory;
	
	@Transactional
	public void insert(Project object) {
		// TODO Auto-generated method stub
		dao.save(object);
	}

	@Transactional
	public void update(Project object) {
		// TODO Auto-generated method stub
		dao.update(object);
	}

	@Transactional
	public void delete(Project object) {
		// TODO Auto-generated method stub
		dao.delete(object);
	}

	@Transactional
	public List<Project> getAll() {
		// TODO Auto-generated method stub
		return dao.getAll();
	}

	@Override
	@Transactional
	public Project getById(Integer id) {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().get(Project.class, id);
	}

}
