package com.demo.services;

import java.util.List;

import com.demo.vo.EmployeeRole;

public interface EmployeeRoleService {

	public void insert(EmployeeRole object);
    public void update(EmployeeRole object);
    public void delete(EmployeeRole object);
    public List<EmployeeRole> getAll();
	public EmployeeRole getById(Integer key);
    
}
