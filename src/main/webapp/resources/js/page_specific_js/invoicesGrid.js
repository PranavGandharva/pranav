 //The page reload happend after user clicks on close of the invoice preview.
 function pageReload() {
         $('#loading').show();
         $('#ajaxContent').empty().load("invoicesGrid.php", function () {
                 $('#loading').hide();
         });
 }
 //--------------------------------------------------------------
 //----------------Invoice Actions----------------------------
 //--------------------------------------------------------------
 function deleteInvoice(e) {
         var invoiceNumber = $(e).closest('tr').find('.invoiceNumber').text();
         $.fallr('show', {
				 icon: 'error',
                 useOverlay: true,
                 position: 'center',
                 closeKey: true,
                 width: '360px',
                 content: '<div id="fallrHeadline"><p>Are you sure you would like to DELETE this invoice?</p></div><div id="fallrContent"><p>All the items on the invoice will STILL be marked as invoiced under this invoice. Please make sure you really want to delete the invoice. You can just mark the invoice VOID if you would like to remove it from reporting. </p></div>',
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

         function deleteInvoicePost() {
                 $.blockUI({
                         message: 'Deleting the invoice.',
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
                 $.post("controllers/invoicesGridCB.php", {
                         mode: "delete",
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
 //----------------Void invoice----------------------------
 //--------------------------------------------------------------
 function voidInvoice(e) {
         var invoiceNumber = $(e).closest('tr').find('.invoiceNumber').text();
         $.fallr('show', {
				 icon: 'error',
                 useOverlay: true,
                 position: 'center',
                 closeKey: true,
                 width: '360px',
                 content: '<div id="fallrHeadline"><p>Are you sure you would like to VOID this invoice?</p></div>',
                 buttons: {
                         button1: {
                                 text: 'Void',
                                 danger: false,
                                 onclick: function () {
                                         voidInvoicePost();
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
		
         function voidInvoicePost() {
                 $.blockUI({
                         message: 'Updating the invoice\'s status.',
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
                 $.post("controllers/invoicesGridCB.php", {
                         mode: "void",
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
 //------------------------------------------------------------------------------------------
 //----------------Print Invoice Function is now in the master.js----------------------------
 //------------------------------------------------------------------------------------------
 //--------------------------------------------------------------
 //----------------Create PDF Invoice----------------------------
 //--------------------------------------------------------------
 function pdfInvoice(e) {
         var template = $(e).closest('tr').find('.template').text();
         var invoiceNumber = $(e).closest('tr').find('.invoiceNumber').text();
         

         //TODO
         //CHANGED TO ALLOW EMAILED TEMPLATE TO USE THE PDF_Invoice!
         //WE WILL NEED TO FIX THIS LATER.
         mywindow = window.open('/print/invoiceTemplates/PDF_invoice.php?invoiceNumber=' + invoiceNumber + '&mode=PDF', 'mywindow', 'location=0, Status=0, toolbar=0, menubar=0, directories=0, width=960,height=800');

         //mywindow = window.open('' + template + '?invoiceNumber=' + invoiceNumber + '&mode=PDF', 'mywindow', 'location=0, Status=0, toolbar=0, menubar=0, directories=0, width=960,height=800');
         mywindow.moveTo(0, 0);
         mywindow.focus();


 }
 //--------------------------------------------------------------
 //----------------Email Invoice----------------------------
 //--------------------------------------------------------------
 function emailInvoice(e) {
         //window.open(URL,name,specs,replace)
         var invoiceNumber = $(e).closest('tr').find('.invoiceNumber').text();
         var template = $(e).closest('tr').find('.template').text();
         var automaticMail = $(e).closest('tr').find('.automaticMail').text();
         if(automaticMail == '0'){
            $.fallr('show', {
                 icon: 'error', 
                 useOverlay: true,
                 position: 'center',
                 closeKey: true,
                 width: '360px',
                 buttons: {},
                 content: '<div id="fallrHeadline"><p>Invoice Noification</p></div><div id="fallrContent"><p>We are sorry but automatic email notifications for invoices have been disabled. If you would like to enable them please go to Setup > Automatic Emails > Invoice Notifications</p></div>',
                 buttons: {
                    button4: {
                        text: 'Cancel'
                    }
                }
             });
    		//This function will help us make customize fallr
    		fallrCustom();
         }else{
             $.fallr('show', {
    				 height: '54px',
                     useOverlay: false,
                     buttons: {},
                     content: '<div id="fallrHeadline" class="headlineOnly"><p>Invoice has been emailed to the client. </p></div>' + '<iframe width="0" height="0" src="/print/invoiceTemplates/PDF_invoice.php?invoiceNumber=' + invoiceNumber + '&mode=email" frameborder="0"></iframe>',

                     //TODO
                     //CHANGED TO ALLOW EMAILED TEMPLATE TO USE THE PDF_Invoice!
                     //WE WILL NEED TO FIX THIS LATER.
         
                     //content: '<div id="fallrHeadline" class="headlineOnly"><p>Invoice has been emailed to the client. </p></div>' + '<iframe width="0" height="0" src="' + template + '?invoiceNumber=' + invoiceNumber + '&mode=email" frameborder="0"></iframe>',
                     autoclose: 2000
             });
    		//This function will help us make customize fallr
    		fallrCustom();
        }
 }
 //--------------------------------------------------------------
 //----------------Record Payment----------------------------
 //--------------------------------------------------------------
 function recordPayment(e) {
         var template = $(e).closest('tr').find('.template').text();
         var invoiceNumber = $(e).closest('tr').find('.invoiceNumber').text();
		 $(".triggerHREF").attr('href',"invoicePayment.php/invID="+invoiceNumber+"");
		 $(".triggerHREF").trigger('click');
 }
 //--------------------------------------------------------------
 //----------------Edit invoice Payment----------------------------
 //--------------------------------------------------------------
 function editInvoice(e) {
         var invoiceNumber = $(e).closest('tr').find('.invoiceNumber').text();
		 $(".triggerHREF").attr('href',"invoices.php/"+invoiceNumber+"");
		 $(".triggerHREF").trigger('click');
 }