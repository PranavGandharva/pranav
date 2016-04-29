<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script type="text/javascript">
	var options = {
		success : function(data) {
			$.fallr('hide');
			loadPage(MANAGE_PROPERTY_DETAIL);
		},
		error : function(e) {
			alert("Failed to send request to server, Please try again later...!");
		}
	}

	var counter = 0;
// 	$("a#fcbLink").fancybox({
// 		'autoDimensions' : false,
// 		'scrolling' : 'no',
// 		'width' : 850,
// 		'height' : 700,
// 		'overlayShow' : true,
// 		cyclic : false,
// 		'transitionIn' : 'none',
// 		'transitionOut' : 'none',
// 		onComplete : function() {
// 			bottomContentHeightChange();
// 		},
// 		onClosed : function() {
// 			//refreshGrid("ct");
// 		}
// 	});

	function sendDeleteRequest(id) {
		toggleLoadingIcon(true);
		$.ajax({
			type : "POST",
			url : "deletePropertyDetail",
			data : "id=" + id,
			success : function() {
				$.fallr('hide');
				loadPage(MANAGE_PROPERTY_DETAIL);
			},
			error : function() {
				alert("Failed to connect to server, Please try again later...");
			}
		});
	}

	function onDeleteClick(e) {
		var id = $(e).closest('tr').find('.propID').text();
		$.fallr('show',	{
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
	
	function onUpdateClick(e) {
		$.fancybox({
			'href' : "fragment/fragment_edit_property_detail?id="
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
			},
			onClosed : function() {
				//refreshGrid("ct");
			}
		});
	}
	function onClickDetail(e) {
		$.fancybox({
			'href' : "fragment/fragment_view_property_detail?id="
					+ $(e).closest('tr').find('.propID').text(),
			'autoDimensions' : false,
			'scrolling' : 'no',
			'width' : 650,
			'height' : 400,
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

	function submitForm() {
		toggleLoadingIcon(true);
		$('#propertyDetail').ajaxForm(options).submit();
		return false;
	}

    function populateFloorNumberSelector(maxNum) {
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

//     var blockDataHolder;

//     $("#block").on('change', function(e) {
//         refreshPlanSelector();
//         populateFloorNumberSelector(blockDataHolder[$("#block").prop('selectedIndex')].noOfFloor);
//     });

//     function refreshBlockSelector() {
//         var block = $("#block");
//         $.ajax({
//             url : 'getBlockForProject/'+ $("#project").val(),
//             type : 'GET',
//             success : function(data) {
//                 block.find('option').remove().end();
//                 blockDataHolder = data;
//                 $.each(data, function(i, item) {
//                     block.append($('<option>',
//                             {
//                                 value: data[i].blockId,
//                                 text: data[i].block
//                             }
//                     ));
//                 });
//                 refreshPlanSelector();
//                 populateFloorNumberSelector(blockDataHolder[$("#block").prop('selectedIndex')].noOfFloor);
//             },
//             error : function(e) {
//                 if (counter == 5) {
//                     alert("Unable to connect to server...");
//                     counter = 0;
//                 } else {
//                     counter++;
//                 }
//             }
//         });
//     }

//     function refreshPropertyTypeSelector() {
//         var propertyTypeSelector = $('#propertyType');
//         $.ajax({
//             url : 'getPropTypesForPrj/' + $("#project").val(),
//             type : 'GET',
//             success : function(data) {
//                 propertyTypeSelector.find('option').remove().end();
//                 $.each(data, function(i, item) {
//                     propertyTypeSelector.append($('<option>',
//                             {
//                                 value: item.propertyTypeID,
//                                 text: item.name
//                             }
//                     ));
//                 });
//                 refreshBlockSelector();
//             },
//             error : function(e) {
//                 if (counter == 5) {
//                     alert("Unable to connect to server...");
//                     counter = 0;
//                 } else {
//                     counter++;
//                 }
//             }
//         });
//     }

//     function refreshPlanSelector() {
//         var projectPropertyPlan = $('#projectPropertyPlan');
//         $.ajax({
//             url : 'getPlansForblock/' + $("#block").val(),
//             type : 'GET',
//             success : function(data) {
//                 projectPropertyPlan.find('option').remove().end();
//                 $.each(data, function(i, item) {
//                     projectPropertyPlan.append($('<option>',
//                             {
//                                 value: item.id,
//                                 text: item.planName
//                             }
//                     ));
//                 });
//                 toggleLoadingIcon(false);
//             },
//             error : function(e) {
//                 if (counter == 5) {
//                     alert("Unable to connect to server...");
//                     counter = 0;
//                 } else {
//                     counter++;
//                 }
//                 toggleLoadingIcon(false);
//             }
//         });
//     }

// 	$("#project").on('change', function(e) {
//         refreshBlockSelector();
//         refreshPropertyTypeSelector();
// 	});
	
	 function populateFloorNumberSelector(Maxnum){
		 var i=1;
		while(i<=Maxnum){
			$('#floorNumber').append($('<option>',{
				value:i,
			    text:i
				
			}));
		i++;
		}
		
			
	} 
	 
	function refreshPlanSelector(){
		
		$.ajax({
			
			url:'getPlan/'+$("#propertyBlock").val(),
			type:'GET',
			success:  function(data){
// 				 $.each(data, function(i, item) {
//                   projectPropertyPlan.append($('<option>',
//                           {
//                               value: item.id,
//                               text: item.planName
//                           }
//                   ));
//               });
				
			}
		});
		
	}
	
	function refreshBlockSelector(){
		
		$.ajax({
			url:'block/'+$('#project').val(),
			type:'GET',
			success: function(data){
				
			for(divine in data)
				$('#propertyBlock').append($('<option>',{
					value:data[$('#propertyBlock').children().length].id,
					text:data[$('#propertyBlock').children().length].block
				    					
				}));
			refreshPlanSelector();
			populateFloorNumberSelector(data[$('#propertyBlock').prop('selectedIndex')].noOffloor);	
			}
		});
		
	}
	
	
	function  refreshPropertyTypeSelector(){
		
		$.ajax({
			url:'getPropTypesForPrj/'+$('#project').val(),
			type:'GET',
			success: function(data){
				for(divide in data)
		     $('#propertype').append($('<option>',{
		    
		    	 value:data[$('#propertype').children().length].id,
		    	 text:data[$('#propertype').children().length].name
		    	 
		     }));
		     
				refreshBlockSelector();	
			},
			error:function(){
				if(counter==5)
					alert("serverErro");
				else
					counter++;
			}
			
		});
		
		
	}
	
	
	
	$(document).ready(function() {
       refreshPropertyTypeSelector();
		$("#propertyDetail").on("submit", function() {
			var ret = true;
			var pattern = /^([0-9])*\.*([0-9])+$/;
			$(".property").each(function() {
				if ($(this).val() == '') {
					$("#" + $(this).attr("id")+ "_span").text("* Field is required");
					ret = false;
				} else if (!pattern.test($(this).val())) {
					$("#" + $(this).attr("id") + "_span").text("* Only digits are allowed");
					ret = false;
				}
				if($("#project").val()== null) {
					$("#project_span").text("* Field is required");
						ret = false;
					}
				if($("#propertyType").val()== null) {
					$("#propertyType_span").text("* Field is required");
						ret = false;
					}
				if($("#block").val()== null) {
					$("#block_span").text("* Field is required");
						ret = false;
					}
				if($("#projectPropertyPlan").val()== null) {
					$("#projectPropertyPlan_span").text("* Field is required");
						ret = false;
					}
				if($("#unit").val()== null) {
					$("#unit_span").text("* Field is required");
						ret = false;
					}
				toggleLoadingIcon(false);
				return ret;
			})
		});
	})
</script>
<style>
.clr {
	color: red;
}
</style>
<div class="fivecol">
	<h3>Add new Property</h3>
	<hr>
	<form:form modelAttribute="propertyDetail" action="addPropertyDetail"
		method="post">
		<fieldset>
			<ol>
				<li><label  class="mediumRed">Project
					:</label> <form:select path="project" class="volatile">
					<form:options items="${projects}" itemLabel="name" itemValue="id"/>
				</form:select>
					<span class="clr" id="project_span"></span>

				</li>
				<li><label  class="mediumRed">Property Type:</label>
                    <form:select path="propertype" class="volatile" />
					<span class="clr" id="propertyType_span"></span>
				</li>
				<li>
                    <label  class="mediumRed">Block:</label>
					<form:select path="propertyBlock" class="volatile" />
					<span class="clr" id="block_span"></span>
				</li>
				<li>
                    <label  class="mediumRed">Property Plan:</label>
                    <form:select path="projectPropertyPlan" />
					<span class="clr" id="projectPropertyPlan_span"></span>

				</li>
				<li>
					<label  class="mediumRed ">Property Number:</label>
					<table style="width: 100%">
						<tr>
							<td><input type="text" name="propNumStart" class="property"/></td>
							<td valign="middle" style="text-align:center;" width="10%">to</td>
							<td align="center"><input type="text" name="propNumEnd" class="property"></td>
						</tr>
					</table>
					<span class="clr" id="propertyNumber_span"></span>
				</li>
				<li><span class="mediumRed" style="font-size: 80%">(Tip: Leave second field empty for entering single property number)</span>
				</li>
				<li>
					<label  class="mediumRed">Floor Number:</label>
					<form:select path="floorNumber" class="tour2" />
				</li>
				<li><label  class="mediumRed">Flat
					Area:</label> <form:input type="text" path="flatArea"
											  class="tour2  property"/> <span id="flatArea_span" class="clr"></span>
				</li>

				<li><label  class="mediumRed ">BuildUp
					Area:</label> <form:input type="text" path="buildUpArea"
											  class="tour2 property"/> <span id="buildUpArea_span" class="clr"></span>
				</li>

				<li><label  class="mediumRed ">Undivided
					Land Area:</label> <form:input type="text" path="undividedLandArea"
												   class="tour2 property"/> <span id="undividedLandArea_span"
																				  class="clr"></span></li>

				<li><label  class="mediumRed">Unit:</label>
				 <form:select path="unit">
					<form:options items="${measurements }" itemLabel="name"
								  itemValue="id"/>
				</form:select>
					<span class="clr" id="unit_span"></span>

				</li>

				<li><label  class="mediumRed">Description:</label>
					<form:input type="text" path="description" class="tour2"/></li>

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
					<th>Project</th>
					<th>Property Type</th>
					<th>Block</th>
					<th>Property Number</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<c:set var="odd" value="true" />
				<c:set var="counter" value="1" />
				<c:forEach items="${propDetails }" var="detail">
					<tr class="<c:out value="${odd ? 'odd': 'even'}"/>">
						<td>${counter }</td>
						<td style="display: none;" class="propID">${detail.id}</td>
						<td><a class="invOption" rel=""
							onclick="onClickDetail(this);">${detail.project.name}</a></td>
						<td>${detail.propertype.name}</td>
						<td>${detail.block.block}</td>
						<td>${detail.propertyNumber}</td>
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
			<br /> <br /> <font color="red">${sessionScope.errorMsg2 }</font>
		</center>
		<c:remove var="errorMsg2" scope="session" />
	</div>
</div>