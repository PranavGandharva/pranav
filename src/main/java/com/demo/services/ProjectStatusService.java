package com.demo.services;

import java.util.List;

import com.demo.vo.ProjectStatus;

public interface ProjectStatusService {
		public void insert(ProjectStatus object);
	    public void update(ProjectStatus object);
	    public void delete(ProjectStatus object);
	    public List<ProjectStatus>getAll();
        public ProjectStatus getById(Integer id);
       
}
