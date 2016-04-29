<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<script type="text/javascript">
$(".contact-person-multiple").select2({
	placeholder: "Select a contact person"
});
$(".property-type-multiple").select2({
	placeholder: "Select a property type"
});

$('#projectContainer').dataTable();	
	
	var options = {
		success : function(data) {
			$.fallr('hide');
			loadPage(MANAGE_PROJECT);
		},
		error : function(e) {
			alert("Failed to send request to server, Please try again later...!");
		}
	}

	function updatePropertyTypeName() {
		toggleLoadingIcon(true);
		$('#fallrContent').ajaxForm(options).submit();
	}

	function sendDeleteRequest(id) {
		toggleLoadingIcon(true);
		$.ajax({
					type : "POST",
					url : "deleteProject",
					data : "id=" + id,
					success : function() {
						$.fallr('hide');
						loadPage(MANAGE_PROJECT);
					},
					error : function() {
						alert("Failed to connect to server, Please try again later...");
					}
				});
	}

	function onUpdateClick(e) {
		$.fancybox({
			'href' : "fragment/fragment_edit_project?id="
					+ $(e).closest('tr').find('.propID').text(),
			'autoDimensions' : false,
			'scrolling' : 'no',
			'width' : 850,
			'height' : 700,
			'overlayShow' : true,
			cyclic : false,
			'transitionIn' : 'none',
			'transitionOut' : 'none',
			onComplete : function() {
				bottomContentHeightChange();
				$(".et-contact-person-multiple").select2({
					placeholder : "Select a contact person"
				});
				$(".et-property-type-multiple").select2({
					placeholder : "Select a contact person"
				});
				
			},
			onClosed : function() {
				//refreshGrid("ct");
			}
		});
	}

	function onDeleteClick(e) {
		var id = $(e).closest('tr').find('.propID').text();
		$.fallr('show',{
							useOverlay : true,
							position : 'center',
							buttons : {
								button1 : {
									text : 'Delete',
									onclick : function() {
										sendDeleteRequest(id);
									}
								},
								button2 : {
									text : 'Cancel'
								}
							},
							content : '<div id="fallrHeadline">'
									+ '<h5>Warning</h5>'
									+ '</div><div id="fallrContent">'
									+ '<p class="mediumRed">Are you sure want to delete?</p></div>',
							icon : 'error'
						});
		fallrCustom();
	}

	function submitForm() {
		toggleLoadingIcon(true);
	
		$("#projectModel").ajaxForm(options).submit();
		return false;
	}

	function onOpenPopUp2(e) {	
		$.fancybox({
		
			'href' : "fragment/fragment_open_popUp2?id="
				+ $(e).parent().parent().find('.propID').text(),
			'autoDimensions' : false,
			'scrolling' : 'no',
			'width' : 1024,
			'height' : 768,
			'overlayShow' : true,
			cyclic : false,
			'transitionIn' : 'none',
			'transitionOut' : 'none',
			onComplete : function() {
				bottomContentHeightChange();
			},
			onClosed : function() {

			}
		});
	}

	
	$(document).ready(function () {
		$("#projectModel").on("submit", function () {
            var descriptionBox = $("#project\\.description");
            var projectNameHolder = $("#project\\.name")
            var projectCodeHolder = $("#project\\.code");
            var startDateHolder = $("#project\\.startDate");
            var endDateHolder = $("#project\\.endDate");
            var addressHolder = $("#project\\.address1");
            var cityNameHolder = $("#project\\.city");

			var ret = true;
			if ((projectNameHolder.val()) == '') {
				$("#pnm").text("* Project Name is Required.");
                    ret = false;
            } else if (projectNameHolder.val().length > 255) {
                $("#pnm").text("* Length should not exceed 255 characters.");
                ret = false;
            }
            if (($("#project\\.projectType").val()) == null) {
                $("#pnn").text("* Project Type is Required.");
                ret = false;
            }
            if (($("#project\\.state").val()) == null) {
                $("#mnn").text("* State is Required.");
                ret = false;
            }
            if (($("#project\\.projectStatus").val()) == null) {
                $("#nnn").text("* Project Status is Required.");
                ret = false;
            }
            if ((projectCodeHolder.val()) == '') {
                $("#pcode").text("* Code is Required");
                ret = false;
            } else if ((projectCodeHolder.val()).length > 20) {
                $("#pcode").text("* Length should not excceed 20 characters.");
                ret = false;
            }
            if ((startDateHolder.val()) == '') {
                $("#sdate").text("* Starting Date is Required");
                ret = false;
            }
            if ((endDateHolder.val()) == '') {
                $("#edate").text("* Ending Date is Required");
                ret = false;
            }
            if (endDateHolder.val() < startDateHolder.val()) {
                $("#edate").text("*End date must be greater than start date.");
            }
            if ((addressHolder.val()) == '') {
                $("#address").text("* Address should not be empty");
                ret = false;
            }
            if ((addressHolder.val().length > 255)) {
                $("#address").text("* Length should not excceed 255 characters.");
                ret = false;
            }
            if ((cityNameHolder.val()) == '') {
                $("#city").text("* City is required.");
                ret = false;
            }
            if ((cityNameHolder.val()).length > 150) {
                $("#city").text("* Length should not excceed 150 characters.");
                ret = false;
            }
            if (descriptionBox.val() == '') {
                $("#descErrorSpan").text("* This field is required.");
                ret = false;
            } else if (descriptionBox.val().length > 255) {
                $("#descErrorSpan").text("* Length should not excceed 255 characters.");
                ret = false;
            }
            if (($("#employees").find("option:selected").length) == 0) {
                $("#cperson").text("* Contact Person is required.");
                ret = false;
            }
            if (($("#propTypes").find("option:selected").length) == 0) {
                $("#ptype").text("* Property Type is required.");
                ret = false;
            }
            toggleLoadingIcon(false);
            return ret;
        })
    })
