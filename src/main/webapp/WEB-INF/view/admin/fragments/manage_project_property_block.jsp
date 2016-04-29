<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script type="text/javascript">
jQuery.noConflict();
$('#projectContainer').dataTable();

var options = {
		success : function(data) {
			$.fallr('hide');
			loadPage(MANAGE_PROJECT_PROPERTY_BLOCK);
		},
		error : function(e) {
			alert("Failed to send request to server, Please try again later...!");
		}
	}

	function updatePropertyTypeName() {
		toggleLoadingIcon(true);
		var ret=true;
	    if (($("#blockname").val())==''){
	    	$("#blk").text("* Name is Required");
	    	ret=false;	
	    }
	    
	    else if($("#blockname").val().length>5){
	    	$("#blk").text("* Length should not be more than 5");
	    	ret=false;
	    }
	    else if($("#blockname").val().length>255){
	    	$("#blk").text("*Max length should be 255 characters");
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
					type : "POST",
					url : "deleteProjectPropertyBlock",
					data : "id=" + id,
					success : function() {
						$.fallr('hide');
						loadPage(MANAGE_PROJECT_PROPERTY_BLOCK);
					},
					error : function() {
						alert("Failed to connect to server, Please try again later...");
					}
				});
	}

	function onUpdateClick(e) {
		var enclosingROW = $(e).closest('tr');
		$.fallr('show',	{
							useOverlay : true,
							position : 'center',
							icon : 'gear',
							content : '<div id="fallrHeadline"><h5>Edit Property Block</h5></div>'
									+ '<form action="updateProjectPropertyBlock" method="post" id="fallrContent">'
									+ '<fieldset>'
									+ 'Block:'
									+ '<input type="text" name="blockname" id="blockname" value="'
									+ enclosingROW.find('.blkName').text()
									+ '" class="text ui-widget-content ui-corner-all"><br/>'
									+'<span class="clr" id="blk"></span><br/>'
									+ 'Number Of Floor:'
									+ '<input type="text" name="floorNo" id="floorNo" value="'
									+ enclosingROW.find('.flrNo').text()
									+ '" class="text ui-widget-content ui-corner-all">'
									+ '<input type="hidden" name="blockID" id="blockID" value="'
									+ enclosingROW.find('.propID').text()
									+ '">' + '</fieldset>' + '</form>',
							buttons : {
								button1 : {
									text : 'Submit',
									onclick : updatePropertyTypeName
								},
								button4 : {
									text : 'Cancel'
								}
							},
						});
		fallrCustom();
		$("#edtProject").val(enclosingROW.find('.projID').text());
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
	
		jQuery.noConflict();
		$("#propertyBlock").ajaxForm(options).submit();
		return false;
	}
	$(document).ready(function() {
		$("#propertyBlock").on("submit", function() {
			var ret = true;
			var pattern=/^([0-9])*\.*([0-9])+$/;
			if($("#project").val()== null) {
				$("#project_span").text("* Field is required");
					ret = false;
				}
			$(".blockvalidation").each(function(){
				
				if($(this).val()=='') {
				$("#" + $(this).attr("id") + "_span").text("* Field is required");
					ret = false;
				}
				
			});
					
			if(!pattern.test($("#noOfFloor").val())){
				$("#noOfFloor_span").text("* Only digits are allowed");
				ret = false;
				}
			
			
			else if($("#block").val().length>5){
		    	$("#block_span").text("*Max length should be 5 characters");
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
	<h3>Manage Project Property Blocks</h3>
	<hr>
	<form:form modelAttribute="propertyBlock" action="addProjectPropertyBlock"
		method="post">
		<fieldset>
			<ol>
				<li>
					<label for="expenseName" class="mediumRed">Project</label>
					<form:select path="project">
					<form:options items="${projects}" itemLabel="name" itemValue="id" />
					</form:select>
					<span class="clr" id="project_span"></span>
				</li>
				
				<li><label for="expenseName" class="mediumRed">Block</label>
				<form:input type="text" path="block" class="tour2 blockvalidation" />
				<span id="block_span" class="clr">
				${sessionScope.errorMsg }
				<c:remove var="errorMsg" scope="session"/>
				</span></li>
				
				<li><label for="expenseName" class="mediumRed">Number Of Floor</label>
				<form:input type="text" path="noOffloor" class="tour2" /><span id="noOfFloor_span" class="clr">
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
					<th style="display: none;"></th>
					<th style="display: none;"></th>
					<th>Project</th>
					<th>Block</th>
					<th>Number Of Floor</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<c:set var="odd" value="true" />
				<c:set var="counter" value="1" />
				<c:forEach items="${blocks}" var="blockk">
					<tr class="<c:out value="${odd ? 'odd': 'even'}"/>">
						<td>${counter }</td>
						<td style="display: none;" class="propID">${blockk.id }</td>
						<td style="display: none;" class="projID">${blockk.project.id }</td>
						<td class="projName">${blockk.project.name}</td>
						<td class="blkName">${blockk.block}</td>
						<td class="flrNo">${blockk.noOffloor}</td>
						<td width="40"><img class="invOption"
							src="resources/images/invOption.png" rel=""
							onclick="editOptions(this);"></td>
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