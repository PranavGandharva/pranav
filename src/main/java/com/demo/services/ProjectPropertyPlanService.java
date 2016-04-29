package com.demo.services;

import java.util.List;

import com.demo.dao.ProjectpropertyBlockDao;
import com.demo.vo.ProjectPropertyPlan;

public interface ProjectPropertyPlanService {

	public void insert(ProjectPropertyPlan object);
	public void update(ProjectPropertyPlan object);
	public void delete(ProjectPropertyPlan object);
	public List<ProjectPropertyPlan> getAll();
	public ProjectPropertyPlan getById(Integer key);
	public List<ProjectPropertyPlan> getPlan(Integer id);
}
