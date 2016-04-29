package com.demo.dao.IML;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.demo.dao.PropertyDetailDao;
import com.demo.vo.PropertyDetail;

@Component
public class PropertyDetailDaoIML implements PropertyDetailDao{

	@Autowired
	private SessionFactory factory;
	
	@Override
	public PropertyDetail getById(Integer key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<PropertyDetail> getAll() {
		// TODO Auto-generated method stub
		return factory.getCurrentSession().createCriteria(PropertyDetail.class).list();
	}

	@Override
	public void save(PropertyDetail object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().save(object);
	}

	@Override
	public void update(PropertyDetail object) {
		// TODO Auto-generated method stub
	factory.getCurrentSession().update(object);	
	}

	@Override
	public void delete(PropertyDetail object) {
		// TODO Auto-generated method stub
		factory.getCurrentSession().delete(object);
	}

}
