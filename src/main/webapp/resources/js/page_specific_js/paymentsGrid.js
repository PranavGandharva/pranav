  //--------------------------------------------------------------
  //----------------Delete Payment----------------------------
  //--------------------------------------------------------------
  function deletePayment(e) {
          var paymentID = $(e).closest('tr').find('.paymentID').text();
          var invoiceNumber = $(e).closest('tr').find('.invoiceNumber').text();
          /*------------  check edit payment is granted  or not -----------*/
          var payment_id = $(e).closest('tr').find('.paymentID').text();
          $.post("controllers/invoicePaymentCB.php", {
                  mode: "populateinvoicePayment",
                  paymentID: payment_id
          },
          function (editinvoicePayment) {
                  var editinvoicePaymentForm = $.parseJSON(editinvoicePayment);
                  if(editinvoicePaymentForm[0] == 'error'){
                    $("#message").html(editinvoicePaymentForm[1]);
                    closeMessage();
                  }else{
         /*------------  check edit payment is granted  or not -----------*/
                      $.fallr('show', {
            				  icon: 'error',
                              useOverlay: true,
                              position: 'center',
                              closeKey: true,
                              width: '360px',
                              content: '<div id="fallrHeadline"><p>Are you sure you would like to DELETE this payment?</p></div><div id="fallrContent"><p>Please make sure you really want to delete the payment.</p></div>',
                              buttons: {
                                      button1: {
                                              text: 'Delete',
                                              danger: false,
                                              onclick: function () {
                                                      deleteInvoicePost();
                                                      $.fallr('hide');
                                              }
                                      },
                                      button4: {
                                              text: 'Cancel'
                                      }
                              }
                      });
					//This function will help us make customize fallr
					fallrCustom();						  
                  }
          });

          function deleteInvoicePost() {
                  $.blockUI({
                          message: 'Deleting the payment.',
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
                  $.post("controllers/invoicePaymentCB.php", {
                          mode: "delete",
                          paymentID: paymentID,
                          invoiceNumber: invoiceNumber
                  },

                  function (list) {
                          $("#message").removeClass().html(list);
                          var currentPage = $('#ct_page').val();
                          ctSubmitForm('ct', currentPage, false, 'items_per_page,tbody,pager');
                          $.unblockUI();
                  })
          }
  }
  //--------------------------------------------------------------
  //----------------Edit Action----------------------------
  //--------------------------------------------------------------
  function EditPayment(e) {
          var payment_id = $(e).closest('tr').find('.paymentID').text();
          $.post("controllers/invoicePaymentCB.php", {
                  mode: "populateinvoicePayment",
                  paymentID: payment_id
          },
          function (editinvoicePayment) {
                  var editinvoicePaymentForm = $.parseJSON(editinvoicePayment);
                  if(editinvoicePaymentForm['statusData'] == 1){
                  var automaticMail = '<input type="checkbox" name="automaticMail" id="automaticMail" value="1"/> Send client "thank-you" for payment email';
                  }else{
                    automaticMail ='';
                  }
                  /*------------  check edit payment is granted  or not -----------*/
                  if(editinvoicePaymentForm[0] == 'error'){
                    $("#message").html(editinvoicePaymentForm[1]);
                    	closeMessage();
                  }else{
                  $.fallr('show', {
                          useOverlay: true,
                          position: 'center',
                          width: '630px',
                          icon: 'gear',
                          buttons: {
                                  button1: {
                                          text: 'Save',
                                          onclick: editPaymentData
                                  },
                                  button2: {
                                          text: 'Cancel'
                                  }
                          },
                          content: '<div id="fallrHeadline"><h5>Invoice Payment</h5></div><div id="fallrContent"><form name="newPayment" id="newPayment"><ul><li class="fallr"><label for="invoiceNumber" class="mediumRed" style="width:115px">Invoice Number:</label><div class="autoCompleteWrapper"><input type="text" name="invoiceNumber" id="invoiceNumber" value="' + editinvoicePaymentForm[0] + '"/></div></li><li class="fallr"><label for="amountReceived" class="mediumRed" style="width:115px">Amount Received:</label><input type="text" name="amountReceived" id="amountReceived" value="' + editinvoicePaymentForm[1] + '"/></li><li class="fallr"><label for="paymentDate" class="mediumRed" style="width:115px">Payment Date:</label><div class="dateWrapper"><input type="text" name="paymentDate" id="paymentDate" class="date" value="' + editinvoicePaymentForm[2] + '"/></div></li><li class="fallr"><label for="paymentMethod" style="width:115px">Payment Method:</label><select name="paymentMethod" id="paymentMethod"><option value="Authorize.Net">Authorize.Net</option><option value="Bank Transfer">Bank Transfer</option><option value="Bank Remittance">Bank Remittance</option><option value="Cash">Cash</option><option value="Check">Check</option><option value="Credit Card">Credit Card</option><option value="Google Checkout">Google Checkout</option><option value="PayPal">PayPal</option></select></li><li class="fallr"><label for="referenceNum" style="width:115px">Reference Number:</label><input type="text" name="referenceNum" id="referenceNum" value="' + editinvoicePaymentForm[4] + '"/></li><li class="fallr"><label for="paymentNotes" style="width:115px">Notes:</label><textarea type="text" name="paymentNotes" id="paymentNotes">' + editinvoicePaymentForm[5] + '</textarea></li><input type="hidden" id="paymentId" value="' + editinvoicePaymentForm[6] + '"/><li class="checkboxRow">'+automaticMail+'  </li></ul></form></div>',
                  }, function () {
                          $('option[value="' + editinvoicePaymentForm[3] + '"]').attr('selected', 'selected');
                  });
                  }
				//This function will help us make customize fallr
				fallrCustom();					  
          });
          /*************** For edit Note Data *********************/
          function editPaymentData() {
                  $.blockUI({
                          message: 'Updating Payment Information',
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
                   var automaticMail = $('#automaticMail').attr('checked');
                    if(automaticMail == 'checked'){
                       automaticMail = '1';
                    }else{
                       automaticMail = '0';
                    }
                  $.post("controllers/invoicePaymentCB.php", {
                          mode: "updatePayment",
                          invID: $("#invoiceNumber").val(),
                          amountReceived: $("#amountReceived").val(),
                          paymentDate: $("#paymentDate").val(),
                          paymentDate: $("#paymentDate").val(),
                          paymentNotes: $("#paymentNotes").val(),
                          referenceNum: $("#referenceNum").val(),
                          paymentMethod: $("#paymentMethod").val(),
                          automaticMail: automaticMail,
                          paymentID: $("#paymentId").val()
                  },

                  function (list) {
                          $.fallr('hide');
                          $("#message").html(list);
                          var currentPage = $('#ct_page').val();
                          ctSubmitForm('ct', currentPage, false, 'items_per_page,tbody,pager');
                          $.unblockUI();
                  });
                  return false;
          }
  }