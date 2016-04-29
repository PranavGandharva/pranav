package com.demo.dao.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.demo.dao.PropertyTypeDao;
import com.demo.vo.PropertyType;

@Component
public class PropetyTypeDaoIML implements PropertyTypeDao {

	@Autowired
	private SessionFactory factory;
	
	public PropertyType getById(Integer key) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<PropertyType> getAll() {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().createCriteria(PropertyType.class).list();
	}

	public void save(PropertyType object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().save(object);
	}

	public void update(PropertyType object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().update(object);
	}

	public void delete(PropertyType object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().delete(object);
	}

}
