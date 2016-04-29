package com.demo.vo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class ProjectPropertyPlan {

	@Id
	@GeneratedValue
	private int id;
	
	@Column(length=50)
	private String planName;
	
	@Column(length=255)
	private String planFilePath;
	
	private int floorNumber;
	
	@ManyToOne
	@JoinColumn(name="Block_ID")
	@JsonBackReference
    private ProjectPropertyBlock block;
    
	@ManyToOne
	@JoinColumn(name="PropertyTypeId")
	private PropertyType propertyType;
	
	@ManyToOne
	@JoinColumn(name="projectID")
	@JsonIgnore
    private Project project;
		
	private String mimeType;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPlanName() {
		return planName;
	}

	public void setPlanName(String planName) {
		this.planName = planName;
	}

	public String getPlanFilePath() {
		return planFilePath;
	}

	public void setPlanFilePath(String planFilePath) {
		this.planFilePath = planFilePath;
	}

	public int getFloorNumber() {
		return floorNumber;
	}

	public void setFloorNumber(int floorNumber) {
		this.floorNumber = floorNumber;
	}

	public ProjectPropertyBlock getBlock() {
		return block;
	}

	public void setBlock(ProjectPropertyBlock block) {
		this.block = block;
	}

	public PropertyType getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(PropertyType propertyType) {
		this.propertyType = propertyType;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public String getMimeType() {
		return mimeType;
	}

	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}

	@Override
	public String toString() {
		return "ProjectPropertyPlan [id=" + id + ", planName=" + planName + ", planFilePath=" + planFilePath
				+ ", floorNumber=" + floorNumber + ", block=" + block + ", propertyType=" + propertyType + ", project="
				+ project + ", mimeType=" + mimeType + "]";
	}

	
}
