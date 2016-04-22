 //--------------------------------------------------------------
 //----------------Edit Action-----------------------------------
 //--------------------------------------------------------------
 function expenseEditAction(e) {
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
         var expenseBeingEditedID = $(e).closest('tr').find('.expenseID').text();
         var editCategoryID = $(e).closest('tr').find('.categoryID').text();

         $.post("controllers/expenseCB.php", {
                 mode: "populateEditExpenseForm",
                 expenseBeingEditedID: expenseBeingEditedID,
                 editCategoryID: editCategoryID
             },

             function(editExpenseData) {
                $.unblockUI();
                 var editExpenseForm = $.parseJSON(editExpenseData);
                 $.fallr('show', {
                     position: 'center',
                     width: '550px',
                     icon: 'gear',
                     buttons: {
                         button1: {
                             text: 'Save',
                             onclick: editExpense
                         },
                         button2: {
                             text: 'Cancel'
                         }
                     },
                     content: '<div id="fallrHeadline"><h5>Edit Expense</h5></div><div id="fallrContent"><form id="editExpense"><fieldset><ul><li><label for="editDate" class="mediumRed">Expense Date:</label><div class="dateWrapper"><input name="editDate" id="editDate" class="date" type="text" value="' + editExpenseForm[0][1] + '"/></div></li><li><label for="editExpenseCategorySelect" class="mediumRed">Expense Category:</label><select name="editExpenseCategorySelect" id="editExpenseCategorySelect" onchange="expenseSelected(this)"></select></li><li><label for="editExpenseType" class="mediumRed">Expense Type:</label><select name="editExpenseType" id="editExpenseType" onchange="expenseType(this)"><option>Select</option></select></li><li><label for="editQty" class="mediumRed">QTY:</label><input id="editQty" name="editQty" value="' + editExpenseForm[0][5] + '" onkeydown="javascript:return displayKeyCode(this.id,event)"/></li><li><label for="editAmount" class="mediumRed">Rate:</label><input id="editAmount" name="editAmount" class="currency" value="$' + editExpenseForm[0][6] + '" onkeydown="javascript:return displayKeyCode(this.id,event)" /></li><li><label for="editTotal">Total:</label><input id="editTotal" name="editTotal" class="currency" readonly="readonly" value="$' + editExpenseForm[0][7] + '" /></li><li><label for="editJob">Bill to project #: </label><div class="autoCompleteWrapper"><input id="editJob" name="editJob" value="' + editExpenseForm[0][4] + '" /></div></li><li><label for="editNotes">Notes: </label><textarea id="editNotes" name="editNotes">' + editExpenseForm[0][9] + '</textarea></li></ul></fieldset></form></div>',
                 }, function() {
                     for (var i = 0; i < editExpenseForm[1].length; i++) {
                         $('#editExpenseCategorySelect').append('<option value="' + editExpenseForm[1][i].expenseCatID + '">' + editExpenseForm[1][i].expenseCatName + '</option>');
                     }
                     for (var i = 0; i < editExpenseForm[2].length; i++) {
                         $('#editExpenseType').append('<option value="' + editExpenseForm[2][i].expenseTypeID + '">' + editExpenseForm[2][i].expenseTypeName + '</option>')
                     }
                     $('#editExpenseCategorySelect>option[value="' + editExpenseForm[0][2] + '"]').attr('selected', 'selected');
                     $('#editExpenseType>option[value="' + editExpenseForm[0][3] + '"]').attr('selected', 'selected');
                     $('#editQty,#editAmount').bind('blur', function() {
                         edittotal();
                     });
                 });
                 //This will help us make customize fallr functions
                 fallrCustom();
             });

         function editExpense() {
             $.blockUI({
                 message: 'Updating Expense Information',
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
             $.post("controllers/expenseCB.php", {
                     mode: "editExpense",
                     expenseBeingEditedID: expenseBeingEditedID,
                     editDate: $('#editDate').val(),
                     editExpenseCategory: $('#editExpenseCategorySelect').val(),
                     editExpenseType: $('#editExpenseType').val(),
                     editQuantity: $('#editQty').val(),
                     editAmount: $('#editAmount').val(),
                     editTotal: $('#editTotal').val(),
                     editJobNumber: $('#editJob').val(),
                     editNotes: $('#editNotes').val()
                 },

                 function(list) {
                     $("#message").html(list);
                     /*-------------------add for udate right side grid---------------*/
                     ctSubmitForm('ct', "1", false, "items_per_page,tbody,pager")
                     $.unblockUI();
                 });
             return false;
         }
     } //End edit action
     //--------------------------------------------------------------
     //----------------Delete Action----------------------------
     //--------------------------------------------------------------

 function expenseDeleteAction(e) {

         var expenseBeingDeletedID = $(e).closest('tr').find('.expenseID').text();
         $.fallr('show', {
             buttons: {
                 button1: {
                     text: 'Delete',
                     onclick: deleteExpense
                 },
                 button2: {
                     text: 'Cancel'
                 }
             },
             content: '<div id="fallrHeadline"><p>Are you absolutely sure you would like to DELETE this expense?</p></div><div id="fallrContent"><span class="mediumRed">We suggest editing the expense data instead!</span><form id="deleteExpense"><input type="hidden" id="expenseDelete" value="' + expenseBeingDeletedID + '" /' + '></form></div>',
             icon: 'error',
             useOverlay: true,
             position: 'center'
         });
         //This will help us make customize fallr functions
         fallrCustom();

         function deleteExpense() {
             $.blockUI({
                 message: 'Deleting Expense',
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
             $.post("controllers/expenseCB.php", {
                     mode: "deleteExpense",
                     expenseBeingDeletedID: expenseBeingDeletedID
                 },

                 function(list) {
                     $("#message").html(list);
                     /*-------------------add for udate right side grid---------------*/
                     ctSubmitForm('ct', "1", false, "items_per_page,tbody,pager")
                     $.unblockUI();
                 });
             return false;
         }
     } //edn delete action

 function expenseSelected(e) {
     var id = $(e).attr("id"); //get the elements id

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
     if (id == "expenseCategorySelect") { //do the add or edit form logic
         $.post("controllers/expenseCB.php", {
                 mode: "expenseSelect",
                 expenseCategorySelect: $('#expenseCategorySelect').val()
             },

             function(list) {
                 $("#expenseType").html(list);
                 $.unblockUI()
             });
     } else {
         $.post("controllers/expenseCB.php", {
                 mode: "expenseSelect",
                 expenseCategorySelect: $('#editExpenseCategorySelect').val()
             },

             function(list) {
                 $("#editExpenseType").html(list);
                 $.unblockUI()
             });
     } //end logic
     return false;
 }

 function expenseType(e) {
     var id = $(e).attr("id"); //get the elements id
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
     if (id == "editExpenseType") {
         $.post("controllers/expenseCB.php", {
                 mode: "selectType",
                 expenseType: $('#editExpenseType').val()
             },

                function(list) {
                 $("#editAmount").val(list);
                 $('#editQty').focus();
                 edittotal();
                 $.unblockUI()
             });
     } else {
         $.post("controllers/expenseCB.php", {
                 mode: "selectType",
                 expenseType: $('#expenseType').val()
             },

                function(list) {
                 list = list.replace(/ /g, '');
                 $("#amount").val(list);
                 $('#qty').focus();
                 total();
                 $.unblockUI()
             });
     }
     return false;
 }

 function total() {
     var qty = $('#qty').val();
     var rate = $('#amount').val();
     qty = Number(qty.replace(/[^0-9\.]+/g, ""));
     rate = Number(rate.replace(/[^0-9\.]+/g, ""));
     var total = rate * qty;
     $('#total').val(total);
     $('.currency').formatCurrency();
 }

 function edittotal() {
         var editqty = $('#editQty').val();
         var editrate = $('#editAmount').val();
         editqty = Number(editqty.replace(/[^0-9\.]+/g, ""));
         editrate = Number(editrate.replace(/[^0-9\.]+/g, ""));
         var edittotal = editrate * editqty;
         $('#editTotal').val(edittotal);
         $('.currency').formatCurrency();
     }
     //-------------------------------------------------------
     //----------------AUTO COMPLETE--------------------------
     //-------------------------------------------------------
 $("#job, #editJob").live('keyup', function(e) {
     $(this).autocomplete({
         source: "autoComplete/jobsAutoComplete.php",
         minLength: 2
     });
 });
 $('#job').bind('blur', function() {
     var jobLength = $('#job').val().length;
     if (jobLength > 0) {
         $('#status').val('2');
     } else {
         $('#status').val('1');
     }
 });
