function clientEditAction(e) {
    var clientBeingEditedID = $(e).closest('tr').find('.clientID').text();
    $.post("controllers/clientCB.php", {
            mode: "populateEditClientForm",
            clientBeingEditedID: clientBeingEditedID
        },
        function(editClientData) {
            var editClientForm = $.parseJSON(editClientData);

            $.fallr('show', {
                useOverlay: true,
                width: '930px',
                position: 'center',
                icon: 'gear',
                buttons: {
                    button1: {
                        text: 'Save',
                        onclick: editClient
                    },
                    button2: {
                        text: 'Cancel'
                    }
                },
                content: '<div id="fallrHeadline"><h5>Edit Client</h5></div><div id="fallrContent"><form id="updateClient"><ul><li><h5>Client Information</h5><label class="mediumRed">Client Name:</label><input type="text" id="editClientName" name="editClientName" value="' + editClientForm[1] + '"></li><li><label>Office Name:</label><input type="text" id="editOfficeName" name="editOfficeName" value="' + editClientForm[2] + '"></li><li><label>Client Type:</label>' + clientTypeSelect + '<div class="clear"></div></li><li><label>Address:</label><input type="text" id="editMailAddr" name="editMailAddr" value="' + editClientForm[4] + '" ></li><li><label>&nbsp;</label><input type="text" id="editMailAddr2" name="editMailAddr2" value="' + editClientForm[5] + '" ></li><li><label>City:</label><input type="text" id="editMailCity" name="editMailCity" value="' + editClientForm[6] + '" ></li><li><label>State:</label>' + stateSelect + '</li><li><label>Zip/Postal:</label><input type="text" id="editMailZip" name="editMailZip" value="' + editClientForm[8] + '" ></li><li><label>Country</label><input type="text" id="editMailCountry" name="editMailCountry" value="' + editClientForm[9] + '" ></li><li><label>Phone:</label><input type="text" id="editCompanyPhone" name="editCompanyPhone" value="' + editClientForm[16] + '" ></li><li><label>Fax:</label><input type="text" id="editCompanyFax" name="editCompanyFax" value="' + editClientForm[21] + '" ></li></ul><ul id="second"><li><h5>Billing Address</h5></li><li><label class="mediumRed">Billing Address:</label><input type="text" id="editBillAddr" name="editBillAddr" value="' + editClientForm[10] + '" ></li><li><label>&nbsp;</label><input type="text" id="editBillAddr2" name="editBillAddr2" value="' + editClientForm[11] + '" ></li><li><label class="mediumRed">City:</label><input type="text" id="editBillCity" name="editBillCity" value="' + editClientForm[12] + '" ></li><li><label class="mediumRed">State:</label>' + stateBillSelect + '</li><li><label class="mediumRed">Zip/Postal:</label><input type="text" id="editBillZip" name="editBillZip" value="' + editClientForm[14] + '" ></li><li><label class="mediumRed">Country:</label><input type="text" id="editBillCountry" name="editBillCountry" value="' + editClientForm[15] + '" ></li><li><label class="mediumRed">Contact Name:</label><input type="text" id="editContactName" name="editContactName" value="' + editClientForm[17] + '"></li><li><label>Contact Phone:</label><input type="text" id="editContactPhone" name="editContactPhone" value="' + editClientForm[18] + '" ></li><li><label class="mediumRed">Contact E-mail:</label><input type="text" id="editContactEmail" name="editContactEmail" value="' + editClientForm[19] + '" ></li><li><label>Contact Title:</label><input type="text" id="editContactTitle" name="editContactTitle" value="' + editClientForm[20] + '" ></li><li><label>Notes:</label><textarea id="editNotes" name="editNotes">' + editClientForm[22] + '</textarea></li></ul><button type="submit" name="fallrSubmit" id="fallrSubmit" class="hide"></button></form></div><div class="clear"></div>'
            }, function() {
                // to select the select box options by Akshay
                $('option:contains("' + editClientForm[3] + '")').attr('selected', 'selected');
                $(' select[name=editMailState] option[value="' + editClientForm[7] + '"]').attr('selected', 'selected');
                $('select[name=editBillState] option[value="' + editClientForm[13] + '"]').attr('selected', 'selected');

            });

            //This function will help us make customize fallr
            fallrCustom();

            function editClient() {
                //$('#fallrSubmit').trigger('click');


                //alert($("#updateClient").valid())
                //if(!$("#updateClient").valid()) return;

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
                $.post("controllers/clientCB.php", {
                        mode: "editClient",
                        clientBeingEditedID: clientBeingEditedID,
                        editClientName: $('#editClientName').val(),
                        editOfficeName: $('#editOfficeName').val(),
                        editClientType: $('#editClientType').val(),
                        editMailAddr: $('#editMailAddr').val(),
                        editMailAddr2: $('#editMailAddr2').val(),
                        editMailCity: $('#editMailCity').val(),
                        editMailState: $('#editMailState').val(),
                        editMailZip: $('#editMailZip').val(),
                        editMailCountry: $('#editMailCountry').val(),
                        editCompanyPhone: $('#editCompanyPhone').val(),
                        editCompanyFax: $('#editCompanyFax').val(),
                        editBillAddr: $('#editBillAddr').val(),
                        editBillAddr2: $('#editBillAddr2').val(),
                        editBillCity: $('#editBillCity').val(),
                        editBillState: $('#editBillState').val(),
                        editBillZip: $('#editBillZip').val(),
                        editBillCountry: $('#editBillCountry').val(),
                        editContactName: $('#editContactName').val(),
                        editContactPhone: $('#editContactPhone').val(),
                        editContactEmail: $('#editContactEmail').val(),
                        editContactTitle: $('#editContactTitle').val(),
                        editNotes: $('#editNotes').val()
                    },
                    function(list) {
                        $("#message").html(list);
                        var currentPage = $('#ct_page').val();
                        clientCenter();
                        $.unblockUI();
                    });
                return false;
            }

            //Client Validation Update Form
            $("#updateClient").validate({
                onkeyup: false,
                errorElement: 'li',
                errorPlacement: function(error, element) {
                    validateErrorsMessage(error, element);
                },
                onfocusout: function(element, event) {
                    validateOnFocusOutMessage(element, event);
                },
                rules: {
                    editClientName: {
                        required: true
                    },
                    editContactName: {
                        required: true
                    },
                    editContactEmail: {
                        required: true,
                        email: true
                    },
                    editBillAddr: {
                        required: true
                    },
                    editBillCity: {
                        required: true
                    },
                    editBillState: {
                        required: true,
                        noSelectText: true
                    },
                    editBillZip: {
                        required: true
                    },
                    editBillCountry: {
                        required: true
                    }
                },
                messages: {
                    editClientName: {
                        required: "Client name is required"
                    },
                    editContactName: {
                        required: "Contact name is required"
                    },
                    editContactEmail: {
                        required: "Contact email is required",
                        email: "Contact email is not valid"
                    },
                    editBillAddr: {
                        required: "Billing address is required. This is used on the invoice."
                    },
                    editBillCity: {
                        required: "Billing city is required"
                    },
                    editBillState: {
                        required: "Billing state is required",
                        noSelectText: 'Select can\'t be chosen for billing state'
                    },
                    editBillZip: {
                        required: "Billing zip/postal is required"
                    },
                    editBillCountry: {
                        required: "Billing country is required"
                    }
                }
                // ,
                // submitHandler: function() { console.log('submitHandler');

                // }		
            });
        });
}

