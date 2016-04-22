<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Membership Management</title>
<%@include file="includes/include_css_js.jsp"%>
<style type="text/css">
table#ct th:nth-child(2), table#ct tr td:nth-child(2), table#ct th:nth-child(3),
	table#ct tr td:nth-child(3) {
	display: none;
}
</style>
<script type="text/javascript">
	$(document).ready(function() {
		loadPage(17);
		dropDownMenu('.menu');
		$('.nav_project').children().addClass("active");
	});
</script>

</head>
<div class="loading" id="loading" style="position: relative; left: 50%;"></div>
<body>
	<div id="fullWrapper" style="width: 100%; left: 0px;">
		<div id="mainMenu">
			<div id="toppanel">
				<%@include file="includes/include_header.jsp"%>
			</div>
		</div>
		<div id="wrapper" class="row">
			<div id="ajaxContent" style="overflow: hidden; display: none;">
				<%@include file="includes/include_sidebar_members.jsp"%>
				<div id="contentWrapper" class="ninecol last">
				</div>
			</div>
		</div>
	</div>







	<script type="text/javascript">
		// Hide loading indicator
		$("#loading").hide();
	</script>
</body>
</html>