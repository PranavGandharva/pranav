<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script type="text/javascript">
var options = {
		success : function(data) {
			$.fallr('hide');
			loadPage(MANAGE_MEMBERDETAIL);
		},
		error : function(e) {
			alert("Failed to send request to server, Please try again later...!");
		}
	}
function sendDeleteRequest(id) {
	toggleLoadingIcon(true);
	$.ajax({
	   type: "POST",
	   url: "deleteMemberDetail",
	   data: "id=" + id,
	   success: function(){
			$.fallr('hide');
			loadPage(MANAGE_MEMBERDETAIL);
	   },
	   error: function() {
		   alert("Failed to connect to server, Please try again later...");
	   }
	});
	
}
function updatePropertyTypeName() {
	toggleLoadingIcon(true);
	$('#fallrContent').ajaxForm(options).submit();
}

function sendDeleteRequest(id) {
	toggleLoadingIcon(true);
	$.ajax({
	   type: "POST",
	   url: "deleteMemberDetail",
	   data: "id=" + id,
	   success: function(){
			$.fallr('hide');
			loadPage(MANAGE_MEMBERDETAIL);
	   },
	   error: function() {
		   alert("Failed to connect to server, Please try again later...");
	   }
	});
}
function onUpdateClick(e) {
	$.fancybox({
		'href' : "fragment/fragment_edit_member_detail/" + $(e).closest('tr').find('.propID').text(),
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
}
function onClickDetail(e) {
	$.fancybox({
		'href' : "fragment/fragment_view_member_detail?id=" + $(e).closest('tr').find('.propID').text(),
		'autoDimensions': false,
	    'scrolling': 'no',
	    'width': 650,
	    'height': 400,
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
	$('#employee').ajaxForm(options).submit();
	return false;
}
</script>
<style>
.clr {
	color: red;
}
</style>
<div class="fivecol">
	<h3>Manage Member Detail</h3>
	<hr>
	<form:form modelAttribute="employee" action="addMemberDetail"
		method="post">
		<fieldset>
			<ol>
				<li><label for="expenseName" class="mediumRed">First Name:</label>
				<form:input type="text" path="firstname" class="tour2 memberValidation" />
				<span class="clr" id="name_span"></span></li>
				
<!-- 				<li><label for="expenseName" class="mediumRed">Middle Name:</label> -->
<%-- 				<form:input type="text" path="middleName" class="tour2 memberValidation" /> --%>
<!-- 				<span class="clr" id="name_span"></span></li> -->
				
				<li><label for="expenseName" class="mediumRed">Last Name:</label>
				<form:input type="text" path="lastname" class="tour2 memberValidation" />
				<span class="clr" id="name_span"></span></li>
				
				<li><label for="expenseName" class="mediumRed">Permanent Address:</label>
				<form:input type="text" path="address1" class="tour2 memberValidation" />
				<span class="clr" id="permenantAddress_span"></span></li>
				
				<li><label for="expenseName" class="mediumRed">Office Address:</label>	
				<form:input type="text" path="address2" class="tour2" />
				<span class="clr" id="officeAddress_span"></span></li>
				
				<li><label for="expenseName" class="mediumRed">Date Of Birth:</label>
				<form:input type="date" path="detail.dateofbirth" class="tour2 memberValidation" />
				<span class="clr" id="dateOfBirth_span"></span></li>
						
				<li><label for="expenseName" class="mediumRed">Age:</label>
				<form:input type="text" path="detail.age" class="tour2 memberValidation" />
				<span class="clr" id="age_span"></span></li>
				
				<li><label for="expenseName" class="mediumRed">Mobile Number:</label>
				<form:input type="text" path="mobno" class="tour2 memberValidation" />
				<span class="clr" id="contactNo1_span"></span></li>
				
				<li><label for="expenseName" class="mediumRed">Phone Number:</label>
				<form:input type="text" path="phnNo" class="tour2 memberValidation" />
				<span class="clr" id="contactNo2_span"></span></li>
				
				<li><label for="expenseName" class="mediumRed">Emergency Contact number:</label>
				<form:input type="text" path="detail.ContactNo" class="tour2 memberValidation" />
				<span class="clr" id="contactNo3_span"></span></li>
				
				<li><label for="expenseName" class="mediumRed">Email:</label>
				<form:input type="text" path="email" class="tour2 memberValidation" />
				<span class="clr" id="email_span"></span></li>
				
				<li>
					<label for="user" class="mediumRed">Username:</label>
					<form:input path="username" class="tour3 employeeValidation" />
					<span id="username_span" class="clr"></span>
				</li>
				<li>
					<label for="pass" class="mediumRed">Password:</label>
					<form:password path="password" class="employeeValidation"/>	
				</li>
				<li>
					<label for="passc" class="mediumRed" >Confirm: </label>
					<input type="password" name="passwordc" id="passwordc"  value="" />
					<span id="password_span" class="clr"></span>
				</li>
				
				<li><label for="expenseName" class="mediumRed">Profession:</label>
				<form:input type="text" path="detail.profession" class="tour2 memberValidation" />
				<span class="clr" id="profession_span"></span></li>
				
				<li><label for="expenseName" class="mediumRed">PAN Number:</label>
				<form:input type="text" path="detail.PanNo" class="tour2 memberValidation" />
				<span class="clr" id="PANNumber_span"></span></li>
				
				<li><label for="expenseName" class="mediumRed">Marriage Anniversary Date:</label>
				<form:input type="text" path="detail.AnniversaryDate" class="tour2 memberValidation" />
				<span class="clr" id="marriageAnniversaryDate_span">
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
					<th>Age</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<c:set var="odd" value="true" />
				<c:set var="counter" value="1" />
				<c:forEach items="${members }" var="member">
					<tr class="<c:out value="${odd ? 'odd': 'even'}"/>">
						<td>${counter }</td>
						<td style="display:none;" class="propID">${member.id }</td>
						<td class="propName"><a class="invOption" rel="" onclick="onClickDetail(this);" >${member.firstname } ${member.lastname}</a></td>
						<td>${member.detail.age }</td>
						
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