/******************************************************************
For Client Grid
******************************************************************/

function clientCenter(e) {
    $.post("controllers/clientCenterCB.php", {
            client: 1
        },

        function(list) {
            $("#clientGrid").html(list);
            $("html,body").animate({
                scrollTop: 0
            }, 'slow');
            $('.gridHeader').show();
        });
}

/******************************************************************
Client Delete Action
******************************************************************/

function clientDeleteAction(e) {
    var clientBeingDeletedID = $(e).closest('tr').find('.clientID').text();
    $.fallr('show', {
        buttons: {
            button1: {
                text: 'Delete',
                onclick: deleteClient
            },
            button2: {
                text: 'Cancel'
            }
        },
        content: '<div id="fallrHeadline"><p>Are you absolutely sure you would like to DELETE this client?</p></div><div id="fallrContent"><span class="mediumRed">We suggest editing the client\'s data instead!</span></div><form id="deleteStatus"><input type="hidden" id="statusDelete" value="' + clientBeingDeletedID + '" /' + '></form>',
        icon: 'error',
        position: 'center',
        useOverlay: true
    });

    //This function will help us make customize fallr
    fallrCustom();

    function deleteClient() {
        $.blockUI({
            message: 'Deleting Status',
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
        $.post("controllers/clientCB.php", {
                mode: "deleteClient",
                clientBeingDeletedID: clientBeingDeletedID
            },

            function(list) {
                $("#message").html(list);
                clientCenter();
                $.unblockUI();
            });
        return false;
    }

}
