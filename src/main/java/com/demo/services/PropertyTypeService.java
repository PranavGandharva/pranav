package com.demo.services;

import java.util.List;

import com.demo.vo.PropertyType;

public interface PropertyTypeService {
 
	public void insert(PropertyType object);
	public void update(PropertyType object);
	public void delete(PropertyType object);
	public List<PropertyType> getAll();
	public PropertyType getById(Integer id);
	
}
