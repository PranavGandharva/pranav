package com.demo.services;

import java.util.List;

import com.demo.vo.MeasurementUnit;

public interface MeasurementUnitService {

	public void insert(MeasurementUnit object);
	public void update(MeasurementUnit object);
	public void delete(MeasurementUnit object);
	public List<MeasurementUnit> getAll();
	
}
