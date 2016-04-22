package com.demo.vo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Type;

@Entity
public class Inquiry {

	@Id
	@GeneratedValue
	private int id;
	
	@Column(length = 200)
	private String visitorName;
	
	@ManyToOne
	@JoinColumn(name="VisitedProjectId")
	private Project visitedSite;
	
	
	@ManyToOne
	@JoinColumn(name="ContactPersonId")
	private Employee attendee;
	
	@ManyToOne
	@JoinColumn(name="FollowUpBy")
	private Employee followupby;
	
	private Date folloupDate;
	
	@Type(type="date")
	private Date visitDate;
	private int intimeHour;
	private int intimeMinute;
	private int outtimeHour;
	private int outtimeMinute;
	
	@Column(length = 255)
	private String areaOrCity;
	
	@Column(length = 30)
	private String contactNumber;
	
	@Column(length = 200)
	private String email;
	
	@Column(length = 200)
	private String referenceBy;
	
	@Column(length = 500)
	private String remark;
	
	private int inquiryType;
	private int noOfVisit;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getVisitorName() {
		return visitorName;
	}
	public void setVisitorName(String visitorName) {
		this.visitorName = visitorName;
	}
	public Project getVisitedSite() {
		return visitedSite;
	}
	public void setVisitedSite(Project visitedSite) {
		this.visitedSite = visitedSite;
	}
	public Employee getAttendee() {
		return attendee;
	}
	public void setAttendee(Employee attendee) {
		this.attendee = attendee;
	}
	public Employee getFollowupby() {
		return followupby;
	}
	public void setFollowupby(Employee followupby) {
		this.followupby = followupby;
	}
	public Date getFolloupDate() {
		return folloupDate;
	}
	public void setFolloupDate(Date folloupDate) {
		this.folloupDate = folloupDate;
	}
	public Date getVisitDate() {
		return visitDate;
	}
	public void setVisitDate(Date visitDate) {
		this.visitDate = visitDate;
	}
	public int getIntimeHour() {
		return intimeHour;
	}
	public void setIntimeHour(int intimeHour) {
		this.intimeHour = intimeHour;
	}
	public int getIntimeMinute() {
		return intimeMinute;
	}
	public void setIntimeMinute(int intimeMinute) {
		this.intimeMinute = intimeMinute;
	}
	public int getOuttimeHour() {
		return outtimeHour;
	}
	public void setOuttimeHour(int outtimeHour) {
		this.outtimeHour = outtimeHour;
	}
	public int getOuttimeMinute() {
		return outtimeMinute;
	}
	public void setOuttimeMinute(int outtimeMinute) {
		this.outtimeMinute = outtimeMinute;
	}
	public String getAreaOrCity() {
		return areaOrCity;
	}
	public void setAreaOrCity(String areaOrCity) {
		this.areaOrCity = areaOrCity;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getReferenceBy() {
		return referenceBy;
	}
	public void setReferenceBy(String referenceBy) {
		this.referenceBy = referenceBy;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getInquiryType() {
		return inquiryType;
	}
	public void setInquiryType(int inquiryType) {
		this.inquiryType = inquiryType;
	}
	public int getNoOfVisit() {
		return noOfVisit;
	}
	public void setNoOfVisit(int noOfVisit) {
		this.noOfVisit = noOfVisit;
	}
	@Override
	public String toString() {
		return "inquiry [id=" + id + ", visitorName=" + visitorName + ", visitedSite=" + visitedSite + ", attendee="
				+ attendee + ", followupby=" + followupby + ", folloupDate=" + folloupDate + ", visitDate=" + visitDate
				+ ", intimeHour=" + intimeHour + ", intimeMinute=" + intimeMinute + ", outtimeHour=" + outtimeHour
				+ ", outtimeMinute=" + outtimeMinute + ", areaOrCity=" + areaOrCity + ", contactNumber=" + contactNumber
				+ ", email=" + email + ", referenceBy=" + referenceBy + ", remark=" + remark + ", inquiryType="
				+ inquiryType + ", noOfVisit=" + noOfVisit + "]";
	}
	
		
	
}
