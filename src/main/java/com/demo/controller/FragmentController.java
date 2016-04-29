package com.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.demo.binders.ProjectFormBilnder;
import com.demo.services.EmployeeRoleService;
import com.demo.services.EmployeeService;
import com.demo.services.MeasurementUnitService;
import com.demo.services.MemberDetailService;
import com.demo.services.ProjectPropertyBlockService;
import com.demo.services.ProjectPropertyPlanService;
import com.demo.services.ProjectService;
import com.demo.services.ProjectStatusService;
import com.demo.services.ProjectTypeService;
import com.demo.services.PropertyDetailService;
import com.demo.services.PropertyTypeService;
import com.demo.services.StateService;
import com.demo.vo.Employee;
import com.demo.vo.EmployeeRole;
import com.demo.vo.MeasurementUnit;
import com.demo.vo.Project;
import com.demo.vo.ProjectPropertyBlock;
import com.demo.vo.ProjectPropertyPlan;
import com.demo.vo.ProjectStatus;
import com.demo.vo.ProjectType;
import com.demo.vo.PropertyDetail;
import com.demo.vo.PropertyType;
import com.demo.vo.State;

@Controller
public class FragmentController {

	@Autowired
	private StateService service;

	@Autowired
	private MeasurementUnitService mservice;

	@Autowired
	private MemberDetailService memservice;

	@Autowired
	private EmployeeRoleService roleservice;

	@Autowired
	private EmployeeService empservice;

	@Autowired
	private PropertyTypeService propservice;
	
	@Autowired
	private ProjectStatusService projservice;
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private ProjectTypeService projtypeService;
	
	@Autowired
	private ProjectPropertyBlockService blockservice;
	
	@Autowired
	private ProjectPropertyPlanService planservice;
	
	@Autowired
	private PropertyDetailService detail;
	
	@RequestMapping("fragment/fragement_manage_state")
	public String getStateFragment(Model model) {
		model.addAttribute("stateModel", new State());
		model.addAttribute("states", service.getAll());
		return "admin/fragments/manage_state";
	}

	@RequestMapping("fragment/fragement_manage_measurement")
	public String getunit(Model model) {
		model.addAttribute("measurementModel", new MeasurementUnit());
		model.addAttribute("measurements", service.getAll());
		return "admin/fragments/manage_measurement";
	}

	@RequestMapping("fragment/fragement_manage_member_detail")
	public String getMember(Model model) {
		model.addAttribute("employee", new Employee());
		model.addAttribute("members", memservice.getAll());
		return "admin/fragments/manage_member_detail";
	}

	@RequestMapping("fragment/fragment_view_member_detail")
	public String getmemdetail(Model model, @RequestParam(value = "id") Integer id) {
		model.addAttribute("members", memservice.getById(id));

		return "admin/fragments/view_member_detail";
	}

	@RequestMapping("fragment/fragement_manage_employee_role")
	public String getEmployeeRole(Model model) {
		model.addAttribute("employeeRoleModel", new EmployeeRole());
		model.addAttribute("emplrole", roleservice.getAll());

		return "admin/fragments/manage_employee_role";
	}

	@RequestMapping("fragment/fragement_manage_employee")
	public String getEmployee(Model model) {
		model.addAttribute("employees", empservice.getAll());
		return "admin/fragments/manage_employee";
	}

	@RequestMapping("fragment/fragment_add_employee")
	public String addEmployee(Model model, @RequestParam(value="id",required=false) Integer id) {
		System.out.println("employeeID:=="+id);
		
		model.addAttribute("newUser",id==null?new Employee():empservice.getById(id));
		model.addAttribute("roles", roleservice.getAll());
		model.addAttribute("states",service.getAll());
		
		if (id != null)
			model.addAttribute("isNotStandAloneFragment", true);

		
		return "admin/fragments/add_employee";
	}

