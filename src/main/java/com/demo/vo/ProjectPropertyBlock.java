package com.demo.vo;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;

@Entity
public class ProjectPropertyBlock {

	@Id
	@GeneratedValue
	private int id;
	
	private String block;
	private int noOffloor;
	
	@ManyToOne
	@JoinColumn(name="project_id")
	private Project project;
	
	
	@OneToMany(mappedBy="block", cascade=CascadeType.ALL, orphanRemoval=true)
	@OrderColumn(name = "idx")
	private List<BlockProgress> progress = new ArrayList<BlockProgress>();


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getBlock() {
		return block;
	}


	public void setBlock(String block) {
		this.block = block;
	}


	public int getNoOffloor() {
		return noOffloor;
	}


	public void setNoOffloor(int noOffloor) {
		this.noOffloor = noOffloor;
	}


	public Project getProject() {
		return project;
	}


	public void setProject(Project project) {
		this.project = project;
	}


	public List<BlockProgress> getProgress() {
		return progress;
	}


	public void setProgress(List<BlockProgress> progress) {
		this.progress = progress;
	}
	
		
}
