package com.demo.services;

import java.util.List;

import com.demo.vo.PropertyDetail;

public interface PropertyDetailService {

	public void insert(PropertyDetail object);
	public void update(PropertyDetail object);
	public List<PropertyDetail>getAll();
	public void delete(PropertyDetail object);
	
}
