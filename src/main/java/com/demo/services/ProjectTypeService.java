package com.demo.services;

import java.util.List;

import com.demo.vo.ProjectType;

public interface ProjectTypeService {

	public void insert(ProjectType object);
	public void delete(ProjectType object);
	public void update(ProjectType object);
    public List<ProjectType> getAll();
    public ProjectType getById(Integer id);


}

