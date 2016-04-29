<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script type="text/javascript">
jQuery.noConflict();
$('#employeeContainer').DataTable();
$("#fcbLink").fancybox({
	'autoDimensions': false,
    'scrolling': 'no',
    'width': 850,
    'height': 700,
    'overlayShow': true,
    cyclic: false,
    'transitionIn': 'none',
    'transitionOut': 'none',
    onComplete: function() {
        bottomContentHeightChange();
    },
    onClosed: function() {
        //refreshGrid("ct");
    }
});

function sendDeleteRequest(id) {
	toggleLoadingIcon(true);
	$.ajax({
	   type: "POST",
	   url: "deleteEmployee",
	   data: "id=" + id,
	   success: function(){
			$.fallr('hide');
			loadPage(MANAGE_EMPLOYEE);
	   },
	   error: function() {
		   alert("Failed to connect to server, Please try again later...");
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
function onOpenPopUp2(e) {	
	$.fancybox({
	
		'href' : "fragment/fragment_view_employee?id="
			+ $(e).parent().parent().find('.propID').text(),
		'autoDimensions' : false,
		'scrolling' : 'no',
		'width' : 650,
		'height' :550,
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
</script>
<div class="elevencol">
    <div class="creativetbl_container">
    	<table id="employeeContainer">
			<thead>
				<tr>
					<th>Index</th>
					<th style="display:none;"></th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Cell no</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<c:set var="odd" value="true" />
				<c:set var="counter" value="1" />
				<c:forEach items="${employees }" var="employee">
					<tr class="<c:out value="${odd ? 'odd': 'even'}"/>">
						<td>${counter }</td>
						<td style="display:none;" class="propID">${employee.id }</td>
						<td><a href="#" onclick="onOpenPopUp2(this);">${employee.firstname }</a></td>
						<td>${employee.lastname }</td>
						<td><a href="mailto:${employee.email }">${employee.email }</a></td>
						<td>${employee.mobno}</td>
						<td width="90" class="centerit rightGridPadding"><a class="creativeButton squareYellowButton editButton ct_edit_group" id="fcbLink" href="fragment/fragment_add_employee?id=${employee.id }"></a><a class="creativeButton squareRedButton closeButton" onClick="javascript: return onDeleteClick(this);"></a></td>
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
