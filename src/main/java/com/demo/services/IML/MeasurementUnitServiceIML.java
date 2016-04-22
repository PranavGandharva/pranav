package com.demo.services.IML;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.demo.dao.MeasurementUnitDao;
import com.demo.services.MeasurementUnitService;
import com.demo.vo.MeasurementUnit;

@Service
@EnableTransactionManagement
public class MeasurementUnitServiceIML implements MeasurementUnitService{

	@Autowired
	MeasurementUnitDao dao;

	@Transactional
	public void insert(MeasurementUnit object) {
		// TODO Auto-generated method stub
		dao.save(object);
	}

	@Transactional
	public void update(MeasurementUnit object) {
		// TODO Auto-generated method stub
		dao.update(object);
	}

	@Transactional
	public void delete(MeasurementUnit object) {
		// TODO Auto-generated method stub
		dao.delete(object);
	}
    @Transactional
	public List<MeasurementUnit> getAll() {
		// TODO Auto-generated method stub
		return dao.getAll();
	}
	
	
	
	
}
