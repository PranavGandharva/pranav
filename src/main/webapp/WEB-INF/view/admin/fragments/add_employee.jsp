<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<script type="text/javascript">
	var REGEX_EXCEL_FILES_ONLY = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
	var options = {
		success: function (data) {
			loadPage(${isNotStandAloneFragment eq true ? '14' : '21' });
			$.fancybox.close();
		},
		error: function (e) {
			alert("Failed to send request to server, Please try again later...!");
			$.fancybox.close();
		}
	}

	var excelImpoptions = {
		success : function(data) {
			$.fallr('hide');
			loadPage(${isNotStandAloneFragment eq true ? '14' : '21' }, function() {
				$("#bef_FileImpBut").text("File Import Success...!!!");
			});
		},
		error : function(e) {
			$.fallr('hide');
			toggleLoadingIcon(false);
			$("#bef_FileImpBut").text("Invalid file or Server Error...!!!");
		}
	}

	function submitForm() {
	alert("submit");
		toggleLoadingIcon(true);
		jQuery.noConflict();
		$('#newUser').ajaxForm(options).submit();
		return false;
	}

	function submitFile() {
		toggleLoadingIcon(true);
		var fullPath = document.getElementById('file').value;
		if (fullPath) {
			var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
			var filename = fullPath.substring(startIndex);
			if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
				filename = filename.substring(1);
			}
			if(REGEX_EXCEL_FILES_ONLY.test(filename))
				$("#importEmployees").ajaxForm(excelImpoptions).submit();
			else {
				$("#bef_FileImpBut").text("Please select valid excel file. File extension must be *.xls or *.xlsx");
				toggleLoadingIcon(false);
				$.fallr('hide');
			}
		}
	}

	function handleFileUploadRequest() {
		$.fallr('show', {
			useOverlay: true,
			position: 'center',
			icon        : 'document',
			content     : '<div id="fallrHeadline">'
			+ '<h5>Upload</h5>'
			+ '</div><div id="fallrContent">'
			+ '<p class="mediumRed">Select file to upload:</p>'
			+ '<form action="importEmployees" id="importEmployees" name="importEmployees" method="post">'
			+     '<input type="file" name="file" id="file"/>'
			+ '</form></div>',
			buttons : {
				button1 : {text: 'Submit', onclick: submitFile},
				button4 : {text: 'Cancel'}
			},
		});
		fallrCustom();
		return false;
	}

	$(document).ready(function () {
		$("#newUser").on("submit", function () {
			var ret = true;
			var pass1 = document.getElementById("password").value;
			var pass2 = document.getElementById("passwordc").value;
			var ptr = /^([0-9])*\.*([0-9])+$/;
			var no = /^[0-9]{10}\b/;
			re = /^[1-9][0-9]{0, 8}$/;
			$(".employeeValidation").each(function () {
				var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
				if ($(this).val() == '' && !($(this).attr("id") == 'extension')) {
					$("#" + $(this).attr("id") + "_span").text("* Field is required");
					ret = false;
				}
				else if (!($(this).attr("id") == 'city') && !($(this).attr("id") == 'address1') && !($(this).attr("id") == 'extension') && !($(this).attr("id") == 'phone') && !($(this).attr("id") == 'mobileNo') && !($(this).attr("id") == 'email') && !($(this).attr("id") == 'username') && !($(this).attr("id") == 'password') && !($(this).val().match('^[a-zA-Z]+$'))) {
					$("#" + $(this).attr("id") + "_span").text("* Only Alphabets are allowed");
					ret = false;
				}
				else if (($(this).attr("id") == 'username') && !($(this).val().match('^[a-zA-Z0-9_]+$'))) {

					$("#" + $(this).attr("id") + "_span").text("*Special characters except '-' is not allowed");
					ret = false;
				}
				else if (($(this).attr("id") == 'city') && !($(this).val().match('^[a-zA-Z ]+$'))) {
					$("#" + $(this).attr("id") + "_span").text("* Only  Alphabets and space is allowed");
					ret = false;
				}
				else if ((($(this).attr("id") == 'phone')) && (!ptr.test($(this).val()))) {
					$("#" + $(this).attr("id") + "_span").text("* Only  Number required");
					ret = false;
				}
				else if ((($(this).attr("id") == 'mobileNo')) && ((!ptr.test($(this).val())))) {
					$("#" + $(this).attr("id") + "_span").text("* Only  Number required");
					ret = false;
				}
				else if ((!no.test($(this).val()) || ($(this).val().length > 10)) && !($(this).attr("id") == 'email') && !($(this).attr("id") == 'username') && !($(this).attr("id") == 'city') && !($(this).attr("id") == 'firstName') && !($(this).attr("id") == 'middleName') && !($(this).attr("id") == 'lastName') && !($(this).attr("id") == 'extension') && !($(this).attr("id") == 'password') && !($(this).attr("id") == 'address1')) {
					$("#" + $(this).attr("id") + "_span").text("*Length should be of 10 digits.");
				}
				else if ((($(this).attr("id") == 'password')) && pass1 != pass2 && $(this).val() == '') {
					$("#" + $(this).attr("id") + "_span").text("* Password must match");
					ret = false;
				}
				else if ((($(this).attr("id") == 'email')) && !(pattern.test($(this).val()))) {
					$("#" + $(this).attr("id") + "_span").text("* Not valid Email");
					ret = false;
				}
				else if ((($(this).attr("id") == 'password')) && pass1 != pass2) {
					$("#" + $(this).attr("id") + "_span").text("* Password must match");
					ret = false;
				}
				if (($("#extension").val().length > 3) && ($(this).attr("id") == 'extension')) {
					$("#" + $(this).attr("id") + "_span").text("*Length should be of less than 3 characters.");
					ret = false;
				}
			})
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

<c:if test="${isNotStandAloneFragment }">
<div class="fancyboxTitle"><span class="ui-dialog-title" id="ui-dialog-title-quickSearch">Edit Employee</span></div>
<div class="fancybottomContent">
<div id="contentWrapper" class="ninecol last">
</c:if>
	<form:form modelAttribute="newUser"  method="post" action="${isNotStandAloneFragment eq true ? 'updateEmployee' : 'addEmployee' }">
		<div class="fivecol regbox">
			<h3>New Employee</h3>
			<hr />
			<!--Employee Name-->
			<fieldset>
				<ol>
					<li>
						<label for="fName" class="mediumRed" >First Name:</label>
						<form:input path="firstname" class="employeeValidation"/>
						<span id="firstName_span" class="clr">
						</span>
					</li>
<!-- 					<li> -->
<!-- 						<label for="fName" class="mediumRed">Middle Name:</label> -->
<%-- 						<form:input path="middleName" class="employeeValidation"/> --%>
<!-- 						<span id="middleName_span" class="clr"></span> -->
<!-- 					</li> -->
					<li>
						<label for="lName" class="mediumRed">Last Name:</label>
						<form:input path="lastname" class="employeeValidation"/>
						<span id="lastName_span" class="clr"></span>
					</li>
				</ol>
			</fieldset>
			<!--Employee Address-->
			<fieldset>
				<ol>
					<li>
						<label for="address" class="mediumRed">Addressline 1:</label>
						<form:input path="address1" class="employeeValidation"/>
						<span id="address1_span" class="clr"></span>
					</li>
					<li>
						<label for="address" class="mediumRed">Addressline 2:</label>
						<form:input path="address2"/>
					</li>
					<li>
						<label for="city" class="mediumRed" >City:</label>
						<form:input path="city" class="employeeValidation"/>
						<span id="city_span" class="clr"></span>
					</li>
					<li>
						<label for="state" class="mediumRed">State:</label>
						<form:select path="state">
							<c:forEach items="${states }" var="state">
								<form:option value="${state.id}">${state.name}</form:option>
							</c:forEach>
						</form:select>
					</li>
				</ol>
			</fieldset>
			<h3>New Employee Contact Details</h3>
			<hr />
			<!--Phone NUMBERS-->
			<fieldset>
				<ol>
					<li>
						<label for="homePhone" class="mediumRed">Phone:</label>
						<form:input path="phnNo" class="employeeValidation"/>
						<span id="phone_span" class="clr"></span>
					</li>
					<li>
						<label for="cell" class="mediumRed">Mobile:</label>
						<form:input path="mobno" class="employeeValidation"/>
						<span id="mobileNo_span" class="clr"></span>
					</li>
					<li>
						<label for="email" class="mediumRed">Email:</label>
						<form:input path="email" class="employeeValidation"/>
						<span id="email_span" class="clr"></span></li>
					</li>
				</ol>
			</fieldset>
		</div>
		<div class="fivecol noShadow regbox">
			<h3>New Employee Credentials</h3>
			<hr />
			<fieldset>
				<ol>
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
				</ol>
			</fieldset>
			<h3>New Employee Status</h3>
			<hr />
			<fieldset>
				<ol>
					<li>
						<label for="emgPhone" class="mediumRed">Employee Role:</label>
						<form:select path="role">
							<c:forEach items="${roles }" var="role">
								<form:option value="${role.id }">${role.name }</form:option>
							</c:forEach>
						</form:select>
					</li>
					<li>
						<label for="emgName" class="mediumRed"> Extension:</label>
						<form:input path="extension"  class="employeeValidation"/>
						<span id="extension_span" class="clr"></span></li>
					</li>
					<li>
						<label for="emgRelation" class="mediumRed">Is Account Active?</label>
						<form:checkbox path="active" class="tour3"/>
						<br>
						<span id="firstName_span1" class="clr">
						${sessionScope.errorMsg }
						<c:remove var="errorMsg" scope="session"/>
						</span>
					</li>
				</ol>
			</fieldset>
			<div id="showPermission"></div>
			<hr />
			<c:if test="${isNotStandAloneFragment }">
				<%-- Add hidden params for update form --%>
				<form:hidden path="id"/>
			</c:if>
			<span id="bef_FileImpBut"></span>
			<button type="submit" value="Add User" class="blueButton submit fallr-button" id="submit" onclick="javascript: return submitForm();">${isNotStandAloneFragment ? 'Update User' : 'Add user' }</button>
			<button type="reset" value="Clear" class="submit fallr-button" id="clear">${isNotStandAloneFragment ? 'Reset' : 'Clear' }</button>
			<button type="button" value="Import" class="fallr-button" onclick="return handleFileUploadRequest();">Import</button>
		</div>
	</form:form>
	<div class="clear"></div>
<c:if test="${isNotStandAloneFragment }">
</div>
</div>
</c:if>
