package com.demo.services.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.demo.dao.PropertyTypeDao;
import com.demo.services.PropertyTypeService;
import com.demo.vo.PropertyType;

@Service
@EnableTransactionManagement
public class PropertyTypeServiceIML implements PropertyTypeService{

	@Autowired
	private PropertyTypeDao dao;
	
	@Autowired
	private SessionFactory factory;
	
	@Transactional	
	public void insert(PropertyType object) {
		// TODO Auto-generated method stub
		dao.save(object);
	}
    @Transactional
	public void update(PropertyType object) {
		// TODO Auto-generated method stub
		dao.update(object);
	}
    @Transactional
	public void delete(PropertyType object) {
		// TODO Auto-generated method stub
		dao.delete(object);
	}
    @Transactional
	public List<PropertyType> getAll() {
		// TODO Auto-generated method stub
		return dao.getAll();
	}
	@Override
	@Transactional
	public PropertyType getById(Integer id) {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().get(PropertyType.class, id);
	}

}
