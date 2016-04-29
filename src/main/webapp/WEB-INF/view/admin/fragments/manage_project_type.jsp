<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<script type="text/javascript">
	jQuery.noConflict();
	$('#projectContainer').dataTable();
	
	var options = {
		success : function(data) {
			$.fallr('hide');
			loadPage(MANAGE_PROJECT_TYPE);
		},
		error : function(e) {
			alert("Failed to send request to server, Please try again later...!");
		}
	}
	
	function updatePropertyTypeName() {
		toggleLoadingIcon(true);
		var ret=true;
	    if (($("#projectType").val())==''){
	    	$("#nmm").text("* Name is Required");
	    	ret=false;	
	    }
	   
	
	 	if(ret)
			$('#fallrContent').ajaxForm(options).submit();
	 	else
	 		{
	 		toggleLoadingIcon(false);
	 		}
	}
	
	function sendDeleteRequest(id) {
		toggleLoadingIcon(true);
		$.ajax({
		   type: "POST",
		   url: "deleteProjectType",
		   data: "id=" + id,
		   success: function(){
				$.fallr('hide');
				loadPage(MANAGE_PROJECT_TYPE);
		   },
		   error: function() {
			   alert("Failed to connect to server, Please try again later...");
		   }
		});
	}
	
	function onUpdateClick(e) {
		var enclosingROW = $(e).closest('tr');
		$.fallr('show', {
			useOverlay	: true,
			position	: 'center',
		    icon        : 'gear',
		    content     : '<div id="fallrHeadline"><h5>Edit Property Type</h5></div>'
		    			+ '<form action="updateProjectType" method="post" id="fallrContent">'
		    			+ '<fieldset>'
		    			+ 'Project Type:' 
		      			+ '<input type="text" name="projectType" id="projectType" value="'
		      			+ enclosingROW.find('.propName').text()
		      			+ '" class="text ui-widget-content ui-corner-all"><br/>'
		      			+'<span class="nm" id="nmm"></span>'
		      			+ '<input type="hidden" name="projectType_id" id="projectType_id" value="'
		      			+ enclosingROW.find('.propID').text()
		      			+ '">'
		    			+ '</fieldset>'
		  				+ '</form>',
		    buttons : {
		        button1 : {text: 'Submit', onclick: updatePropertyTypeName},
		        button4 : {text: 'Cancel'}
		    },
		});
		fallrCustom();
	}
	
	function onDeleteClick(e) {
		var id = $(e).closest('tr').find('.propID').text(); 
		$.fallr('show', {
			useOverlay: true,
			position: 'center',
			buttons: {
				button1: {
					text: 'Delete',
					onclick: function() {
						sendDeleteRequest(id);
					}
				},
				button2: {
					text: 'Cancel'
				}
			},
			content : '<div id="fallrHeadline">'
					+ '<h5>Warning</h5>'
					+ '</div><div id="fallrContent">'
					+ '<p class="mediumRed">Are you sure want to delete?</p></div>',
			icon: 'error'
		});
		fallrCustom();
	}
	$(document).ready(function() {
		$("#projectTypeModel").on("submit", function() {
			var ret = true;
			if($("#name").val()=='') {
				$("#nm").text("* Field is required");
				ret = false;
				}
				 
			toggleLoadingIcon(false);
		return ret;
		})
		})
	function submitForm() {
		toggleLoadingIcon(true);
		$('#projectTypeModel').ajaxForm(options).submit();
		return false;
	}
</script>

<style>
#nm{
color:red;
}
.nm{
color:red;
}
</style>

<div class="fivecol">
	<h3>Manage Project Type</h3>
	<hr>
	<form:form modelAttribute="projectTypeModel" action="addProjectType"
		method="post">
		<fieldset>
			<ol>
				<li><label for="expenseName" class="mediumRed">Project Type</label>
				<form:input type="text" path="name" class="tour2" />
				<span class="nm" id="nm">
				${sessionScope.errorMsg }
				<c:remove var="errorMsg" scope="session"/>
				</span>
				</li>
				
				<li><input type="submit" name="submit" class="tour2"
					value="Add" onclick="javascript: return submitForm();"></li>
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
					<th style="display:none;"></th>
					<th>Name</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<c:set var="odd" value="true" />
				<c:set var="counter" value="1" />
				<c:forEach items="${projectTypes}" var="projecType">
					<tr class="<c:out value="${odd ? 'odd': 'even'}"/>">
						<td>${counter }</td>
						<td style="display:none;" class="propID">${projecType.projectTypeID }</td>
						<td class="propName">${projecType.name }</td>
						<td width="40"><img class="invOption" src="resources/images/invOption.png" rel="" onclick="editOptions(this);"></td>
					</tr>
					<c:set var="counter" value="${counter + 1 }" />
					<c:set var="odd" value="${!odd }" />
				</c:forEach>
			</tbody>
		</table>
		<center>
			<br/><br/>
			<font color="red">${sessionScope.errorMsg2 }</font>
		</center>
		<c:remove var="errorMsg2" scope="session"/>
	</div>
</div>