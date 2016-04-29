<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script type="text/javascript">
jQuery.noConflict();
$('#projectContainer').dataTable();

var options = {
		success : function(data) {
			$.fallr('hide');
			loadPage(0);
		},
		error : function(e) {
			alert("Failed to send request to server, Please try again later...!");
		}
	}
	
	function updatePropertyTypeName() {
		toggleLoadingIcon(true);
		var ret=true;
	    if (($("#edit_prop_type").val())==''){
	    	$("#nmm").text("* Name is Required");
	    	ret=false;	
	    }
	    else if($("#edit_prop_type").val().length>255){
	    	$("#nmm").text("*Max length should be 255 characters");
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
		   url: "deletePropertyType",
		   data: "id=" + id,
		   success: function(){
				$.fallr('hide');
				loadPage(0);
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
		    			+ '<form action="updatePropertyType" method="post" id="fallrContent">'
		    			+ '<fieldset>'
		    			+ 'Property Type Name:' 
		      			+ '<input type="text" name="edit_prop_type" id="edit_prop_type" value="'
		      			+ enclosingROW.find('.propName').text()
		      			+ '" class="text ui-widget-content ui-corner-all"><br/>'
		      			+'<span class="nm" id="nmm"></span>'
		      			+ '<input type="hidden" name="edit_prop_type_id" id="edit_prop_type_id" value="'
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
	
	function submitForm() {
		toggleLoadingIcon(true);
		$('#propType').ajaxForm(options).submit();
		return false;
	}
	//validation
	$(document).ready(function(){
		$("#propType").on("submit", function() {
			var ret=true;
		    if (($("#name").val())==''){
		    
		    	$("#nm").text("* Name is Required");
		    	ret=false;	
		    }
		    
		    else if($("#name").val().length>255){
		    	$("#nm").text("*Max length should be 255 characters");
		    	ret=false;
		    }
		    toggleLoadingIcon(false);
		    return ret;
		})
	})	
</script>
<style>
.nm{
color:red;
}
</style>
<div class="fivecol">
	<h3>Manage Property Types</h3>
	<hr>
	<form:form modelAttribute="propType" action="addPropertyType"
		method="post">
		<fieldset>
			<ol>
				<li><label for="expenseName" class="mediumRed">Property
						Type Name:</label>
				<form:input type="text" path="name" class="tour2" />
				<span class="nm" id="nm">
				${sessionScope.errorMsg }
				<c:remove var="errorMsg" scope="session"/>
				</span></li>
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
				<c:forEach items="${types }" var="project">
					<tr class="<c:out value="${odd ? 'odd': 'even'}"/>">
						<td>${counter }</td>
						<td style="display:none;" class="propID">${project.id }</td>
						<td class="propName">${project.name }</td>
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