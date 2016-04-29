package com.demo.controller;

import java.beans.PropertyEditorSupport;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.demo.binders.ProjectFormBilnder;
import com.demo.services.EmployeeService;
import com.demo.services.ProjectService;
import com.demo.services.ProjectStatusService;
import com.demo.services.ProjectTypeService;
import com.demo.services.PropertyTypeService;
import com.demo.vo.Employee;
import com.demo.vo.Project;
import com.demo.vo.ProjectFile;
import com.demo.vo.ProjectPropertyBlock;
import com.demo.vo.ProjectPropertyPlan;
import com.demo.vo.ProjectStatus;
import com.demo.vo.ProjectType;
import com.demo.vo.PropertyType;

@Controller
public class ProjectController {

	@Autowired
	private ProjectService service;

	@Autowired
	private ProjectStatusService statservice;

	@Autowired
	private ProjectTypeService typeservice;

	@Autowired
	private EmployeeService empservice;

	@Autowired
	private PropertyTypeService propService;

	@RequestMapping(value = "/addProject", method = RequestMethod.POST)
	public ResponseEntity<HttpStatus> addProject(HttpSession session,
			@ModelAttribute("projectModel") ProjectFormBilnder projBinder, @RequestParam("file") MultipartFile[] file)
					throws IOException {

		System.out.println("serVletContext:--" + "[" + session.getServletContext() + "]");
		;

		File uplodDir = new File(session.getServletContext().getRealPath("/") + "uplodads" + File.separator
				+ "project_file" + File.separator + projBinder.getProject().getName());
		if (!uplodDir.exists())
			uplodDir.mkdirs();

		System.out.println("UPLOADED" + uplodDir);

		Project project = projBinder.getProject();
		List<Employee> employee = projBinder.getEmployee();
		project.setContactPerson(employee);
		List<PropertyType> prop = projBinder.getPropertyType();
		project.setPropertyType(prop);

		for (MultipartFile fi : file) {
			System.out.println("filename:->" + "     " + fi.getOriginalFilename() + "contenttype:->" + "    "
					+ fi.getContentType() + "size:->" + "   " + fi.getSize() / 1024 + "KB" + "Dir:--" + "     "
					+ uplodDir.getAbsolutePath());

			BufferedOutputStream bo = new BufferedOutputStream(
					new FileOutputStream(uplodDir.getAbsolutePath() + File.separator + fi.getOriginalFilename()));
			bo.write(fi.getBytes());
			bo.close();
			ProjectFile pf = new ProjectFile();
			pf.setMimetype(fi.getContentType());
			pf.setName(fi.getOriginalFilename());
			project.getProjectfiles().add(pf);

		}

		service.insert(project);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}

	@RequestMapping(value = "/deleteProject", method = RequestMethod.POST)
	public ResponseEntity<HttpStatus> delete(Project object) {
		service.delete(object);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/updateProject", method = RequestMethod.POST)
	public ResponseEntity<HttpStatus> update(HttpSession session,
			@ModelAttribute("projectUpdateModel") ProjectFormBilnder binder, @RequestParam("file") MultipartFile[] file)
					throws IOException {

		Project project = binder.getProject();
		List<Employee> emp = binder.getEmployee();
		project.setContactPerson(emp);
		project.setPropertyType(binder.getPropertyType());

		File upload = new File(session.getServletContext().getRealPath("/") + "upload" + File.separator + "project_file"
				+ binder.getProject().getName());

		for (MultipartFile fi : file) {

			BufferedOutputStream bo = new BufferedOutputStream(
					new FileOutputStream(upload.getAbsolutePath() + File.separator + fi.getOriginalFilename()));
			bo.write(fi.getBytes());
			ProjectFile proj = new ProjectFile();
			proj.setMimetype(fi.getContentType());
			proj.setName(fi.getOriginalFilename());
			project.getProjectfiles().add(proj);

		}

		service.update(project);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}

	@InitBinder
	public void formBinder(WebDataBinder binder) {
		System.out.println("M Binder");
		SimpleDateFormat df = new SimpleDateFormat("dd-MM-yyyy");
		CustomDateEditor date = new CustomDateEditor(df, false);

		binder.registerCustomEditor(Date.class, date);
		binder.registerCustomEditor(ProjectStatus.class, new projectStatus());
		binder.registerCustomEditor(ProjectType.class, new projectType());
		binder.registerCustomEditor(List.class, "employee", new PropertyEditorSupport() {

			@Override
			public void setAsText(String text) throws IllegalArgumentException {
				// TODO Auto-generated method stub
				List<Employee> list = new ArrayList<Employee>();
				String str[] = text.split(",");
				for (String string : str) {
					Employee emp = empservice.getById(Integer.parseInt(string));
					if (emp != null)
						list.add(emp);
				}
				setValue(list);

				System.out.println("Binder->employee" + text);
			}

		});
		binder.registerCustomEditor(List.class, "propertyType", new PropertyEditorSupport() {
			@Override
			public void setAsText(String text) throws IllegalArgumentException {
				// TODO Auto-generated method stub
				List<PropertyType> list = new ArrayList<PropertyType>();
				String str[] = text.split(",");
				for (String string : str) {

					PropertyType type = propService.getById(Integer.parseInt(string));
					if (type != null)
						list.add(type);
				}
				setValue(list);
			}

		});

	}

	@RequestMapping(value = "/getPropTypesForPrj/{id}", method = RequestMethod.GET)
	public @ResponseBody List<PropertyType> getProptype(@PathVariable int id) {
		
		System.out.println("propTypeCalled");
		return service.getById(id).getPropertyType();
	}

	@RequestMapping(value="block/{id}",method=RequestMethod.GET)
	public @ResponseBody 
	List<ProjectPropertyBlock> getBlock(@PathVariable int id){
		
		return service.getById(id).getBlocks();
	}
	
	
	public class projectType extends PropertyEditorSupport {
		@Override
		public void setAsText(String text) throws IllegalArgumentException {
			// TODO Auto-generated method stub

			setValue(typeservice.getById(Integer.parseInt(text)));
		}

	}

	public class projectStatus extends PropertyEditorSupport {

		@Override
		public void setAsText(String text) throws IllegalArgumentException {
			// TODO Auto-generated method stub

			System.out.println("Status" + text);
			setValue(statservice.getById(Integer.parseInt(text)));
		}

	}

}
