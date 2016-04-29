package com.demo.services;

import java.util.List;

import com.demo.vo.Project;

public interface ProjectService {

	public void insert(Project object);
	public void update(Project object);
	public void delete(Project object);
	public List<Project> getAll();
	public Project getById(Integer id);
	
}
