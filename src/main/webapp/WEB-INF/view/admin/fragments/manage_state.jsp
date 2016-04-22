<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script type="text/javascript">
// 	var REGEX_EXCEL_FILES_ONLY = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
	
	$('#projectContainer').DataTable();
	
	var options = {
		success : function() {
			alert("success");
			$.fallr('hide');
			loadPage(13);
		},
		error : function(e) {
			alert("Failed to send request to server, Please try again later...!");
		}
	}

// 	var excelImpoptions = {
// 		success : function(data) {
// 			$.fallr('hide');
// 			loadPage(MANAGE_STATE, function() {
// 				$("#bef_FileImpBut").text("File Import Success...!!!");
// 			});
// 		},
// 		error : function(e) {
// 			$("#bef_FileImpBut").text("Invalid file or Server Error...!!!");
// 		}
// 	}

	function updatePropertyTypeName() {
		toggleLoadingIcon(true);
		var ret = true;
		if (!($('#fallrContent').find('#stateName').val().length > 0)) {
			alert("hi");
			$("#sname").text("* This field is required.");
			ret = false;
		}

		if (ret)
			$('#fallrContent').ajaxForm(options).submit();
		else
			toggleLoadingIcon(false);
	}
	
	function sendDeleteRequest(id) {
		toggleLoadingIcon(true);
		$.ajax({
		   type: "POST",
		   url: "deleteState",
		   data: "id=" + id,
		   success: function(){
				$.fallr('hide');
				loadPage(MANAGE_STATE);
		   },
		   error: function() {
			   alert("Failed to connect to server, Please try again later...");
		   }
		});
	}
	
	function onUpdateClick(e) {
		var enclosingROW = $(e).closest('tr');
	    jQuery.noConflict();
		$.fallr('show', {
			useOverlay	: true,
			position	: 'center',
		    icon        : 'gear',
		    content     : '<div id="fallrHeadline"><h5>Edit State</h5></div>'
		    			+ '<form action="updateState" method="post" id="fallrContent">'
		    			+ '<fieldset>'
		    			+ 'State Name:' 
		      			+ '<input type="text" name="stateName" id="stateName" value="'
		      			+ enclosingROW.find('.propName').text()
		      			+ '" class="text ui-widget-content ui-corner-all"><br/>'
		      			+'<span class="clr" id="sname"></span><br/>'
		      			+ '<input type="hidden" name="stateID" id="stateID" value="'
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
	    jQuery.noConflict();
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
	     
		jQuery.noConflict();
		$('#stateModel').ajaxForm(options).submit();
		return false;
	}

// 	function submitFile() {
// 		toggleLoadingIcon(true);
// 		var fullPath = document.getElementById('file').value;
// 		if (fullPath) {
// 			var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
// 			var filename = fullPath.substring(startIndex);
// 			if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
// 				filename = filename.substring(1);
// 			}
// 			if(REGEX_EXCEL_FILES_ONLY.test(filename))
// 				$("#importStates").ajaxForm(excelImpoptions).submit();
// 			else {
// 				$("#bef_FileImpBut").text("Please select valid excel file. File extension must be *.xls or *.xlsx");
// 				toggleLoadingIcon(false);
// 				$.fallr('hide');
// 			}
// 		}
// 	}

// 	function showFileUploadDialog() {
// 		$.fallr('show', {
// 			useOverlay: true,
// 			position: 'center',
// 			icon        : 'document',
// 			content     : '<div id="fallrHeadline">'
// 			+ '<h5>Upload</h5>'
// 			+ '</div><div id="fallrContent">'
// 			+ '<p class="mediumRed">Select file to upload:</p>'
// 			+ '<form action="importStates" id="importStates" name="importStates" method="post">'
// 			+     '<input type="file" name="file" id="file"/>'
// 			+ '</form></div>',
// 			buttons : {
// 				button1 : {text: 'Submit', onclick: submitFile},
// 				button4 : {text: 'Cancel'}
// 			},
// 		});
// 		fallrCustom();
// 		return false;
// 	}

// 	$(document).ready(function () {
// 		$("#stateModel").on("submit", function () {
// 			var ret = true;
// 			var val = $("#stateName").val();
// 			if (val == '') {
// 				$("#stateName1").text("* Field is required");
// 				ret = false;
// 			}
// 			else if (val.length > 255) {
// 				$("#stateName1").text("*Max length should be 255 characters");
// 				ret = false;
// 			}
// 			toggleLoadingIcon(false);
// 			return ret;
// 		})
// 	})

</script>
<style>
.clr {
	color: red;
}
</style>
<div class="fivecol">
	<h3>Manage States</h3>
	<hr>
	<form:form modelAttribute="stateModel" action="addState"
		method="post">
		<fieldset>
			<ol>
				<li><label for="expenseName" class="mediumRed">State Name</label>
				<form:input type="text" path="name" class="tour2" />
				<span id="stateName1" class="clr">
				${sessionScope.errorMsg }
				<c:remove var="errorMsg" scope="session"/>
				</span></li>
				<li><input type="submit" name="submit" class="tour2" value="Add" onclick="javascript: return submitForm();"></li>
				<span id="bef_FileImpBut" class="clr"></span>
				<li><input type="submit" name="submit" class="tour2" value="Import from Excel File" onclick="javascript: return showFileUploadDialog();"></li>
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
					<th>State Name</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<c:set var="odd" value="true" />
				<c:set var="counter" value="1" />
				<c:forEach items="${states }" var="state">
					<tr class="<c:out value="${odd ? 'odd': 'even'}"/>">
						<td>${counter }</td>
						<td style="display:none;" class="propID">${state.id }</td>
						<td class="propName">${state.name}</td>
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