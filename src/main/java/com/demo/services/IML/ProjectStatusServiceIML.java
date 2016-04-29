package com.demo.services.IML;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.demo.dao.ProjectStatusDao;
import com.demo.services.ProjectStatusService;
import com.demo.vo.ProjectStatus;

@Service
@EnableTransactionManagement
public class ProjectStatusServiceIML implements ProjectStatusService{

	@Autowired
	private ProjectStatusDao dao;
	
	@Transactional
	public void insert(ProjectStatus object) {
		// TODO Auto-generated method stub
		dao.save(object);
	}

	@Transactional
	public void update(ProjectStatus object) {
		// TODO Auto-generated method stub
		dao.update(object);
	}

	@Transactional
	public void delete(ProjectStatus object) {
		// TODO Auto-generated method stub
		dao.delete(object);
	}

	@Transactional
	public List<ProjectStatus> getAll() {
		// TODO Auto-generated method stub
		return dao.getAll();
	}

	@Override
	@Transactional
	public ProjectStatus getById(Integer key) {
		// TODO Auto-generated method stub
		return dao.getById(key);
	}

}
