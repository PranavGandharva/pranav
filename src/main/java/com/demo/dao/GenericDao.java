package com.demo.dao;

import java.io.Serializable;
import java.util.List;

public interface GenericDao<T,V extends Serializable> {

	public T getById(V key);
	public List<T> getAll();
	public void save(T object);
	public void update(T object);
	public void delete(T object);
	
}
