package com.demo.vo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OrderColumn;

import org.hibernate.annotations.Type;

@Entity
public class BookingDetail {

	@Id
	@GeneratedValue
	private int id; 
	
	@ManyToOne
	@JoinColumn(name="project_id")
	private Project project;
	
	@ManyToOne
	@JoinColumn(name="PropertyDetail")
	private PropertyDetail propertydetail;


	@ManyToOne
	@JoinColumn(name="BookBy")
    private Employee bookByEmp;
    
	@ManyToOne
	@JoinColumn(name="member_id")
	private Employee memberdetail; 
	
	private String note;
	
	private Date bookingDate;
	
	@Type(type="yes_no")
	private boolean resale = false;
	
	@Type(type="yes_no")
	private boolean availableForResale;
	
	
	@ElementCollection
	@CollectionTable(joinColumns=@JoinColumn(name="detailID"), name="payment_data")
	@OrderColumn(name="idx")
	private List<Boolean> paymentData = new ArrayList<Boolean>();


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


	public PropertyDetail getPropertydetail() {
		return propertydetail;
	}


	public void setPropertydetail(PropertyDetail propertydetail) {
		this.propertydetail = propertydetail;
	}


	public Employee getBookByEmp() {
		return bookByEmp;
	}


	public void setBookByEmp(Employee bookByEmp) {
		this.bookByEmp = bookByEmp;
	}


	public Employee getMemberdetail() {
		return memberdetail;
	}


	public void setMemberdetail(Employee memberdetail) {
		this.memberdetail = memberdetail;
	}


	public String getNote() {
		return note;
	}


	public void setNote(String note) {
		this.note = note;
	}


	public Date getBookingDate() {
		return bookingDate;
	}


	public void setBookingDate(Date bookingDate) {
		this.bookingDate = bookingDate;
	}


	public boolean isResale() {
		return resale;
	}


	public void setResale(boolean resale) {
		this.resale = resale;
	}


	public boolean isAvailableForResale() {
		return availableForResale;
	}


	public void setAvailableForResale(boolean availableForResale) {
		this.availableForResale = availableForResale;
	}


	public List<Boolean> getPaymentData() {
		return paymentData;
	}


	public void setPaymentData(List<Boolean> paymentData) {
		this.paymentData = paymentData;
	}


	@Override
	public String toString() {
		return "BookingDetail [id=" + id + ", project=" + project + ", propertydetail=" + propertydetail
				+ ", bookByEmp=" + bookByEmp + ", memberdetail=" + memberdetail + ", note=" + note + ", bookingDate="
				+ bookingDate + ", resale=" + resale + ", availableForResale=" + availableForResale + ", paymentData="
				+ paymentData + "]";
	}

		
	
}
