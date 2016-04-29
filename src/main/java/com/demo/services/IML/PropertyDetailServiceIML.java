package com.demo.services.IML;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.demo.dao.PropertyDetailDao;
import com.demo.services.PropertyDetailService;
import com.demo.vo.PropertyDetail;

@Service
@Transactional
public class PropertyDetailServiceIML implements PropertyDetailService {

	@Autowired
	private PropertyDetailDao dao;	
	
	@Override
	public void insert(PropertyDetail object) {
		// TODO Auto-generated method stub
		dao.save(object);
	}

	@Override
	public void update(PropertyDetail object) {
		// TODO Auto-generated method stub
		dao.update(object);
	}

	@Override
	public List<PropertyDetail> getAll() {
		// TODO Auto-generated method stub
		return dao.getAll();
	}

	@Override
	public void delete(PropertyDetail object) {
		// TODO Auto-generated method stub
		dao.delete(object);
	}

}
