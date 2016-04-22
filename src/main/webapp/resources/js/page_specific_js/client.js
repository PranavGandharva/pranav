function possibleDuplicates(clientDuplicates) {
    //console.log(clientDuplicates);
    $.fallr('show', {
        width: '850px',
        icon: 'info',
        content: '<div id="fallrHeadline"><p>QuickBooks Sync Warning</p></div> <div id="fallrContent"><p>Your client has been added to Rove; however while syncing your new client to QuickBooks we noticed their might be possible duplicates in QuickBooks.<br> <b>If you would like to update an existing QuickBooks client instead of adding a new client; click on the "Use this client" button next to their name below.</b><br>If you would like to continue adding a new client in QuickBooks, click on the "Continue Adding New" button at the bottom of the list.<br>If you do not want to add/update the client in QB, click "Do not Add in QB" button.<br><br>Possible Duplicates:</p><table id="possibleDuplicates"><tbody><thead><tr><td></td><td class="clientName">Client Name</td><td class="QB_customerAddress">Billing Address</td></tr></thead></tbody></table></table></div>',
        buttons: {
            button1: {
                text: 'Continue Adding New',
                onclick: function() {
                    submitClient("notDuplicateAddNew");
                    $.fallr('hide');
                }
            },
            button2: {
                text: "Do not Add in QB",
                onclick: function() {
                    $.fallr('hide');
                }
            }
        },
        position: 'center',
        useOverlay: true
    });
    $.each(clientDuplicates.response, function(e) {
        $('<tr><td><button onclick="duplicateClient(' + this.QB_customerId + ')" class="smallButton">Use this client</button></td><td class="clientName">' + this.QB_customerName + '</td><td class="customerAddress">' + this.QB_customerAddress + '</td></tr>').insertAfter('#possibleDuplicates thead');
    });
    fallrCustom();
}


//THIS FUNCTION IS CALLED WHEN THE USER CLICKS ON A POSSIBLE DUPLICATE
//SO THIS FUNCTION IS ONLY USED FOR UPDATING THE CLIENT VIA QUICKBOOKS
// !IMPORTANT - IF YOU ARE LOOKING FOR THE SCRIPT THAT UPDATES THE CLIENT IN ROVE YOU NEED TO EDIT IN CLIENTCENTER.JS (ANY CHANGES TO CLIENTS WILL RESULT EDITING IN 3 PLACES.)

function duplicateClient(QB_ID) {
    $.blockUI({
        message: 'Updating Client Information',
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            'border-radius': '2px',
            '-webkit-border-radius': '2px',
            '-moz-border-radius': '2px',
            opacity: 1,
            color: '#fff'
        }
    });


    if (!QB_ID) {
        alert("We could not find the QuickBooks ID.");
        return;
    }

    $.post("controllers/clientCB.php", {
            mode: "editClient",
            clientBeingEditedID: "",
            editClientName: $('#clientName').val(),
            editOfficeName: $('#officeName').val(),
            editClientType: $('#clientType').val(),
            editMailAddr: $('#mailAddr').val(),
            editMailAddr2: $('#mailAddr2').val(),
            editMailCity: $('#mailCity').val(),
            editMailState: $('#mailState').val(),
            editMailZip: $('#mailZip').val(),
            editMailCountry: $('#mailCountry').val(),
            editCompanyPhone: $('#companyPhone').val(),
            editCompanyFax: $('#companyFax').val(),
            editBillAddr: $("#billAddress").val(),
            editBillAddr2: $("#billAddress2").val(),
            editBillCity: $('#billCity').val(),
            editBillState: $('#billState').val(),
            editBillZip: $('#billZip').val(),
            editBillCountry: $('#billCountry').val(),
            editContactName: $('#contactName').val(),
            editContactPhone: $('#contactPhone').val(),
            editContactEmail: $('#contactEmail').val(),
            editContactTitle: $('#contactTitle').val(),
            QB_mode: "duplicateClient",
            QB_ID: QB_ID
        },

        function(list) {
            $("#message").removeClass().html(list);
            $("html,body").animate({
                scrollTop: 0
            }, 'slow');
            $.unblockUI()
            setConfirmUnload(false);
        });
    return false;
}


$('#copyMailAddress').on('click', function(e) {
    e.preventDefault();
    var mailAddress = $("#mailAddress").val(),
        mailAddress2 = $("#mailAddress2").val(),
        mailCity = $("#mailCity").val(),
        mailState = $("#mailState").val(),
        mailZip = $("#mailZip").val(),
        mailCountry = $("#mailCountry").val()
        $("#billAddress").val(mailAddress);
    $("#billAddress2").val(mailAddress2);
    $("#billCity").val(mailCity);
    $("#billState").val(mailState);
    $("#billZip").val(mailZip);
    $("#billCountry").val(mailCountry);
});

function submitClient(QB_mode){
    $.blockUI({
        message: 'Processing...please wait.',
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            'border-radius': '2px',
            '-webkit-border-radius': '2px',
            '-moz-border-radius': '2px',
            opacity: 1,
            color: '#fff'
        }
    });

    if (!QB_mode) {
        QB_mode="";
    }

    $.post("controllers/clientCB.php", {
		clientName: $("#clientName").val(),
		officeName: $("#officeName").val(),
		clientType: $("#clientType").val(),
		mailAddress: $("#mailAddress").val(),
		mailAddress2: $("#mailAddress2").val(),
		mailCity: $("#mailCity").val(),
		mailState: $("#mailState").val(),
		mailZip: $("#mailZip").val(),
		mailCountry: $("#mailCountry").val(),
		billAddress: $("#billAddress").val(),
		billAddress2: $("#billAddress2").val(),
		billCity: $("#billCity").val(),
		billState: $("#billState").val(),
		billZip: $("#billZip").val(),
		billCountry: $("#billCountry").val(),
		companyPhone: $("#companyPhone").val(),
		companyFax: $("#companyFax").val(),
		contactName: $("#contactName").val(),
		contactPhone: $("#contactPhone").val(),
		contactEmail: $("#contactEmail").val(),
		contactTitle: $("#contactTitle").val(),
		QB_mode:QB_mode
	},
	function(list) {
		$("#message").removeClass().html(list);
		$("html,body").animate({
			scrollTop: 0
		}, 'slow');
		$.unblockUI()
		setConfirmUnload(false);
	});
	return false;
}