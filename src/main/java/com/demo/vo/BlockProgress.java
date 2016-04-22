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

@Entity
public class BlockProgress {

	@Id
	@GeneratedValue
	private int id;

	@ManyToOne
	@JoinColumn(name = "block_Id")
	private ProjectPropertyBlock block;

	private Date dateOfCompletion;

	private boolean completed;

	private Date finalDateOfCompletion;

	@ElementCollection
	@CollectionTable(joinColumns=@JoinColumn(name="Blk_d"),name="DateReview")
	@OrderColumn(name="idx")
	private List<Date> reiewDates = new ArrayList<Date>();

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public ProjectPropertyBlock getBlock() {
		return block;
	}

	public void setBlock(ProjectPropertyBlock block) {
		this.block = block;
	}

	public Date getDateOfCompletion() {
		return dateOfCompletion;
	}

	public void setDateOfCompletion(Date dateOfCompletion) {
		this.dateOfCompletion = dateOfCompletion;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public Date getFinalDateOfCompletion() {
		return finalDateOfCompletion;
	}

	public void setFinalDateOfCompletion(Date finalDateOfCompletion) {
		this.finalDateOfCompletion = finalDateOfCompletion;
	}

	public List<Date> getReiewDates() {
		return reiewDates;
	}

	public void setReiewDates(List<Date> reiewDates) {
		this.reiewDates = reiewDates;
	}

	
}
