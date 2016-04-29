<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<script type="text/javascript">
	var options = {
		success : function(data) {
			loadPage(MANAGE_PROJECT_PROPERTY_PLAN);
			$.fancybox.close();
		},
		error : function(e) {
			alert("Failed to send request to server, Please try again later...!");
			$.fancybox.close();
		}
	}

	function submitForm() {
		toggleLoadingIcon(true);
		
		$('#updateProjectPropertyPlanModel').ajaxForm(options).submit();
		return false;
	}
	$(document).ready(function() {
		$("#updateProjectPropertyPlanModel").on("submit", function() {
			var ret = true;
			$(".popup .plann").each(function(){
				
				if($(this).val()=='') {
				$("#" + $(this).attr("id") + "_spann").text("* Field is required");
					ret = false;
				}
				else if($(".popup #planName").val().length>50){
			    	$("#planName_spann").text("*Max length should be 50 characters");
			    	ret=false;
			    }
				 if($(".popup #planFilePath").val().length>255){
			    	$("#planFilePath_spann").text("*Max length should be 255 characters");
			    	ret=false;
			    }
				});
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
<div class="fancyboxTitle">
	<span class="ui-dialog-title" id="ui-dialog-title-quickSearch">Edit
		Property Plan</span>
</div>
<div class="fancybottomContent">
	<div id="contentWrapper" class="ninecol last popup">
		<form:form modelAttribute="updateProjectPropertyPlanModel"
			method="post" action="updateProjectPropertyPlan">
		
			<div class="fivecol regbox">
				<fieldset>
					<ol>
						<li><label for="expenseName" class="mediumRed">Project</label>
							<form:select path="project">
								<form:options items="${projects}" itemLabel="name"
									itemValue="id" />
							</form:select></li>

						<li><label for="expenseName" class="mediumRed">Project
								Property Type:</label> <form:select path="propertyType">
								<form:options items="${propTypes}" itemLabel="name"
									itemValue="id" />
							</form:select></li>

						<li><label for="expenseName" class="mediumRed">Block:</label>
							<form:select path="block">
								<form:options items="${blocks}" itemLabel="block"
									itemValue="id" />
							</form:select></li>
					</ol>
				</fieldset>
			</div>
			<div class="fivecol noShadow regbox">
				<fieldset>
					<ol>
					<li><label for="expenseName" class="mediumRed">Floor
								Number:</label> <form:input type="text" path="floorNumber" class="tour2" /></li>

						<li><label for="expenseName" class="mediumRed">Plan
								Name:</label> <form:input type="text" path="planName"
								class="tour2 plann" /> <span id="planName_spann" class="clr"></span></li>

						<li><label for="expenseName" class="mediumRed">Plan
								File Path:</label> <form:input type="text" path="planFilePath"
								class="tour2 plann" /> <span id="planFilePath_spann"
							class="clr"></span></li>
						<form:hidden path="id" />
						<li>
							<button type="submit" value="Add User"
								class="blueButton submit fallr-button" id="submit"
								onclick="javascript: return submitForm();">Update
								Project</button>
							<button type="reset" value="Clear" class="submit fallr-button"
								id="clear">Clear</button>
						</li>
					</ol>
				</fieldset>
			</div>
		</form:form>
	<div class="clear"></div>
	</div>
</div>