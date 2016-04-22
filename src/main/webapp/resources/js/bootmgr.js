/**
 * Copyright 2015 - Harsh Panchal <panchal.harsh18@gmail.com>
 */
var MANAGE_PROPERTY_TYPE = 0;
var MANAGE_PROPERTY_DETAIL = 1;
var MANAGE_PROJECT = 2;
var MANAGE_PROJECT_TYPE = 3;
var MANAGE_PROJECT_CONTACT_PERSON = 4;
var MANAGE_PROJECT_INQUIRY = 5;
var MANAGE_PROJECT_PROPERTY_PLAN = 6;
var MANAGE_PROJECT_PROPERTY_BLOCK = 7;
var MANAGE_PROJECT_PROPERTY_TYPE = 8;
var MANAGE_PROJECT_EXTRA_PARKING = 9;
var MANAGE_PROJECT_STATUS = 10;
var MANAGE_BOOKING_DETAIL = 11;
var MANAGE_PARKING_BOOKING_DETAIL = 12;
var MANAGE_STATE = 13;
var MANAGE_EMPLOYEE = 14;
var MANAGE_EMPLOYEEROLE = 15;
var MANAGE_MEASUREMENTUNIT = 16;
var MANAGE_MEMBERDETAIL = 17;
var MANAGE_INQUIRY = 18;
var VIEW_INQUIRY = 19;
var TEST_FRAGMENT = 20;
var ADD_EMPLOYEE = 21;
var ADD_PROJECT_PAYMENT_PLAN = 22;
var FILL_PROGRESS = 23;
var MEMBER_HOME = 24;
var MEMBER_BOOKING_DETAIL = 25;
var MANAGE_BOOKING_DETAIL_LIST = 26;



var LAST_ITEM = 26;
var SIDEBAR_LIMIT = 100;

var EDIT_PROJECT = SIDEBAR_LIMIT;

var REGEX_NUMBER_ONLY = /^\d+$/;
var REGEX_NO_SPECIAL_CHAR_EXCEPT_UNDSCR = /^[0-9a-zA-Z_]*$/;

var dialog;

