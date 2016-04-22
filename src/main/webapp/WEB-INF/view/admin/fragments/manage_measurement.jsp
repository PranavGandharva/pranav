<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script type="text/javascript">

var ret=true;
	var options = {
		success : function(data) {
			$.fallr('hide');
			loadPage(MANAGE_MEASUREMENTUNIT);
		},
		error : function(e) {
			alert("Failed to send request to server, Please try again later...!");
		}
	}
	
	function updatePropertyTypeName() {
		
		toggleLoadingIcon(true);
		 if(!($('#fallrContent').find('#name').val().length > 0))
	     {
		 	
	    	$("#pstatus").text("* This field is required.");
			ret = false;
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
		   url: "deleteMeasurementUnit",
		   data: "id=" + id,
		   success: function(){
				$.fallr('hide');
				loadPage(MANAGE_MEASUREMENTUNIT);
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
		    content     : '<div id="fallrHeadline"><h5>Edit Measurements</h5></div>'
		    			+ '<form action="updateMeasurementUnit" method="post" id="fallrContent">'
		    			+ '<fieldset>'
		    			+ 'Measurement Name:' 
		      			+ '<input type="text" name="name" id="name" value="'
		      			+ enclosingROW.find('.propName').text()
		      			+ '" class="text ui-widget-content ui-corner-all"><br>'
		      			+'<span class="clr" id="pstatus"></span><br/>'
		      			+ '<input type="hidden" name="mid" id="mid" value="'
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
		$("#measurementModel").ajaxForm(options).submit();
		return false;
	}
	$(document).ready(function() {
		$("#measurementModel").on("submit", function() {
			var ret = true;
				if($("#name").val()=='') {
				 $("#namevalidation").text("* Field is required");
					ret = false;
				}
				else if($("#name").val().length>255){
					alert($("#name").val().length);
			    	$("#namevalidation").text("*Max length should be 255 characters");
			    	ret=false;
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
	<h3>Manage Measurement</h3>
	<hr>
	<form:form modelAttribute="measurementModel" action="addMeasurementUnit"
		method="post">
		<fieldset>
			<ol>
				<li><label for="expenseName" class="mediumRed">Measurement Name</label>
				<form:input type="text" path="name" class="tour2" />
				<span id="namevalidation" class="clr">
				${sessionScope.errorMsg }
				<c:remove var="errorMsg" scope="session"/>   </span></li>
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
					<th> Name</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<c:set var="odd" value="true" />
				<c:set var="counter" value="1" />
				<c:forEach items="${measurements }" var="measurement">
					<tr class="<c:out value="${odd ? 'odd': 'even'}"/>">
						<td>${counter }</td>
						<td style="display:none;" class="propID">${measurement.id }</td>
						<td class="propName">${measurement.name }</td>
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