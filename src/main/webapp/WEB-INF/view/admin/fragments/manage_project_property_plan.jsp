<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script type="text/javascript">
$('#projectContainer').dataTable();

var counter = 0;
	var options = {
		success : function(data) {
			$.fallr('hide');
			loadPage(MANAGE_PROJECT_PROPERTY_PLAN);
			toggleLoadingIcon(false);
		},
		error : function(e) {
			alert("Failed to send request to server, Please try again later...!");
			toggleLoadingIcon(false);
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
					url : "deleteProjectPropertyPlan",
					data : "id=" + id,
					success : function() {
						$.fallr('hide');
						loadPage(MANAGE_PROJECT_PROPERTY_PLAN);
					},
					error : function() {
						alert("Failed to connect to server, Please try again later...");
					}
				});
	}
	function onUpdateClick(e) {
		jQuery.noConflict();
		$.fancybox({
			'href' : "fragment/fragment_edit_project_property_plan?id="
					+ $(e).closest('tr').find('.propID').text(),
			'autoDimensions' : false,
			'scrolling' : 'no',
			'width' : 700,
			'height' :450,
			'overlayShow' : true,
			cyclic : false,
			'transitionIn' : 'none',
			'transitionOut' : 'none',
			onComplete : function() {
				bottomContentHeightChange();
			},
			onClosed : function() {
				//refreshGrid("ct");
			}
		});
	}

	function onDeleteClick(e) {
		var id = $(e).closest('tr').find('.propID').text();
		$.fallr('show', {
			useOverlay: true,
			position: 'center',
			buttons: {
				button1: {
					text: 'Delete',
					onclick: function () {
						sendDeleteRequest(id);
					}
				},
				button2: {
					text: 'Cancel'
				}
			},
			content: '<div id="fallrHeadline">'
						+ '<h5>Warning</h5>'
						+ '</div><div id="fallrContent">'
						+ '<p class="mediumRed">Are you sure want to delete?</p></div>',
			icon: 'error'
		});
		fallrCustom();
	}

	function submitForm() {
		toggleLoadingIcon(true);
		if(performValidation())
			$("#propertyPlan").ajaxForm(options).submit();
		return false;
	}

	function performValidation() {
		var ret = true;
		var project = $("#project").val();
		var propertyType = $("#propertyType").val();
		var block = $("#block").val();
		var floorNo = $("#floorNumber").val();
		var planName = $("#planName").val();
		var planFile = $("#planFile").val();

		if(project == null || project == "") {
			$("#project_span").text("* Field is required");
			ret = false;
		}
		if(propertyType == null || propertyType == "") {
			$("#propertyType_span").text("* Field is required");
			ret = false;
		}
		if(block == null || block == "") {
			$("#block_span").text("* Field is required");
			ret = false;
		}
		if(floorNo == null || floorNo == "") {
			$("#floorNumber_span").text("* Field is required");
			ret = false;
		} else if(!REGEX_NUMBER_ONLY.test(floorNo)) {
			$("#floorNumber_span").text("* Only numbers allowed");
			ret = false;
		}
		if(planName == null || planName == "") {
			$("#planName_span").text("* Field is required");
			ret = false;
		} else if(!REGEX_NO_SPECIAL_CHAR_EXCEPT_UNDSCR.test(planName)) {
			$("#planName_span").text("* No special character except '_' is allowed");
			ret = false;
		}
		if(planFile == null || planFile == "") {
			$("#planFile_span").text("* Please provide plan file");
			ret = false;
		}
		if(!ret) toggleLoadingIcon(false);
		return ret;
	}

    function populateFloorNumber(maxNum) {
    	
		var i = 1;
        var floorNumberSelector = $('#floorNumber');
        floorNumberSelector.find('option').remove().end();
        while(i <= maxNum) {
            floorNumberSelector.append($('<option>',
                    {
                        value: i,
                        text: i
                    }
            ));
            i++;
        }
    }
    
