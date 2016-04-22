package com.demo.dao.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.demo.dao.MeasurementUnitDao;
import com.demo.vo.MeasurementUnit;

@Component
public class MeasurementUnitDaoIML implements MeasurementUnitDao {

	@Autowired
	private SessionFactory factory;
	
	public MeasurementUnit getById(Integer key) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<MeasurementUnit> getAll() {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().createCriteria(MeasurementUnit.class).list();
	}

	public void save(MeasurementUnit object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().save(object);
	}

	public void update(MeasurementUnit object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().update(object);		
	}

	public void delete(MeasurementUnit object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().delete(object);
	}

}
