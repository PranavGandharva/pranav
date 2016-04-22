package com.demo.vo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class PropertyDetail {

	@Id
	@GeneratedValue
	private int id;
	
	@ManyToOne
	@JoinColumn(name="Project_id")
	private Project project; 
	
	@ManyToOne
	@JoinColumn(name="Property_id")
	private PropertyType propertype;
	
	@ManyToOne
	@JoinColumn(name="Block_id")
	private ProjectPropertyBlock propertyBlock;
	
	private int propertyNumber;
	
    private int floorNumber;
	
	@Column(precision=6, scale=2)
	private float flatArea;
	
	@Column(precision=6, scale=2)
	private float buildUpArea;
	
	@Column(precision=6, scale=2)
	private float undividedLandArea;
	
	@ManyToOne
	@JoinColumn(name="Mesurement_id")
	private MeasurementUnit unit;
	
	private String description;
	
	@OneToOne
	private ProjectPropertyPlan projectPropertyPlan;
	
	@OneToOne(mappedBy="propertydetail")
    private BookingDetail bookingdetail;

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

	public PropertyType getPropertype() {
		return propertype;
	}

	public void setPropertype(PropertyType propertype) {
		this.propertype = propertype;
	}

	public ProjectPropertyBlock getPropertyBlock() {
		return propertyBlock;
	}

	public void setPropertyBlock(ProjectPropertyBlock propertyBlock) {
		this.propertyBlock = propertyBlock;
	}

	public int getPropertyNumber() {
		return propertyNumber;
	}

	public void setPropertyNumber(int propertyNumber) {
		this.propertyNumber = propertyNumber;
	}

	public int getFloorNumber() {
		return floorNumber;
	}

	public void setFloorNumber(int floorNumber) {
		this.floorNumber = floorNumber;
	}

	public float getFlatArea() {
		return flatArea;
	}

	public void setFlatArea(float flatArea) {
		this.flatArea = flatArea;
	}

	public float getBuildUpArea() {
		return buildUpArea;
	}

	public void setBuildUpArea(float buildUpArea) {
		this.buildUpArea = buildUpArea;
	}

	public float getUndividedLandArea() {
		return undividedLandArea;
	}

	public void setUndividedLandArea(float undividedLandArea) {
		this.undividedLandArea = undividedLandArea;
	}

	public MeasurementUnit getUnit() {
		return unit;
	}

	public void setUnit(MeasurementUnit unit) {
		this.unit = unit;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public ProjectPropertyPlan getProjectPropertyPlan() {
		return projectPropertyPlan;
	}

	public void setProjectPropertyPlan(ProjectPropertyPlan projectPropertyPlan) {
		this.projectPropertyPlan = projectPropertyPlan;
	}

	public BookingDetail getBookingdetail() {
		return bookingdetail;
	}

	public void setBookingdetail(BookingDetail bookingdetail) {
		this.bookingdetail = bookingdetail;
	}

	@Override
	public String toString() {
		return "PropertyDetail [id=" + id + ", project=" + project + ", propertype=" + propertype + ", propertyBlock="
				+ propertyBlock + ", propertyNumber=" + propertyNumber + ", floorNumber=" + floorNumber + ", flatArea="
				+ flatArea + ", buildUpArea=" + buildUpArea + ", undividedLandArea=" + undividedLandArea + ", unit="
				+ unit + ", description=" + description + ", projectPropertyPlan=" + projectPropertyPlan
				+ ", bookingdetail=" + bookingdetail + "]";
	}	

    
	
}
