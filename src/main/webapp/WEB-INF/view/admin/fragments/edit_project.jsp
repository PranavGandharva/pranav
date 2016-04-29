<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<script type="text/javascript">
	var options = {
		success : function(data) {
			loadPage(MANAGE_PROJECT);
			$.fancybox.close();
		},
		error : function(e) {
			alert("Failed to send request to server, Please try again later...!");
			$.fancybox.close();
		}
	}

	function submitForm() {
		toggleLoadingIcon(true);
		$('#projectUpdateModel').ajaxForm(options).submit();
		return false;
	}
	
	$(document).ready(function() {
		$("#projectUpdateModel").on("submit", function() {
			var ret = true;
	
			if (($(".editPopUp #project\\.name").val()) == '') {
				$("#pnmm").text("* Project Name is Required.");
				ret = false;
			}
			if (($(".editPopUp #project\\.name").val()).length > 255) {
				$("#pnmm").text("* Length should not excceed 255 characters.");
				ret = false;
			}
			if (($(".editPopUp #project\\.code").val()) == '') {
				$("#pcodee").text("* Code is Required");
				ret = false;
			}
			if (($(".editPopUp #project\\.code").val()).length > 20) {
				$("#pcodee").text("* Length should not excceed 20 characters.");
				ret = false;
			}
			if (($(".editPopUp #project\\.startDate").val()) == '') {
				$("#sdatee").text("* Starting Date is Required");
				ret = false;
			}
			if (($(".editPopUp #project\\.endDate").val()) == '') {
				$("#edatee").text("* Ending Date is Required");
				ret = false;
			}
			if(($(".editPopUp #project\\.address1").val()) == '') {
				$("#addresss").text("* Address should not be empty");
				ret = false;
			} 
			if(($(".editPopUp #project\\.address1").val().length > 255)) {
				$("#addresss").text("* Length should not excceed 255 characters.");
				ret = false;
			}
			if (($(".editPopUp #project\\.city").val()) == '') {
				$("#cityy").text("* City is required.");
				ret = false;
			}
			if (($(".editPopUp #project\\.city").val()).length > 150) {
				$("#city").text("* Length should not excceed 150 characters.");
				ret = false;
			}
			if (($(".editPopUp #project\\.planFilePath").val()) == '') {
				$("#planFilePathSpann").text("* This field is required.");
				ret = false;
			}
			if (($(".editPopUp #project\\.planFilePath").val()).length > 255) {
				$("#planFilePathSpann").text("* Length should not excceed 255 characters.");
				ret = false;
			}
			if (($(".editPopUp #project\\.description").val()) == '') {
				$("#descErrorSpann").text("* This field is required.");
				ret = false;
			}
			if (($(".editPopUp #project\\.description").val()).length > 255) {
				$("#descErrorSpann").text("* Length should not excceed 255 characters.");
				ret = false;
			}
			if(($(".editPopUp #employees").find("option:selected").length) == 0) {
				$("#cpersonn").text("* Contact Person is required.");
				ret = false;
			}
			if (($(".editPopUp #propTypes").find("option:selected").length) == 0) {
				$("#ptypee").text("* Property Type is required.");
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

<div class="fancyboxTitle"><span class="ui-dialog-title" id="ui-dialog-title-quickSearch">Edit Project</span></div>
<div class="fancybottomContent">
<div id="contentWrapper" class="ninecol last editPopUp">
	<form:form modelAttribute="projectUpdateModel"  method="post" action="updateProject" enctype="multipart/form-data">
		<div class="fivecol regbox">
			<fieldset>
				<ol>
				<li><label for="expenseName" class="mediumRed">Project
						Name:</label>
				<form:input type="text" path="project.name" class="tour2" />
				<span class="clr" id="pnmm"></span></li></li>
				
<!-- 				<li><label for="expenseName" class="mediumRed">Code:</label> -->
<%-- 				<form:input type="text" path="project.code" class="tour2" /><span --%>
<!-- 					class="clr" id="pcodee"></span></li> -->

				<li><label for="expenseName" class="mediumRed">Project
						Type:</label>
				<form:select path="project.projectType">
					<form:options items="${projectTypes}" itemValue="projectTypeID" itemLabel="name"/>
				</form:select></li>

				<li><label for="expenseName" class="mediumRed">Start
						Date:</label>
				<form:input type="date" path="project.startdate" class="tour2" /><span class="clr" id="sdatee"></span></li>
			
				<li><label for="expenseName" class="mediumRed">End
						Date:</label>
				<form:input type="date" path="project.enddate" class="tour2" /><span class="clr" id="edatee"></span></li>
				
				<li><label for="expenseName" class="mediumRed">Address1:</label>
				<form:input type="text" path="project.address1" class="tour2" /><span
					class="clr" id="addresss"></span></li>
				
				<li><label for="expenseName" class="mediumRed">Address2:</label>
				<form:input type="text" path="project.address2" class="tour2" /></li>
			</ol>
			</fieldset>
		</div>
		<div class="fivecol noShadow regbox">
			<fieldset>
				<ol>
					<li><label for="expenseName" class="mediumRed">City:</label>
					<form:input type="text" path="project.city" class="tour2" /><span
					class="clr" id="cityy"></span></li>
					
<!-- 					<li><label for="expenseName" class="mediumRed">State:</label> -->
<%-- 					<form:select path="project.state"> --%>
<%-- 						<form:options items="${states}" itemLabel="stateName" itemValue="stateID"/> --%>
<%-- 					</form:select></li> --%>
					
					<li><label for="expenseName" class="mediumRed">Description:</label>
					<form:input type="text" path="project.description" class="tour2" /><span
					class="clr" id="descErrorSpann"></span></li>
					
					<li>
						<label for="expenseName" class="mediumRed">Upload Project File:</label>
                        <input type="file" multiple="multiple" name="files" id="files">
						<span class="clr" id="planFilePathSpann"></span>
					</li>
					
					<li><label for="expenseName" class="mediumRed">Project Status:</label>
					<form:select path="project.status">
						<form:options items="${projectstatuses}" itemLabel="name" itemValue="id"/>
					</form:select></li>
					
					${projectUpdateModel.project.contactPerson[0].id}
				    ${employees[0].id}
					<li><label for="expenseName" class="mediumRed">Contact Person:</label>
					<form:select path="employee" multiple="true" class="et-contact-person-multiple tour2" style="width: 100%">
						<c:forEach items="${employees}" var="emp">
							<c:set var="contains" value="" />
							<c:forEach var="item" items="${projectUpdateModel.project.contactPerson}">
							  <c:if test="${item.id eq emp.id}">
     
							    <c:set var="contains" value="selected='selected'" />
							  </c:if>
							</c:forEach>
							<option value="${emp.id}" ${contains}>
								${emp.firstname } ${emp.lastname }
							</option>
						</c:forEach>
					</form:select></li>
				
				${projectUpdateModel.project.propertyType[0].id}
				${propTypes[0].id}		
						
					<li><label for="expenseName" class="mediumRed">Property Types:</label>
					<form:select path="propertyType" multiple="true" class="et-property-type-multiple tour2" style="width: 100%">

						<c:forEach items="${propTypes}" var="propType">
							<c:set var="contains" value="" />
							<c:forEach var="item" items="${projectUpdateModel.project.propertyType}">
							  <c:if test="${item.id eq propType.id}">
							    <c:set var="contains" value="selected='selected'" />
							  </c:if>
							</c:forEach>
							<option value="${propType.id}" ${contains }>
								${propType.name }
							</option>
						</c:forEach>
					</form:select></li>
					<li>
						<label for="expenseName" class="mediumRed">Active</label>
						<form:checkbox path="project.active" class="tour2" />
					</li>
					<form:hidden path="project.id"/>
					<li>
						<button type="submit" value="Add User" class="blueButton submit fallr-button" id="submit" onclick="javascript: return submitForm();">Update Project</button>
						<button type="reset" value="Clear" class="submit fallr-button" id="clear">Clear</button>
					</li>
				</ol>
			</fieldset>
		</div>
	</form:form>
	<div class="clear"></div>
</div>
</div>
