package com.demo.vo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Type;

@Entity
public class ProjectInquiry {

	@Id
	@GeneratedValue
	private int id;
	
	@ManyToOne
	@JoinColumn(name="Project_Id")
	private Project project;
	
	@ManyToOne
	@JoinColumn(name="Inquiry_Id")
	private Inquiry inquiry;
	
	@ManyToOne
	@JoinColumn(name="propertyType")
	private PropertyType propertyType;
	
	
	@Type(type="yes_no")
	private boolean interested;
	
	@Type(type="yes_no")
	private boolean showSampleHouse;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public Inquiry getInquiry() {
		return inquiry;
	}

	public void setInquiry(Inquiry inquiry) {
		this.inquiry = inquiry;
	}

	public PropertyType getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(PropertyType propertyType) {
		this.propertyType = propertyType;
	}

	public boolean isInterested() {
		return interested;
	}

	public void setInterested(boolean interested) {
		this.interested = interested;
	}

	public boolean isShowSampleHouse() {
		return showSampleHouse;
	}

	public void setShowSampleHouse(boolean showSampleHouse) {
		this.showSampleHouse = showSampleHouse;
	}

	@Override
	public String toString() {
		return "ProjectInquiry [id=" + id + ", project=" + project + ", inquiry=" + inquiry + ", propertyType="
				+ propertyType + ", interested=" + interested + ", showSampleHouse=" + showSampleHouse + "]";
	}



}
