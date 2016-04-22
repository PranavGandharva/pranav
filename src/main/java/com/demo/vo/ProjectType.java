package com.demo.vo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ProjectType {
	@Id
	@GeneratedValue
	private int projectTypeID;
	private String name;
	public int getProjectTypeID() {
		return projectTypeID;
	}
	public void setProjectTypeID(int projectTypeID) {
		this.projectTypeID = projectTypeID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}


}
