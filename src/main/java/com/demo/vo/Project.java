package com.demo.vo;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Type;

@Entity
public class Project {

	@Id
	@GeneratedValue
	private int id;
	
	private String name;
	private String city;
	private String address1;
	private String address2;
	
	private String description;
	private String planfilepath;
	
	private String startdate;
	private String enddate;
	
	@Type(type="yes_no")
	private boolean active;
	
	@ManyToOne
	@JoinColumn(name="ProjectStatus")
	private ProjectStatus status;
	
	@OneToMany
	@JoinColumn(name="project_id")
	private Set<ProjectFile> projectfiles= new HashSet<ProjectFile>();
	
	@OneToMany(mappedBy="project")
	@OrderColumn(name="blckidx")
	@Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
	private List<ProjectPropertyBlock> blocks = new ArrayList<ProjectPropertyBlock>();	

    @ManyToMany
    @JoinTable(name="ProjectContactPerson",
    joinColumns={@JoinColumn(name="Project_id")},
    inverseJoinColumns={@JoinColumn(name="Employee_id")})
    private List<Employee> contactPerson= new ArrayList<Employee>();
	
    
    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(name="ProjectPropertyType",
    joinColumns={@JoinColumn(name="Project_id")},
    inverseJoinColumns={@JoinColumn(name="propertyTypeId")})
    private List<PropertyType> propertyType= new ArrayList<PropertyType>();
    
    
    @OneToMany(mappedBy="project",cascade=CascadeType.ALL)
    private List<PaymentPlan> paymentPlan= new ArrayList<PaymentPlan>();


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


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public String getAddress1() {
		return address1;
	}


	public void setAddress1(String address1) {
		this.address1 = address1;
	}


	public String getAddress2() {
		return address2;
	}


	public void setAddress2(String address2) {
		this.address2 = address2;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getPlanfilepath() {
		return planfilepath;
	}


	public void setPlanfilepath(String planfilepath) {
		this.planfilepath = planfilepath;
	}


	public String getStartdate() {
		return startdate;
	}


	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}


	public String getEnddate() {
		return enddate;
	}


	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}


	public boolean isActive() {
		return active;
	}


	public void setActive(boolean active) {
		this.active = active;
	}


	public ProjectStatus getStatus() {
		return status;
	}


	public void setStatus(ProjectStatus status) {
		this.status = status;
	}


	public Set<ProjectFile> getProjectfiles() {
		return projectfiles;
	}


	public void setProjectfiles(Set<ProjectFile> projectfiles) {
		this.projectfiles = projectfiles;
	}


	public List<ProjectPropertyBlock> getBlocks() {
		return blocks;
	}


	public void setBlocks(List<ProjectPropertyBlock> blocks) {
		this.blocks = blocks;
	}


	public List<Employee> getContactPerson() {
		return contactPerson;
	}


	public void setContactPerson(List<Employee> contactPerson) {
		this.contactPerson = contactPerson;
	}


	public List<PropertyType> getPropertyType() {
		return propertyType;
	}


	public void setPropertyType(List<PropertyType> propertyType) {
		this.propertyType = propertyType;
	}


	public List<PaymentPlan> getPaymentPlan() {
		return paymentPlan;
	}


	public void setPaymentPlan(List<PaymentPlan> paymentPlan) {
		this.paymentPlan = paymentPlan;
	}


	@Override
	public String toString() {
		return "Project [id=" + id + ", name=" + name + ", city=" + city + ", address1=" + address1 + ", address2="
				+ address2 + ", description=" + description + ", planfilepath=" + planfilepath + ", startdate="
				+ startdate + ", enddate=" + enddate + ", active=" + active + ", status=" + status + ", projectfiles="
				+ projectfiles + ", blocks=" + blocks + ", contactPerson=" + contactPerson + ", propertyType="
				+ propertyType + ", paymentPlan=" + paymentPlan + "]";
	}
    
        
    

}