</script>
<style>
.clr {
	color: red;
}
</style>
<div class="fivecol">
	<h3>Manage Projects</h3>
	<hr>
	<form:form modelAttribute="projectModel" action="addProject" method="post" enctype="multipart/form-data">
		<fieldset>
			<ol>
				<li><label for="expenseName" class="mediumRed">Project
						Name:</label> <form:input type="text" path="project.name" class="tour2" />
					<span class="clr" id="pnm">
					
				</span></li>

<%-- 				<li><label for="expenseName" class="mediumRed">Code:</label> <form:input --%>
<%-- 						type="text" path="project.code" class="tour2" /> <span class="clr" id="pcode"> --%>
				
						
<!-- 						</span></li> -->

				<li><label for="expenseName" class="mediumRed">Project
						Type:</label> <form:select path="project.projectType">
						<form:options items="${projectTypes}" itemValue="projectTypeID"
							itemLabel="name" /> 
					</form:select><span class="clr" id="pnn"></span></li>

				<li><label for="expenseName" class="mediumRed">Start
						Date:</label> <form:input type="date" path="project.startdate"
						class="tour2 proDate" /> <span class="clr" id="sdate"></span></li>

				<li><label for="expenseName" class="mediumRed">End
						Date:</label> <form:input type="date" path="project.enddate"
						class="tour2 proDate" /> <span class="clr" id="edate"></span></li>

				<li><label for="expenseName" class="mediumRed">Address1:</label>
					<form:input type="text" path="project.address1" class="tour2" /> <span
					class="clr" id="address"></span></li>

				<li><label for="expenseName" class="mediumRed">Address2:</label></li>
				<li><form:input type="text" path="project.address2"
						class="tour2" /></li>

				<li><label for="expenseName" class="mediumRed">City:</label> <form:input
						type="text" path="project.city" class="tour2" /> <span
					class="clr" id="city"></span></li>

<%-- 				<li><label for="expenseName" class="mediumRed">State:</label> <form:select --%>
<%-- 						path="project.state"> --%>
<%-- 						<form:options items="${states}" itemLabel="stateName" --%>
<%-- 							itemValue="stateID" /> --%>
<%-- 					</form:select> --%>
<!-- 					<span class="clr" id="mnn"></span></li> -->

				<li><label for="expenseName" class="mediumRed">Description:</label>
					<form:input type="text" path="project.description" class="tour2" /><span
					class="clr" id="descErrorSpan"></span>
                </li>
				<li>
                    <label for="expenseName" class="mediumRed">Plan File:</label>
                    <input type="file" multiple="true" name="file" id="files">
                    <span class="clr" id="planFilePathSpan"></span>
                </li>
                <li><label for="expenseName" class="mediumRed">Project
						Status:</label> <form:select path="project.status">
						<form:options items="${projectstatuses}" itemLabel="name"
							itemValue="id" />
					</form:select>
					<span class="clr" id="nnn"></span></li>

				<li><label for="expenseName" class="mediumRed">Contact
						Person:</label> <form:select path="employee" multiple="true"
						class="contact-person-multiple tour2" style="width: 100%">
						<c:forEach items="${employees}" var="emp">
							<form:option value="${emp.id}">${emp.firstname } ${emp.lastname }</form:option>
						</c:forEach>
					</form:select><span class="clr" id="cperson"></span></li>

				<li><label for="expenseName" class="mediumRed">Property
						Types:</label> <form:select path="propertyType" multiple="true"
						class="property-type-multiple tour2" style="width: 100%">
						<c:forEach items="${propertyType}" var="propType">
							<form:option value="${propType.id}">${propType.name }</form:option>
						</c:forEach>
					</form:select><span class="clr" id="ptype"></span></li>

				<li><label for="expenseName" class="mediumRed">Active</label> <form:checkbox
						path="project.active" class="tour2" /></li>
				<br />
				<li><input type="submit" name="submit" class="tour2"
					value="Add" onclick="javascript: return submitForm();">
						<span class="clr" id="pnm">
					${sessionScope.errorMsg }
				<c:remove var="errorMsg" scope="session"/>
				</span>
					
					
					
					
					</li>
			</ol>
		</fieldset>
	</form:form>
</div>
<div id="expenseGrid" class="sevencol last grid">
	<div class="creativetbl_container">
		<table id="projectContainer">
			<thead>
				<tr>
					<th>Index</th>
					<th style="display: none;"></th>
					<th>Project Name</th>
					<th>Start Date</th>
					<th>End Date</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<c:set var="odd" value="true" />
				<c:set var="counter" value="1" />
				<c:forEach items="${projects}" var="project">
					<tr class="<c:out value="${odd ? 'odd': 'even'}"/>">
						<td>${counter }</td>
						<td style="display: none;" class="propID">${project.id }</td>
						<td class="propName"><a href="#" onclick="onOpenPopUp2(this);">${project.name }</a></td>
						<td class="propName">${project.startdate }</td>
						<td class="propName">${project.enddate}</td>
						<td width="40"><img class="invOption" src="resources/images/invOption.png" rel="" onclick="editOptions(this);"></td>
					</tr>
					<c:set var="counter" value="${counter + 1 }" />
					<c:set var="odd" value="${!odd }" />
				</c:forEach>
			</tbody>
		</table>
		<center>
			<br/><br/>
			<font color="red">${sessionScope.errorMsg }</font>
		</center>
		<c:remove var="errorMsg" scope="session"/>
	</div>
</div>