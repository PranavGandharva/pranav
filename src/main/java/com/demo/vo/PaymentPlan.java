package com.demo.vo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class PaymentPlan {

	@Id
	@GeneratedValue
	private int id;
	private String name;
	private int completedpercentage;
	
	@ManyToOne
	@JoinColumn(name="Project_id")
	private Project project;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCompletedpercentage() {
		return completedpercentage;
	}

	public void setCompletedpercentage(int completedpercentage) {
		this.completedpercentage = completedpercentage;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}
	
	
	
}
