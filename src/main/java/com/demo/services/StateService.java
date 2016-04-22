package com.demo.services;

import java.util.List;

import com.demo.vo.State;

public interface StateService {

	public void insert(State object);
    public void update(State object);
    public List<State> getAll();
    public void delete(State object);    


}
