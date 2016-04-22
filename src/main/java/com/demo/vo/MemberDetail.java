package com.demo.vo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class MemberDetail {

	@Id
	@GeneratedValue
	private int id;
	
	@Column(length=20)
	private String PanNo; 
	
	@Column(length=20)
	private String AnniversaryDate;
    private String dateofbirth;
	
	@Column(length=20)
    private String profession;
	
	@Column(length=10)
	private String age;

	@Column(length=10)
	private String ContactNo;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPanNo() {
		return PanNo;
	}

	public void setPanNo(String panNo) {
		PanNo = panNo;
	}

	public String getAnniversaryDate() {
		return AnniversaryDate;
	}

	public void setAnniversaryDate(String anniversaryDate) {
		AnniversaryDate = anniversaryDate;
	}

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getContactNo() {
		return ContactNo;
	}

	public void setContactNo(String contactNo) {
		ContactNo = contactNo;
	}

	public String getDateofbirth() {
		return dateofbirth;
	}

	public void setDateofbirth(String dateofbirth) {
		this.dateofbirth = dateofbirth;
	}



}

