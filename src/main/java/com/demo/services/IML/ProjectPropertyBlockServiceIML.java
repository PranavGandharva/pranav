package com.demo.services.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.demo.dao.ProjectpropertyBlockDao;
import com.demo.services.ProjectPropertyBlockService;
import com.demo.vo.ProjectPropertyBlock;

@Service
@Transactional
public class ProjectPropertyBlockServiceIML implements ProjectPropertyBlockService{

	@Autowired
	public SessionFactory factory;
	
	@Autowired
	public ProjectpropertyBlockDao dao;
	
	public void insert(ProjectPropertyBlock object) {
		// TODO Auto-generated method stub
		dao.save(object);
	}

	public void update(ProjectPropertyBlock object) {
		// TODO Auto-generated method stub
		dao.update(object);
	}

	public void delete(ProjectPropertyBlock object) {
		// TODO Auto-generated method stub
		dao.delete(object);
	}

	public List<ProjectPropertyBlock> getAll() {
		// TODO Auto-generated method stub
		return dao.getAll();
	}

	@Override
	public ProjectPropertyBlock getById(Integer id) {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().get(ProjectPropertyBlock.class, id);
	}

}