function loadPage(id, callbackfunction) {
	$("#loading").show();
	if (id < SIDEBAR_LIMIT) {
		$(".navbar_tab").removeClass("activeLink");
		$("#nav_" + id).addClass("activeLink");
	}
	switch (id) {
		case MANAGE_PROPERTY_TYPE:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_add_property_type',
					function() {
						// Disable form submission on pressing enter
						$('#propType').on('keyup keypress', function(e) {
							var code = e.keyCode || e.which;
							if (code == 13) {
								e.preventDefault();
								return false;
							}
						});
						$('#projectContainer').DataTable();
					});
			break;
		case MANAGE_PROPERTY_DETAIL:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_property_detail',
					function() {
						$('#projectContainer').DataTable();
					});
			break;
		
		case MANAGE_PROJECT_TYPE:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_project_type',
					function() {
						$('#projectContainer').DataTable();
					});
			break;
		case MANAGE_PROJECT:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_project',
					function() {
						$(".contact-person-multiple").select2({
							placeholder: "Select a contact person"
						});
						$(".property-type-multiple").select2({
							placeholder: "Select a property type"
						});
						$('#projectContainer').DataTable();
					});
			break;
		case MANAGE_STATE:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_state',
					function() {

						// Disable form submission on pressing enter
						$('#stateModel').on('keyup keypress', function(e) {
							var code = e.keyCode || e.which;
							if (code == 13) {
								e.preventDefault();
								return false;
							}
				   		});
					  
						$('#projectContainer').DataTable();
						if(callbackfunction)
							callbackfunction();
					});
			break;
		case MANAGE_EMPLOYEE:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_employee',
					function() {
						$('#employeeContainer').DataTable();
					});
			break;
		case MANAGE_EMPLOYEEROLE:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_employee_role',
					function() {
						// Disable form submission on pressing enter
						$('#employeeRoleModel').on('keyup keypress', function(e) {
							var code = e.keyCode || e.which;
							if (code == 13) {
								e.preventDefault();
								return false;
							}
						});
						$('#projectContainer').DataTable();
					});
			break;
		case MANAGE_MEASUREMENTUNIT:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_measurement',
					function() {
						$('#projectContainer').DataTable();
					});
			break;
		case MANAGE_INQUIRY:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_inquiry',
					function() {
						$('#projectContainer').DataTable();
					});
			break;

		case VIEW_INQUIRY:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_view_inquiry',
					function() {
						$('#inquiryContainer').DataTable({
							// Disable sorting until server is ready for it
							"bSort" : false,
							"processing": true,
							"serverSide": true,
							"ajax": "fetchInquiries",
							"aoColumnDefs":
							[
								{ "bVisible": false, "aTargets": [ 0 ] },
							],
						});
					});
			break;

		case MANAGE_MEMBERDETAIL:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_member_detail',
					function() {
						$('#projectContainer').DataTable();
					});
			break;
		case MANAGE_PROJECT_CONTACT_PERSON:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_project_contact_person',
					function() {
						$('#projectContainer').DataTable();
					});
			break;
		case MANAGE_PROJECT_PROPERTY_BLOCK:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_project_property_block',
					function() {
						$('#projectContainer').DataTable();
					});
			break;

		case MANAGE_PROJECT_PROPERTY_PLAN:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_project_property_plan',
					function() {
						$('#projectContainer').DataTable();
					});
			break;

		case MANAGE_PROJECT_INQUIRY:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_project_inquiry',
					function() {
						$('#projectContainer').DataTable();
					});
			break;

		case MANAGE_PROJECT_PROPERTY_TYPE:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_project_property_type',
					function() {
						$('#projectContainer').DataTable();
					});
			break;

		case MANAGE_PROJECT_STATUS:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_projects_status',
					function() {
						$('#projectContainer').DataTable();
					});
			break;
		case MANAGE_PARKING_BOOKING_DETAIL:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_parking_booking_details',

					function() {
						$('#projectContainer').DataTable();
					});
			break;
		case MANAGE_PROJECT_EXTRA_PARKING:
			execLoadWrapper('#contentWrapper',
					'fragment/fragement_manage_project_extra_parking',
					function() {
						$('#projectContainer').DataTable();
					});
			break;
		case MANAGE_BOOKING_DETAIL:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_booking_detail',
					function() {
						$('#projectContainer').DataTable();
					});
			break;
		case TEST_FRAGMENT:
			execLoadWrapper('#contentWrapper', 'fragment/test',
					function() {

					});
			break;
		case ADD_EMPLOYEE:
			execLoadWrapper('#contentWrapper', 'fragment/fragment_add_employee',
					function() {
						// Disable form submission on pressing enter
						$('#newUser').on('keyup keypress', function(e) {
							var code = e.keyCode || e.which;
							if (code == 13) {
								e.preventDefault();
								return false;
							}
						});
					});
			break;
		case ADD_PROJECT_PAYMENT_PLAN:
			execLoadWrapper('#contentWrapper', 'fragment/fragment_add_payment_plan', function() {
				$('#projectContainer').DataTable();
			});
			break;
		case FILL_PROGRESS:
			execLoadWrapper('#contentWrapper', 'fragment/fragment_fill_progress');
			break;
		case MEMBER_HOME:
			execLoadWrapper('#contentWrapper', 'fragment/fragment_member_home');
			break;
		case MEMBER_BOOKING_DETAIL:
			execLoadWrapper('#contentWrapper', 'fragment/fragment_member_booking_detail');
			break;
			
		case MANAGE_BOOKING_DETAIL_LIST:
			execLoadWrapper('#contentWrapper', 'fragment/fragement_manage_booking_detail_list',
					function() {
						$('#employeeContainer').DataTable({
                            "scrollX": true
                        });
					});
			break;	
	}
}

function execLoadWrapper(targetDivision, requestPage, additionalCallBack) {
	$(targetDivision).load(requestPage, function(responseText, textStatus, xhr) {
		// if there is any error, reload page
		if(xhr.status != 200)
		
		if (additionalCallBack != null)
			additionalCallBack();
		$("#loading").hide();
	});
}


/**
 * editOptions: Shows pop up for actions valid for specific record.
 * Currently it only supports Edit/Delete options. The following two
 * functions must be overridden by specific page
 *  	onUpdateClick: Function to be called after clicking edit option
 *  	onDeleteClick: Function to be called after clicking delete option
 */
function editOptions(e) {
	$(document).find('#editOptionsMenu').remove();
	$(e).closest('td').append('<div id="editOptionsMenu"><ul><li><a onClick="onUpdateClick(this)">edit</a></li><li><a onClick="onDeleteClick(this)">delete</a></li></ul></div>');
	$('#editOptionsMenu').hover(function () {}, function () {
		$(this).remove();
	});
}

var iconIndicator = 0;

function toggleLoadingIcon(show) {
	if(show) {
        iconIndicator++;
        $("#loading").show();
    } else {
        iconIndicator--;
        if(iconIndicator == 0)
            $("#loading").hide();
    }
}
