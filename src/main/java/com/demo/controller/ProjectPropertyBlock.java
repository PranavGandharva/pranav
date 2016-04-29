package com.demo.controller;

import java.beans.PropertyEditorSupport;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.services.ProjectPropertyBlockService;
import com.demo.services.ProjectService;
import com.demo.vo.Project;


@Controller
public class ProjectPropertyBlock {

	@Autowired
	private ProjectService Proservice;
	
	@Autowired
	private ProjectPropertyBlockService service;
	
	@RequestMapping(value="/addProjectPropertyBlock",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> addBlocks(com.demo.vo.ProjectPropertyBlock object,@ModelAttribute("propertyBlock")com.demo.vo.ProjectPropertyBlock ProjectPropertyBlock){
      Project project=Proservice.getById(ProjectPropertyBlock.getProject().getId());	
		project.getBlocks().add(ProjectPropertyBlock);
		Proservice.update(project);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value="/updateProjectPropertyBlock",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> updateBlocks(
			@RequestParam("blockname") String blockname,
			@RequestParam("floorNo") Integer number,
			@RequestParam("blockID") Integer id){
	
		com.demo.vo.ProjectPropertyBlock block=service.getById(id);
		block.setBlock(blockname);
		block.setNoOffloor(number);
                 
		service.update(block);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value="/deleteProjectPropertyBlock",method=RequestMethod.POST)
	public ResponseEntity<HttpStatus> deleteBlocks(com.demo.vo.ProjectPropertyBlock object){
		service.delete(object);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	 

	@InitBinder
	public void binder(WebDataBinder binder){
		binder.registerCustomEditor(Project.class,new Projects());
		
		
	}
			
	public class Projects extends PropertyEditorSupport{
	@Override
		public void setAsText(String text) throws IllegalArgumentException {
			// TODO Auto-generated method stub
		setValue(Proservice.getById(Integer.parseInt(text)));
		}	
		
	}
	
}