//     $("#block").on("change", function() {
//     	$(this).each(function() {
// //     	    $(this).find('option:selected').prop('selected', 'selected').noOffloor;
//     	});
    	
    	
//     	//	populateFloorNumber(blockDataHolder[$(this).prop('selectedIndex')].noOffloor);
//     });

    function fetchBlockData() {
        var blockSelector = $('#block');
        $.ajax({
            url : 'getBlockForProject/' + $("#project").val(),
            type : 'GET',
            success : function(data) {
           
            	blockSelector.find('option').remove().end();
                blockDataHolder = data;
                for (division in data)
                    blockSelector.append($('<option>',{
                        value : data[$('#block > option').length].id,
                        text : data[$('#block > option').length].block
                    }));
//                 populateFloorNumber(blockDataHolder[blockSelector.prop('selectedIndex')].noOffloor);
            },
            error : function(e) {
                if (counter == 5) {
                    alert("Unable to connect to server...");
                    counter = 0;
                } else {
                    counter++;
                }
            }
        });
        
    
    }
     function  fetchBlockData(){

    	 $.ajax({
    		url:'block/'+$("#project").val(),    		 
    		type:'GET',
    		success:function(data){
    				
    	
    			for(division in data)
    			$('#block').append($('<option>',{
    				value:data[$('#block>option').length].id,
    				text:data[$('#block>option').length].block
    	           				
    			}));
    		
    			populateFloorNumber(data[$('#block').prop('selectedIndex')].noOffloor);
    		    		 		       			
    		}
    		 
    	 });
    	 
      }

    var blockDataHolder;
	$("#project").on('click', function(e) {

		toggleLoadingIcon(true);
		fetchBlockData();
		$.ajax({
			url : 'getPropTypesForPrj/' + $("#project").val(),
			type : 'GET',
			success : function(data) {
		
				$('#propertyType').find('option').remove().end();
				for (division in data)
					$('#propertyType').append($('<option>', {
						value : data[$('#propertyType > option').length].id,
						text : data[$('#propertyType > option').length].name
					
					}));
		
				toggleLoadingIcon(false);
		
			},
			error : function(e) {
				if (counter == 5) {
					alert("Unable to connect to server...");
					counter = 0;
				} else {
					counter++;
				}
				toggleLoadingIcon(false);
			}
		});

	});
    $(document).ready(function() {
        fetchBlockData();
    })




</script>
<style>
.clr {
	color: red;
}
</style>
<div class="fivecol">
	<h3>Manage Project Property Plan</h3>
	<hr>
	<form:form modelAttribute="propertyPlan" action="addPropertyPlan" method="post" enctype="multipart/form-data">
		<fieldset>
			<ol>
				<li><label for="expenseName" class="mediumRed">Project</label>
					<form:select path="project">
						<form:options items="${projects}" itemLabel="name" itemValue="id" />
					</form:select>
					<span class="clr" id="project_span"></span>
					
					</li>

				<li><label for="expenseName" class="mediumRed">Project
						Property Type:</label>
				 <form:select path="propertyType">
<%-- 						<form:options items="${propTypes}" itemLabel="name" --%>
<%-- 							itemValue="id" /> --%>
					</form:select>
					<span class="clr" id="propertyType_span"></span>
					
					
					</li>
					
				<li>
                    <label for="expenseName" class="mediumRed">Block:</label>
				    <form:select path="block">
					</form:select>
					<span class="clr" id="block_span"></span>
                </li>
					
				<li><label for="expenseName" class="mediumRed">Floor
						Number:</label>
				<form:select type="text" path="floorNumber" class="tour2" />
				<span id="floorNumber_span" class="clr"></span>
				</li>
				
				<li><label for="expenseName" class="mediumRed">Plan
						Name:</label>
				<form:input type="text" path="planName" class="tour2 plann" />
				<span id="planName_span" class="clr">
				</span>
				</li>
				
				<li><label for="expenseName" class="mediumRed">Plan File Path:</label>
				<input type="file" name="planFile" id="planFile" class="tour2 plann">
				<span id="planFile_span" class="clr">
				${sessionScope.errorMsg }
				<c:remove var="errorMsg" scope="session"/>
				</span>
				</li>
				
				<li><input type="submit" name="submit" class="tour2" value="Add" onclick="javascript: return submitForm();"></li>
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
					<th>Plan Name</th>
					<th>Project Name</th>
					<th>Block Name</th>
					<th>Plan File</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<c:set var="odd" value="true" />
				<c:set var="counter" value="1" />
				<c:forEach items="${plans}" var="plan">
					<tr class="<c:out value="${odd ? 'odd': 'even'}"/>">
						<td>${counter }</td>
						<td style="display: none;" class="propID">${plan.id }</td>
						<td>${plan.planName}</td>
						<td>${plan.project.name }</td>
						<td>${plan.block.block }</td>
						<c:url var="UPLOAD_DIR" value="/uploads" />
						<td><a href="${UPLOAD_DIR}/${plan.id}/${fn:replace(fn:trim(plan.project.name), ' ', '_')}_${fn:replace(fn:trim(plan.block.block), ' ', '_')}_${plan.floorNumber}/${plan.planFilePath}">Download</a></td>
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
