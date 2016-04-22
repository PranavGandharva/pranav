package com.demo.vo;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.Cascade;

@Entity
@Table(uniqueConstraints=@UniqueConstraint(columnNames="username"),name="UNIQUE_USERNAME")
public class Employee {

	
	@Id
	@GeneratedValue
	private int id;
	private String firstname;
	private String lastname;
	private String address1;
	private String address2;
	private String city;
	
	@Column(length=20)
	private String mobno;
	private String email;
	
	private String username;
	private String password;
	
	@ManyToOne
	@JoinColumn(name="RoleId")
	private EmployeeRole role;
	
	@Column(length=3)
	private String extension; 
	
	private boolean active=true;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="detail_id")
	private MemberDetail detail;
	
	@ManyToOne
	@JoinColumn(name="State_id")
	private State state; 
	private String phnNo;
	
	@ManyToMany(mappedBy="contactPerson")
	private List<Project> assignProject= new ArrayList<Project>();

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
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

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getMobno() {
		return mobno;
	}

	public void setMobno(String mobno) {
		this.mobno = mobno;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public EmployeeRole getRole() {
		return role;
	}

	public void setRole(EmployeeRole role) {
		this.role = role;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public MemberDetail getDetail() {
		return detail;
	}

	public void setDetail(MemberDetail detail) {
		this.detail = detail;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}

	public String getPhnNo() {
		return phnNo;
	}

	public void setPhnNo(String phnNo) {
		this.phnNo = phnNo;
	}

	public List<Project> getAssignProject() {
		return assignProject;
	}

	public void setAssignProject(List<Project> assignProject) {
		this.assignProject = assignProject;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", firstname=" + firstname + ", lastname=" + lastname + ", address1=" + address1
				+ ", address2=" + address2 + ", city=" + city + ", mobno=" + mobno + ", email=" + email + ", username="
				+ username + ", password=" + password + ", role=" + role + ", extension=" + extension + ", active="
				+ active + ", detail=" + detail + ", state=" + state + ", phnNo=" + phnNo + ", assignProject="
				+ assignProject + "]";
	}
	
		
}
