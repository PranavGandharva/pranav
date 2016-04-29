package com.demo.services;

import java.util.List;

import com.demo.vo.ProjectPropertyBlock;

public interface ProjectPropertyBlockService {

	public void insert(ProjectPropertyBlock object);
	public void update(ProjectPropertyBlock object);
	public void delete(ProjectPropertyBlock object);
	public List<ProjectPropertyBlock> getAll();
    public ProjectPropertyBlock getById(Integer id);
	
}