	@RequestMapping("fragment/fragement_manage_project")
	public String getproject(Model model){
		model.addAttribute("projectModel",new ProjectFormBilnder());
		model.addAttribute("employees",empservice.getAll());
		model.addAttribute("propertyType",propservice.getAll());
		model.addAttribute("projectstatuses",projservice.getAll());
	    model.addAttribute("projects",projectService.getAll());
		model.addAttribute("projectTypes",projtypeService.getAll());
	    
		return "admin/fragments/manage_project";
	}
	
   @RequestMapping("fragment/fragement_manage_project_type") 
   public String getProjectType(Model model){
	   model.addAttribute("projectTypeModel",new ProjectType());
	   model.addAttribute("projectTypes",projtypeService.getAll());
	   
	   return"admin/fragments/manage_project_type";
   }
   @RequestMapping("fragment/fragement_manage_projects_status")
   public String getProjectStatus(Model model){
	   
	   model.addAttribute("projectStatusModel",new ProjectStatus());
	   model.addAttribute("projectstatuses",projservice.getAll());
	   
	   return "admin/fragments/manage_projects_status";
   }

   @RequestMapping("fragment/fragement_add_property_type")
   public String getPropertyType(Model model){
	   model.addAttribute("propType",new PropertyType());
	   model.addAttribute("types",propservice.getAll());
	   	   
	   return "admin/fragments/manage_property_type";
   }
   
   @RequestMapping("fragment/fragement_manage_project_property_block")
   public String getProjProBlock(Model model){
	model.addAttribute("propertyBlock",new ProjectPropertyBlock());
	model.addAttribute("blocks",blockservice.getAll());
	model.addAttribute("projects",projectService.getAll());
	
	return "admin/fragments/manage_project_property_block";
   }
   
   @RequestMapping("fragment/fragment_edit_project")
   public String editProject(Model model,@RequestParam("id") Integer id){
	   ProjectFormBilnder binder = new ProjectFormBilnder();
	   binder.setProject(projectService.getById(id));
	   
	   model.addAttribute("projectUpdateModel",binder);
	   model.addAttribute("projectTypes",projtypeService.getAll());
	   model.addAttribute("projectstatuses",projservice.getAll());
	   model.addAttribute("employees",empservice.getAll());
	   model.addAttribute("propTypes",propservice.getAll());
	   
	   return"admin/fragments/edit_project";
   }
   
   @RequestMapping("fragment/fragement_manage_project_property_plan")
   public String ProjPropPlan(Model model){
	   	   
	   model.addAttribute("propertyPlan",new ProjectPropertyPlan());
	   model.addAttribute("projects",projectService.getAll());
	   model.addAttribute("propTypes",propservice.getAll());
	   model.addAttribute("plans",planservice.getAll());
	   
	   return"admin/fragments/manage_project_property_plan";
   }
   
   @RequestMapping("fragment/fragment_edit_project_property_plan")
   public String updatePlan(Model model,@RequestParam int id){
          
	   model.addAttribute("updateProjectPropertyPlanModel",new ProjectPropertyPlan());
	   model.addAttribute("projects",projectService.getAll());
	   model.addAttribute("propTypes",propservice.getAll());
	   model.addAttribute("blocks",blockservice.getAll());
	   
	   return "admin/fragments/edit_project_property_plan";
   }
   
   @RequestMapping("fragment/fragement_manage_property_detail")
   public String getPropertyDetail(Model model){
	 List<Project>  project= projectService.getAll();
	   if(project != null && project.size()>0)
		   model.addAttribute("projects",projectService.getAll());
          if(project.get(0).getBlocks()!=null && project.get(0).getBlocks().size()>0)
       model.addAttribute("plan", planservice.getById(project.get(0).getBlocks().get(0).getId()));
       
       model.addAttribute("measurements",mservice.getAll());
	   model.addAttribute("propertyDetail",new PropertyDetail());
	   model.addAttribute("propDetails",detail.getAll());
	   
	   
	   return "admin/fragments/manage_property_detail";
   }
   
}
