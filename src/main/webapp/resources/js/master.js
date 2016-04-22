/******************************************************************
GLOBAL stop user from refreshing page once a change is made.
******************************************************************/
function setConfirmUnload(on) {
    window.onbeforeunload = (on) ? unloadMessage : null;
}

function unloadMessage() {
    return 'If you navigate away from this page without first saving/submitting your data, the changes will be lost.';
}

function setPreventRefresh() {
    $('input').bind("change", function() {
        setConfirmUnload(true);
    }); // Prevent accidental navigation away
}


/******************************************************************
GLOBAL COMBO BOX CODE
******************************************************************/
$.widget('ui.combobox', $.ui.autocomplete, {
    options: {
        minLength: 2,
        ajaxGetAll: {
            get: 'all'
        }
    },

    _create: function() {
        if (this.element.is('SELECT')) {
            this._selectInit();
            return;
        }

        $.ui.autocomplete.prototype._create.call(this);
        var input = this.element;
        var wrapper = wrapper = this.wrapper = $("<span>").addClass("ui-combobox").insertAfter(this.element);

        input.appendTo(wrapper).addClass("ui-state-default ui-combobox-input");

        this.button = $('<button type="button">&nbsp;</button>')
            .appendTo(wrapper)
            .removeClass("ui-corner-all ui-button ui-widget ui-state-default ui-button-text-only")
            .addClass("squareBlueButton downArrow")
            .attr('tabIndex', -1)
            .attr('title', 'Show All Items')
            .insertAfter(input)
            .button({
                icons: {
                    primary: 'ui-icon-triangle-1-s'
                },
                text: false
            })
            .removeClass('ui-corner-all')
            .addClass('ui-corner-right ui-button-icon')
            .click(function(event) {
                // On mouseout checks if the combobox should be closed
                if (input.combobox('widget').is(':visible')) {
                    input.combobox('close');
                    return;
                }
                var data = input.data('combobox');
                clearTimeout(data.closing);
                // Create the width
                var newComboboxWidth = $(this).siblings('input').innerWidth();
                input.combobox('widget').css('width', newComboboxWidth);
                if (!input.isFullMenu) {
                    data._swapMenu();
                    input.isFullMenu = true;
                }
                input.combobox('widget')
                    .css('display', 'block')
                    .position($.extend({
                            of: input
                        },
                        data.options.position
                    ));
                input.focus();
                data._trigger('open');
            });

        $(document).queue(function() {
            var data = input.data('combobox');
            if ($.isArray(data.options.source)) {
                $.ui.combobox.prototype._renderFullMenu.call(data, data.options.source);
            } else if (typeof data.options.source === 'string') {
                $.getJSON(data.options.source, data.options.ajaxGetAll, function(source) {
                    $.ui.combobox.prototype._renderFullMenu.call(data, source);
                });
            } else {
                $.ui.combobox.prototype._renderFullMenu.call(data, data.source());
            }
        });
    },

    _renderFullMenu: function(source) {
        var self = this,
            input = this.element,
            ul = input.data('combobox').menu.element,
            lis = [];
        source = this._normalize(source);
        input.data('combobox').menuAll = input.data('combobox').menu.element.clone(true).appendTo('body');
        for (var i = 0; i < source.length; i++) {
            lis[i] = '<li class="ui-menu-item" role="menuitem"><a class="ui-corner-all" tabindex="-1">' + source[i].label + '</a></li>';
        }
        ul.append(lis.join(''));
        this._resizeMenu();
        setTimeout(function() {
            self._setupMenuItem.call(self, ul.children('li'), source);
        }, 0);
        input.isFullMenu = true;
    },

    _setupMenuItem: function(items, source) {
        var self = this,
            itemsChunk = items.splice(0, 500),
            sourceChunk = source.splice(0, 500);
        for (var i = 0; i < itemsChunk.length; i++) {
            $(itemsChunk[i])
                .data('item.autocomplete', sourceChunk[i])
                .mouseenter(function(event) {
                    self.menu.activate(event, $(this));
                })
                .mouseleave(function() {
                    self.menu.deactivate();
                });
        }
        if (items.length > 0) {
            setTimeout(function() {
                self._setupMenuItem.call(self, items, source);
            }, 0);
        } else {
            $(document).dequeue();
        }
    },

    _renderItem: function(ul, item) {
        var label = item.label.replace(new RegExp(
            '(?![^&;]+;)(?!<[^<>]*)(' + $.ui.autocomplete.escapeRegex(this.term) +
            ')(?![^<>]*>)(?![^&;]+;)', 'gi'), '<strong>$1</strong>');
        return $('<li></li>')
            .data('item.autocomplete', item)
            .append('<a>' + label + '</a>')
            .appendTo(ul);
    },

    destroy: function() {
        if (this.element.is('SELECT')) {
            this.input.remove();
            this.element.removeData().show();
            return;
        }
        $.ui.autocomplete.prototype.destroy.call(this);
        this.element.removeClass('ui-widget ui-widget-content ui-corner-left');
        this.button.remove();
    },

    search: function(value, event) {
        var input = this.element;
        if (input.isFullMenu) {
            this._swapMenu();
            input.isFullMenu = false;
        }
        $.ui.autocomplete.prototype.search.call(this, value, event);
    },

    _change: function(event) {
        abc = this;
        if (!this.selectedItem) {
            var matcher = new RegExp('^' + $.ui.autocomplete.escapeRegex(this.element.val()) + '$', 'i'),
                match = $.grep(this.options.source, function(value) {
                    return matcher.test(value.label);
                });
            if (match.length) {
                match[0].option.selected = true;
            } else {
                this.element.val('');
                if (this.options.selectElement) {
                    this.options.selectElement.val('');
                }
            }
        }
        $.ui.autocomplete.prototype._change.call(this, event);
    },

    _swapMenu: function() {
        var input = this.element,
            data = input.data('combobox'),
            tmp = data.menuAll;
        data.menuAll = data.menu.element.hide();
        data.menu.element = tmp;
    },

    _selectInit: function() {
        var select = this.element.hide(),
            selected = select.children(':selected'),
            value = selected.val() ? selected.text() : '';
        this.options.source = select.children('option[value!=""]').map(function() {
            return {
                label: $.trim(this.text),
                option: this
            };
        }).toArray();
        var userSelectCallback = this.options.select;
        var userSelectedCallback = this.options.selected;
        this.options.select = function(event, ui) {
            ui.item.option.selected = true;
            if (userSelectCallback) userSelectCallback(event, ui);
            if (userSelectedCallback) userSelectedCallback(event, ui);
        };
        this.options.selectElement = select;
        this.input = $('<input>').insertAfter(select)
            .val(value).combobox(this.options);
    }
});
// $.widget("ui.combobox", {
//     _create: function () {
//         var input, self = this,
//             select = this.element.hide(),
//             selected = select.children(":selected"),
//             value = selected.val() ? selected.text() : "",
//             wrapper = this.wrapper = $("<span>").addClass("ui-combobox").insertAfter(select);
//         input = this.input =$("<input>").appendTo(wrapper).val(value).addClass("ui-state-default ui-combobox-input").autocomplete({
//             delay: 0,
//             minLength: 0,
//             source: function (request, response) {
//                 var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
//                 response(select.children("option").map(function () {
//                     var text = $(this).text();
//                     if (this.value && (!request.term || matcher.test(text))) {
//                         return {
//                             label: text.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(request.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>"),
//                             value: text,
//                             option: this
//                         }
//                     }
//                 }))
//             },
//             select: function (event, ui) {
//                 ui.item.option.selected = true;
//                 self._trigger("selected", event, {
//                     item: ui.item.option
//                 })
//             },
//             change: function (event, ui) {
//                 if (!ui.item) {
//                     var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex($(this).val()) + "$", "i"),
//                         valid = false;
//                     select.children("option").each(function () {
//                         if ($(this).text().match(matcher)) {
//                             this.selected = valid = true;
//                             return false
//                         }
//                     });
//                     if (!valid) {
//                         $(this).val("");
//                         select.val("");
//                         input.data("autocomplete").term = "";
//                         return false
//                     }
//                 }
//             }
//         }).addClass("ui-widget ui-widget-content ui-corner-left");
//         input.data("autocomplete")._renderItem = function (ul, item) {
//             return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.label + "</a>").appendTo(ul)
//         };
//         $("<button>").appendTo(wrapper).removeClass("ui-corner-all ui-button ui-widget ui-state-default ui-button-text-only").addClass("squareBlueButton downArrow").click(function (e) {
//             e.preventDefault();
//             if (input.autocomplete("widget").is(":visible")) {
//                 input.autocomplete("close");
//                 return
//             }
//             $(this).blur();
//             input.autocomplete("search", "");
//             input.focus()
//         })
//     },
//     destroy: function () {
//         this.wrapper.remove();
//         this.element.show();
//         $.Widget.prototype.destroy.call(this);
//     } ,
//     autocomplete : function(value) {
//         this.element.val(value);
//         this.input.val(value);
//     }
// });


/******************************************************************
 GLOBAL Datepicker
******************************************************************/
$(".date").live('focus', function() {
    if ($(this).hasClass('requiredDate')) {
        $(this).datepicker({
            dateFormat: "M dd, yy",
            onClose: function() {
                var thisID = $(this).attr('id');
                $(this).valid();

                //Remove li in message
                $('#message').find('li[for=' + thisID + ']').remove();

                //Remove error message when there is no more
                if (!$('#message .messageCentered li').length) {
                    $('#message .errors').remove();
                }

                //Removing any tab errors when there's no more in content
                var getTab = $('#' + thisID).closest('.tabContent').attr('id');
                if (!$('#' + getTab + '.tabContent .error').length) {
                    $('#' + getTab + 'Link').removeClass('tabError');
                }
            }
        });
    } else {
        $(this).datepicker({
            dateFormat: "M dd, yy"
        });
    }
});


/******************************************************************
 Multiselect Function
******************************************************************/
function multiselectFunction() {
    // Create the width
    $('button.ui-multiselect.ui-widget').on('click', function() {
        var newComboboxWidth = $(this).innerWidth();
        $('.ui-multiselect-menu.ui-widget').css('width', newComboboxWidth);
    });
}


/******************************************************************
 DATE FILTER functionality for grids.
 please note that we need to make sure we are not using to and from id's anywere but in date filters.
******************************************************************/
var fromDate;
$("#from").live("focus", function() {
    var tableID = $(".creativetbl_container").find("table").attr("id");
    fromDate = "";
    $(this).datepicker({
        dateFormat: "M dd, yy"
    }).change(function() {
        fromDate = $("#from").datepicker("getDate");
        $("#to").datepicker("destroy");
        ctSubmitForm(tableID, "1", false, "items_per_page,tbody,pager");
    }).focus(function() {
        $(this).val("")
    })
});
$("#to").live("focus", function() {
    var tableID = $(".creativetbl_container").find("table").attr("id");
    $(this).datepicker({
        dateFormat: "M dd, yy",
        "minDate": fromDate,
        "defaultDate": fromDate,
    }).change(function() {
        ctSubmitForm(tableID, "1", false, "items_per_page,tbody,pager");
    }).focus(function() {
        $(this).val("")
    })
});
$(".clearSelection").live("click", function() {
    var tableID = $(".creativetbl_container").find("table").attr("id");
    $("#to,#from").val("").datepicker("destroy");
    fromDate = "";

    ctSubmitForm(tableID, "1", false, "items_per_page,tbody,pager")
});


/******************************************************************
 Menu Dropdown Functions
******************************************************************/
var $currentMenu;

function dropDownMenu(element) {
    var subMenu = [0];
    var links = [0];
    var href;
    $(element).children("li").each(function(i, e) {
        $(e).hoverIntent(function() {
            $(this).children("div").stop().show();//.slideDown(300, "easeInOutQuart");
            $currentMenu = $(this).children("div");
        }, function() {
            $(this).children("div").stop().hide();//.slideUp(300, "easeInOutQuart");
        })
    })
};


/******************************************************************
 Address/Path function to load pages
******************************************************************/

var i_ChangePage = 0;
var modeInvoice = '';
var modeTime = '';
var emailMode = '';
var invoiceMode = '';
var newclientName = '';
var clientName = '';
//content loaded gives you the ability to check to see if the content is loaded before you run more scripts.
var contentLoaded;
//var currPath;

function changePage(path, projectModeActiveLink) {
    //console.log('path', path);
    contentLoaded = false;
    currPath = path;
    $('#loading').show();
    if ($currentMenu) $currentMenu.stop().hide();//.slideUp(100, "easeInOutQuart");
    // Temporary code to move the message div outside the fullWrapper div
    $('#message.tempDiv').remove();
    if (path == '' && i_ChangePage == 0) {
        $('#ajaxContent').hide(10, function() {

            $('#ajaxContent').load('dashboardContent.php', function() {
                contentLoaded = true;
                $('#ajaxContent').show(10, function() {
                    $('#loading').hide();

                    $('#fullWrapper').show();
                    $('#quickSearchWrapper').show();
                    if ($(".dash3").val() == 'on') companyOverview();
                    if ($(".dash4").val() == 'on') invoiceTotalsByMonth();
                    if ($(".rove_version").val() != "unlimited") guageLimits();
                });
            });
        });

        i_ChangePage++;
        return false;
    } else if (path == '' && i_ChangePage > 0) {
        window.location.reload('dashboard.php');
        $('#wrapper').addClass('dashboardBg');
    } else {
        $('#contentWrapper').empty();
        $('#ajaxContent').hide(10, function() {

            $('#ajaxContent').load(path, function() {
                contentLoaded = true;
                $('#wrapper').removeClass('dashboardBg');
                $('.subMenu li a, #firstLinks li a').removeClass('activeLink'); //remove current active state to the sidebar link
                console.log('mode', mode);
                //SETTING THE ACTIVE LINK
                if (mode != "estimate") {
                    if (modeInvoice == "invoice") {
                        $('.subMenu li a[href=\"invoicePayment.php\"], #firstLinks li a[href=\"invoicePayment.php\"]').addClass('activeLink'); //adds active state to the sidebar link\
                        modeInvoice = "";
                    } else if (modeTime == "timeDetail") {
                        $('.subMenu li a[href=\"outstandingBillableTimeDetail.php\"], #firstLinks li a[href=\"outstandingBillableTimeDetail.php\"]').addClass('activeLink'); //adds active state to the sidebar link\
                        modeTime = "";
                    } else if (emailMode == 'mail') {
                        $('.subMenu li a[href="automaticEmails.php"], #firstLinks li a[href="automaticEmails.php"]').addClass('activeLink'); //adds active state to the sidebar link
                        emailMode = "";
                    } else if (invoiceMode == 'invoice') {
                        $('.subMenu li a[href="invoices.php"], #firstLinks li a[href="invoices.php"]').addClass('activeLink'); //adds active state to the sidebar link
                        invoiceMode = "";
                    } else if (projectModeActiveLink) {
                        //console.log('New project clicked.');
                        $('.newProject').addClass('activeLink'); //adds active state to the sidebar link
                        //this is used to set the correct path so the page can be refreshed. 
                        window.location.hash = '/projectSetup.php';
                    } else {
                        $('.subMenu li a[href="' + path + '"], #firstLinks li a[href="' + path + '"]').addClass('activeLink'); //adds active state to the sidebar link
                    }

                } else {
                    $('.subMenu li a[href="estimate.php"], #firstLinks li a[href="estimate.php"]').addClass('activeLink'); //adds active state to the sidebar link
                    window.history.pushState("", "", '#/estimate.php');
                    mode = "";
                }
                $('#ajaxContent').show(10, function() {
                    $('#loading').hide();
                    $('#fullWrapper').show();
                    $('#quickSearchWrapper').show();
                });
                return false;
            });
        });
    }
}

$(document).ready(function() {

    //Making the unloadMessage false on reset or dashboard link is click
    $('button[type=reset], #dashboardLink').live('click', function() {
        setConfirmUnload(false);
    });


    /******************************************************************
 Quick Search
******************************************************************/
    /*--------- added by Foramkumar For reset project search ------------*/
    $('.clearSelectiondashboard').live('click', function() {
        refreshQuickSearch();
    });

    // Loading Quick Search
    $("#quickSearch").load("quickSearch.php", function() {
        if (!$('#quickSearch .ui-tabs').length) {
            $('#quickSearch').html('<div class="sorry-quick">We are sorry, but you do not have access to quick search.</div>');
        }
    });

    // Loading Quick Jobs from the Project Grid link on the Dashboard
    $('.dashboardProjectGridLink, .mapQuickJob').live('click', function() {
        quickJob(this);
        if (!$('#quickSearchWrapper').is('.mini, .large')) {
            openQuickSearch();
        }
    });

    // Loading Quick client from the Client Grid link on the Dashboard
    $('.clientQuickJob').live('click', function() {
        quickclient(this);
        if (!$('#quickSearchWrapper').is('.mini, .large')) {
            openQuickSearch();
        }
    });
    $('.quickSearch, #closeQuickButton').bind('click', function() {
        openQuickSearch();
    });
    $('#largeSearchButton, #miniSearchButton').bind('click', function() {
        changeQuickWidth();
    });

});


/******************************************************************
 Quick Search
******************************************************************/
$(window).resize(function() {

    bodyWidth = $('body').width();

    updateQuickSearchHeight();

    // On a break point the quick search will automatically change to a mini or large version
    if ((bodyWidth < '1070') && $('#fullWrapper').hasClass('fixedPage') && !$('#fullWrapper').hasClass('onlyLarge') && !$('#fullWrapper').hasClass('large')) {

        // Changes to large
        $('#fullWrapper, #quickSearchWrapper').addClass('mini').addClass('onlyLarge');
        changeQuickWidth();

    } else if ((bodyWidth > '1070') && $('#fullWrapper').hasClass('fixedPage') && $('#fullWrapper').hasClass('onlyLarge')) {

        // Changes to mini
        $('#fullWrapper, #quickSearchWrapper').addClass('large').removeClass('onlyLarge');
        changeQuickWidth();
    }

});

// Opens up the quick search sidebar
function openQuickSearch() {

    bodyWidth = $('body').width();

    if (!$('#fullWrapper').hasClass('fixedPage')) {

        // This part shows the quick search
        $('#quickSearchWrapper').show();

        $('#fullWrapper').addClass('fixedPage');

        if ((bodyWidth < '1070')) {
            $('#fullWrapper, #quickSearchWrapper').addClass('mini');
        }

        changeQuickWidth();
        quickActiveState();

    } else {

        // This part hides the quick search
        var getLeft = $('.fixedPage').css('left');
        if (getLeft === '0px') {
            var animateLeft = 0;
        } else {
            var animateLeft = bodyWidth - 70 + 'px';
            animateLeft = '-' + animateLeft;
        }

        $('.fixedPage').css('left', animateLeft);
        $('.fixedPage').css({
            left: '0',
            width: '100%'
        });
        $('#fullWrapper').removeClass('fixedPage');
        $('#quickSearchWrapper').hide();
        $('#quickSearchWrapper, #fullWrapper').removeClass('mini').removeClass('large').css('overflow', '');
        quickActiveState();

        $('#fullWrapper, #quickSearchWrapper').removeClass('onlyLarge');
        $('#tlyPageGuideWrapper').show();

    }

    updateQuickSearchHeight();

}

// Changes the width of the quick search
function changeQuickWidth() {

    if (!$('#quickSearchWrapper').hasClass('mini')) {

        // This part makes the quick search go to mini mode
        $('#largeSearchButton').show();
        $('#miniSearchButton').hide();

        if ($('#quickSearchWrapper').hasClass('large')) {

            // This part hides the quick search
            var animateLeft = bodyWidth - 70 + 'px';
            $('.fixedPage').css('left', '-' + animateLeft);

            // Changing from large to mini
            $('.fixedPage').css({
                width: '75%'
            }, 100);

            $('.fixedPage').css({
                left: '0'
            });

            updateQuickSearchHeight();
            $('#tlyPageGuideWrapper').show();
            if ($('#mapQS').length && $('#mapQS').html().length > 0) {
                $('#mapQS').empty();
                initializeMap();
            }
        } else {

            // Changing to mini
            $('.fixedPage').css({
                width: '75%',
                left: '0'
            });

            updateQuickSearchHeight();
            if ($('#mapQS').length && $('#mapQS').html().length > 0) {
                $('#mapQS').empty();
                initializeMap();
            }
        }
        if (!$('#fullWrapper').hasClass('onlyLarge')) {
            $('#quickSearchWrapper, #fullWrapper').addClass('mini').removeClass('large');
        }

    } else {

        // This part makes the quick search go to large mode
        var getQuickWidth = $('#quickSearchWrapper').width();
        $('#largeSearchButton').hide();
        $('#miniSearchButton').show();
        $('#quickSearchWrapper, #fullWrapper').addClass('large').removeClass('mini');
        $('#fullWrapper.large .row, #fullWrapper.large #mainMenu').css('float', 'none');

        var animateLeft = bodyWidth - 70 - getQuickWidth + 'px';

        $('.fixedPage').css({
            left: '-' + animateLeft
        });


        $('.fixedPage').css({
            left: '-95%',
            width: '100%'
        });
        updateQuickSearchHeight();
        $('#tlyPageGuideWrapper').hide();
        if ($('#mapQS').length && $('#mapQS').html().length > 0) {
            $('#mapQS').empty();
            initializeMap();
        }

    }

}

// Adds an active class on the quick search button
function quickActiveState() {

    setTimeout(function() {

        if (!$('#fullWrapper').hasClass('fixedPage')) {
            $('#favoriteLinks .floatRight').removeClass('activeLink');
        } else {
            $('#favoriteLinks .floatRight').addClass('activeLink');
        }

    }, 100);

};

// This is to make sure the scrolling for the quick search always works by getting a updated height
function updateQuickSearchHeight() {

    // The variable changes based on which quick search nav is shown
    if ($('#quickSearchNavV1').is(':visible')) {
        var quickSearchNav = '#quickSearchNavV1';
    } else {
        var quickSearchNav = '#quickSearchNavV2';
    }

    var quickSearchHeight = $('#quickSearchWrapper').height();
    var quickTitleHeight = $('#quickSearchTitle').height();
    var quickNavHeight = $(quickSearchNav).height();
    var quickMiniContentHeight = quickSearchHeight - quickTitleHeight - quickNavHeight - 20;
    var quickLargeContentHeight = quickSearchHeight - quickTitleHeight - quickNavHeight - 25;

    $('.large .ui-tabs-panel').css('height', quickLargeContentHeight);
    $('.mini .ui-tabs-panel').css('height', quickMiniContentHeight);

};

// This function empties all contents from the Quick Search
function refreshQuickSearch() {
    $('#ajaxContentQS').css('opacity', 0).empty();
    $("#ajaxContentQS").load("quickSearch.php", function() {
        if (!$('#quickSearch .ui-tabs').length) {
            $('#quickSearch').html('<div class="sorry-quick">We are sorry, but you do not have access to quick search.</div>');
        }
    });
    $("#ajaxContentQS").css('opacity', 1);
    $(".ui-dialog-back").remove();
    $("#quickSearchTitle h3").replaceWith("<h3>Quick Search</h3>");
    setTimeout(function() {
        updateQuickSearchHeight();
    }, 250);

};


/******************************************************************
 Add Billing Attr Function
******************************************************************/
// This function adds attr for all td in billing items
function addBillingAttr() {

    $('#ct1 tr td:nth-child(2)').attr('data-header', 'Due Date:');
    $('#ct1 tr td:nth-child(3)').attr('data-header', 'Task Name:');
    $('#ct1 tr td:nth-child(4)').attr('data-header', 'Rate:');
    $('#ct2 tr td:nth-child(2)').attr('data-header', 'Date:');
    $('#ct2 tr td:nth-child(7)').attr('data-header', 'First:');
    $('#ct2 tr td:nth-child(8)').attr('data-header', 'Last:');
    $('#ct2 tr td:nth-child(9)').attr('data-header', 'Staff Rate:');
    $('#ct2 tr td:nth-child(11)').attr('data-header', 'Task Name:');
    $('#ct2 tr td:nth-child(12)').attr('data-header', 'Bill Option:');
    $('#ct2 tr td:nth-child(13)').attr('data-header', 'Rate:');
    $('#ct2 tr td:nth-child(16)').attr('data-header', 'Hourly Rate:');
    $('#ct2 tr td:nth-child(20)').attr('data-header', 'QTY:');
    $('#ct2 tr td:nth-child(21)').attr('data-header', 'Comments:');
    $('#ct3 tr td:nth-child(2)').attr('data-header', 'Date:');
    $('#ct3 tr td:nth-child(3)').attr('data-header', 'Expense Type:');
    $('#ct3 tr td:nth-child(4)').attr('data-header', 'QTY:');
    $('#ct3 tr td:nth-child(5)').attr('data-header', 'Rate:');
    $('#ct3 tr td:nth-child(6)').attr('data-header', 'Total:');
    $('#ct3 tr td:nth-child(7)').attr('data-header', 'Notes:');
    $('#ct3 tr td:nth-child(9)').attr('data-header', 'Expense ID:');

};


/******************************************************************
 Custom Fallr Function
******************************************************************/
function fallrCustom() {

    // Makes the headline icon vertically centered
    if ($('#fallrHeadline p').length) {
        var pHeight = $('#fallrHeadline p').height();
        var pHeightFinal = String(pHeight + 30);
        $('#fallr-icon').css('height', pHeightFinal);
    } else {
        var h5Height = $('#fallrHeadline h5').height();
        var h5HeightFinal = String(h5Height + 30);
        $('#fallr-icon').css('height', h5HeightFinal);
    };

    // This function will append the auto complete to Fallr
    $('.ui-autocomplete-input').autocomplete({
        appendTo: $('.ui-autocomplete-input').parent()
    });

}
$('#fallr .autoCompleteWrapper input').live('keydown', function() {
    $('.ui-autocomplete').insertAfter($('.ui-autocomplete-input'));
});


/******************************************************************
 jQuery Validation Function
******************************************************************/
//AddMethods Validation
function validateAddMethod(value, element) {
    //AddMethods for MultiSelect
    $.validator.addMethod('needSelection', function(value, element) {
        if ($(element).multiselect("selected").length > 0) {
            $('#' + element.id).next().removeClass('error');
        }
        return $(element).multiselect("selected").length > 0;
    });

    //AddMethods for Select
    $.validator.addMethod('noSelectText', function(value, element) {
        if ($('#' + element.id + ' option:selected').text() != 'Select') {
            $('#' + element.id).removeClass('error');
        }
        return $('#' + element.id + ' option:selected').text() != 'Select';
    });

}

// Errors Validation Function
function validateErrorsMessage(error, element) {
    //Removing any li errors in the message when valid
    $('#message').find('li[for=' + element[0].id + ']').remove();

    if ($('#' + element[0].id).attr('multiple') == 'multiple' && $('#' + element[0].id).hasClass('error')) {
        $('#' + element[0].id).next().addClass('error');
    }

    //Remove error message when there is no more
    if (!$('#message .errors').length) {
        error.appendTo('#message');
        $('#message li').wrap('<div class="errors"></div>').wrap('<div class="messageCentered"></div>');

        $('.info, .errors, .success').bind('click', function() {
            $(this).remove();
        });
    } else {
        error.appendTo('#message .messageCentered');
    }

    //Removing any tab errors when there's no more in content
    if ($('#contentWrapper .ui-tabs-nav').length) {
        var getTab = $('#' + element[0].id).closest('.tabContent').attr('id');
        $('#' + getTab + 'Link').addClass('tabError');
    }
}

// OnFocusOut Validation Function
function validateOnFocusOutMessage(element, event) {
    //    //Removing any li errors in the message when valid
    //    if ($(element).valid()) {
    //        $('#message').find('li[for=' + element.id + ']').remove();
    //    }
    //
    //    //Remove error message when there is no more
    //    if (!$('#message .messageCentered li').length) {
    //        $('#message .errors').remove();
    //    }
    //
    //    //Removing any tab errors when there's no more in content
    //    var getTab = $('#' + element.id).closest('.tabContent').attr('id');
    //    if (!$('#' + getTab + '.tabContent .error').length) {
    //        $('#' + getTab + 'Link').removeClass('tabError');
    //    }
}


/******************************************************************
 Confirmation messages
******************************************************************/
function closeMessage() {
    setTimeout(function() {
        $('.success').fadeOut(500);
    }, 3000);
    $('.info, .errors, .success').bind('click', function() {
        $(this).fadeOut(500);
    });
    setConfirmUnload(false);
};


/******************************************************************
 GLOBAL FORMAT CURRENCY ---JUST HAVE TO ADD CLASS currency
******************************************************************/
$('.currency').live('blur, focusin', function() {
    $('.currency').formatCurrency();
});


/******************************************************************
 Address event handlers
******************************************************************/
/*
$.address.init(function(event) {
    $('.subMenu a, #firstLinks a, #favoriteLinks a, a.triggerHREF, a.drop, .triggerThisLink').address(function() {
        if ($(this).attr('class') != 'quickSearch' && $(this).attr('class') != 'iframe' && $(this).attr('class') != 'iframe newCloseButton' && $(this).attr('class') != 'drop' && $(this).attr('class') != 'drop tabletSize' && $(this).attr('class') != 'noDeepLinking') {
            //--comment below line for prevent refresh
            //refreshQuickSearch();
            if ($(this).attr('href')) return $(this).attr('href').replace(location.pathname, '');
            else return;
        }
    });
    $('.subMenu a.activeLink, #firstLinks a.activeLink, #favoriteLinks a.activeLink').address(function() {
        console.log($.address.path());
        var path = $.address.path().replace('/', '');
        changePage(path);
    });

}).change(function(event) {
    var path = $.address.path().replace('/', '');
    changePage(path);
});
*/

/******************************************************************
 Quick Job Reference Function onclick the job number
******************************************************************/
function quickJob(obj) {
    var quickJobNumber = $(obj).text().replace('Project Details', '');
    var identification = $(obj).attr('class');
    $.ajax({
        type: "GET",
        url: "controllers/quickJobCB.php",
        data: {
            'quickJobNumber': quickJobNumber
        },
        success: function(server_response) {
            if (identification != undefined) {
                $("#quickJob").empty();
                $('#ajaxContentQS').empty().html(server_response);
            } else {
                $('#ajaxContentQS').empty();
                $("#quickJob").empty().html(server_response);
                var isQSopen = $('[aria-labelledby="ui-dialog-title-quickSearch"]').css('display');
                if (isQSopen = 'block') {
                    $('#quickSearch').dialog("close");
                }
            }
            $("#PStabs").tabs();
            var projectNo = $("#tabs-1").attr('projectNo');
            var projectNa = $("#tabs-1").attr('projectNa');
            var status = $('#tabs-1').attr('status');
            if (identification != undefined) {
                // Checking if the back button is already in the dialog area
                if ($('#quickSearchWrapper .ui-dialog-back').length) { // implies *not* zero
                } else {
                    $('#miniSearchButton').after("<div class=\"ui-dialog-back\"><span></span></div>");
                }
                // Removing the back button and restoring the first level information
                $(".ui-dialog-back").bind("click", function() {
                    refreshQuickSearch();
                    $('#quickSearchTitle h3, #quickSearchTitle .shortcutText').removeClass('secondLevel');
                });
            }
            setTimeout(function() {
                if (!$('#quickSearch .sorry-quick').length) {
                    var quickSearchTitle = "<h3>" + projectNo + " &mdash; " + projectNa + " &mdash; <span style=\'color:#1A99DA;\'>" + status + "</span></h3>";
                } else {
                    var quickSearchTitle = '<h3>Quick Search</h3>';
                    $('#quickSearch').html('<div class="sorry-quick">We are sorry, but you do not have access to quick search.</div>');
                }
                $("#quickSearchTitle h3").replaceWith(quickSearchTitle);
                $('#quickSearchTitle h3, #quickSearchTitle .shortcutText').addClass('secondLevel');
            }, 100);

            updateQuickSearchHeight();
            $('#searchLocationLink').click(function() {
                initializeMap();
            });
            $('.quickSearch, .expandButton, .halfCollapseButton').live('click', function() {
                initializeMap();
                //google.maps.event.trigger(map, "resize");
            });
        }
    });
}

function initializeMap() {
    var browserSupportFlag = new Boolean();
    var geocoder;
    var map;
    var marker;
    var jobMarker;
    var lat = parseFloat($('#mapQS').attr('lat'));
    var lng = parseFloat($('#mapQS').attr('lng'));
    var latlng = new google.maps.LatLng(lat, lng);
    var image = 'images/mapJobIcon.png';
    var myOptions = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        draggableCursor: 'crosshair'
    };
    //console.log(lat);
    if (lat != 0) {
        map = new google.maps.Map(document.getElementById("mapQS"), myOptions);
        // GEOCODER
        geocoder = new google.maps.Geocoder();
        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: image,
            draggable: true
        });
        jobMarker = new google.maps.Marker({
            map: map,
            draggable: true
        });
    }
}


/******************************************************************
 Quick Client Reference Function onclick the client name
******************************************************************/
function quickclient(obj) {
    var quickclientName = $(obj).text();
    var identification = $(obj).attr('class');
    $.ajax({
        type: "GET",
        url: "controllers/quickJobCB.php",
        data: {
            'quickclientName': quickclientName
        },
        success: function(server_response) {
            if (identification != undefined) {
                $("#quickJob").empty();
                $('#ajaxContentQS').empty().html(server_response);
            } else {
                $('#ajaxContentQS').empty();
                $("#quickJob").empty().html(server_response);
                var isQSopen = $('[aria-labelledby="ui-dialog-title-quickSearch"]').css('display');
                if (isQSopen = 'block') {
                    $('#quickSearch').dialog("close");
                }
            }
            $("#PStabs").tabs();
            var projectNo = $("#tabs-1").attr('projectNo');
            if (identification != undefined) {
                // Checking if the back button is already in the dialog area
                if ($('#quickSearchWrapper .ui-dialog-back').length) { // implies *not* zero
                } else {
                    $('#miniSearchButton').after("<div class=\"ui-dialog-back\"><span></span></div>");
                }
                // Removing the back button and restoring the first level information
                $(".ui-dialog-back").bind("click", function() {
                    refreshQuickSearch();
                    $('#quickSearchTitle h3, #quickSearchTitle .shortcutText').removeClass('secondLevel');
                });
            }
            setTimeout(function() {
                if (!$('#quickSearch .sorry-quick').length) {
                    var quickSearchTitle = "<h3>Client Name &mdash; " + projectNo + "</h3>";
                } else {
                    var quickSearchTitle = '<h3>Quick Search</h3>';
                    $('#quickSearch').html('<div class="sorry-quick">We are sorry, but you do not have access to quick search.</div>');
                }
                $("#quickSearchTitle h3").replaceWith(quickSearchTitle);
                $('#quickSearchTitle h3, #quickSearchTitle .shortcutText').addClass('secondLevel');
            }, 100);
            updateQuickSearchHeight();
        }
    });
}


/******************************************************************
 PageGuide
******************************************************************/
function pageGuide(v) {
    if (v == null || v == "") {
        v = ""
    }
    //alert(v);
    if ($.cookie('' + v + '') == null) {
        // Make sure we don't store a blank cookie
        if (v != "") {
            $.cookie('' + v + '', '' + v + '', {
                expires: 365
            });
            //alert('cookie added')
            $.fallr('show', {
                icon: 'info',
                content: '<div id="fallrHeadline"><p>It seems that this is your first time on this page.</p></div> <div id="fallrContent"><p>We have added a helpful guide for this page. It can be found in the lower left-hand corner of the page. <br /><br />You can click on this at anytime to take a guided tour! </p></div>',
                buttons: {
                    button1: {
                        text: 'Take Tour',
                        onclick: function() {
                            $('.tlypageguide_toggle').trigger('click');
                            $.fallr('hide');
                        }
                    },
                    button2: {
                        text: 'Skip Tour'
                    }
                },
                position: 'center',
                useOverlay: true
            });
        } else {
            //alert('no cookie added')
        }
    }
    // This function will help us make customize fallr
    fallrCustom();
    $('#tlyPageGuideWrapper, .pageGuideStyle').remove();
    $('.tlypageguide-open').removeClass();
    $('.tlypageguide_toggle, .tlypageguide_close,#tlyPageGuide > li, #tlyPageGuideMessages, a.tlypageguide_fwd, a.tlypageguide_back, .pageGuideStyle, body.tlypageguide-open, body.tlypageguide_close').unbind();
    // Start help tooltips
    tl.pg.init();
    //This will show the Page Guide link only if the Page Guide exist on the page
    if ($('#tlyPageGuideWrapper').length) {
        $('#tlypageguideCustomLink').removeClass('hide');
    }
    $('.tlypageguide_toggle').addClass('hide');
}


/******************************************************************
 Limiting Favorite Text on Smaller Screens
******************************************************************/
$(function() {
    $('.favoriteLink a').each(function() {
        var $elem = $(this); // The element or elements with the text to hide
        var $limit = 11; // The number of characters to show
        var $str = $elem.html(); // Getting the text
        var $strtemp = $str.substr(0, $limit); // Get the visible part of the string
        $str = $strtemp + '<span class="hideExtraText">' + $str.substr($limit, $str.length) + '</span><span class="hide">...</span>'; // Recompose the string with the span tag wrapped around the hidden part of it
        $elem.html($str); // Write the string to the DOM
    });
})


/******************************************************************
 Expand/Collaspse SidebarNav
******************************************************************/
function sidebarExpand() {
    $(".closeLink").bind("click", function(event) {
        contentWrap = $("#contentWrapper").attr("class");
        contentWrap = contentWrap.replace("ninecol last ", "");
        $(".closeLink").hide();
        if (contentWrap != "noContentSidebar") {
            $("#sidebarNav").addClass("collapse").removeClass("expand");
            //$("#sidebarNav").removeClass("expand");
            $("#contentWrapper").addClass("noContentSidebar");
            $("#sidebarNav").css({
                width: "5.05%"
            });
            $("#contentWrapper").css({
                width: "92.09%"
            });
            $(".closeLink").show()
        } else {
            $("#sidebarNav").removeClass("collapse").addClass("expand");
            // $("#sidebarNav").addClass("expand");
            $("#contentWrapper").removeClass("noContentSidebar");
            $("#sidebarNav").css({
                width: "22.05%"
            });
            $("#contentWrapper").css({
                width: "75.1%"
            });
            $(".closeLink").show()
        }
    })
};

function sidebarHide() {
    $("#sidebarNav .hideLink").bind("click", function(event) {
        $(".hideLink").hide();
        if (!$('#contentWrapper').hasClass('noContentSidebar')) {
            $("#sidebarNav").addClass("collapse hideLink").removeClass("expand");
            //$("#sidebarNav").removeClass("expand");
            $("#contentWrapper").addClass("noContentSidebar");
            $("#sidebarNav").css({
                width: "0%"
            });
            $("#contentWrapper").css({
                width: "100%"
            });
            $(".hideLink").show()
            google.maps.event.trigger(map, "resize");
        } else {
            $("#sidebarNav").removeClass("collapse hideLink").addClass("expand");
            //$("#sidebarNav").addClass("expand");
            $("#contentWrapper").removeClass("noContentSidebar");
            $("#sidebarNav").css({
                width: "22.05%",
                display: "block"
            });
            $("#contentWrapper").css({
                width: "77.9%"
            });
            $(".hideLink").show();
            google.maps.event.trigger(map, "resize");
        }
    });
};


/******************************************************************
 Print Invoice
******************************************************************/
function printInvoice(e) {
    var template = $(e).closest('tr').find('.template').text();
    var invoiceNumber = $(e).closest('tr').find('.invoiceNumber').text();
    mywindow = window.open('' + template + '?invoiceNumber=' + invoiceNumber + '&mode=print', 'mywindow', 'location=0, Status=0, toolbar=0, menubar=0, directories=0, width=960,height=800');
    mywindow.moveTo(0, 0);
    mywindow.focus();
}

function printInvoiceQuickSearch(e) {
    var template = $(e).closest('div').find('.template').val();
    var invoiceNumber = $(e).text();
    mywindow = window.open('' + template + '?invoiceNumber=' + invoiceNumber + '&mode=print', 'mywindow', 'location=0, Status=0, toolbar=0, menubar=0, directories=0, width=960,height=800');
    mywindow.moveTo(0, 0);
    mywindow.focus();
}


/******************************************************************
 ESTIMATES ACTIONS CODE
******************************************************************/
function estimateOptions(e) {
    $(document)
        .find('#invOptionsMenu')
        .remove();
    $(e)
        .closest('td')
        .addClass('menu-wrapper')
        .append('<div id="invOptionsMenu"><ul><li><a onClick="approveEstimate(this)">approve</a></li><li><a onClick="editEstimate(this)">edit</a></li><li><a onClick="printEstimate(this)">print</a></li><li><a onClick="deleteEstimate(this)">delete</a></li></ul></div>');
    setTimeout(function() {
        $('.menu-wrapper').on('click', function() {
            $('.menu-wrapper').off();
            return false;
        });
        $('body, #invOptionsMenu').on('click', function() {
            $('#invOptionsMenu').remove();
            $('body, #invOptionsMenu').off();
        });
    }, 50);
}


/******************************************************************
 Estimate Actions
******************************************************************/
function deleteEstimate(e) {
    var projectNumber = $(e)
        .closest('tr')
        .find('.jobNumber')
        .text();
    $.fallr('show', {
        icon: 'error',
        useOverlay: true,
        position: 'center',
        closeKey: true,
        width: '360px',
        content: '<div id="fallrHeadline"><p>Are you sure you would like to DELETE this estimate?</p></div><div id="fallrContent"><p class="mediumRed">This is permenant action!</p></div>',
        buttons: {
            button1: {
                text: 'Delete',
                danger: false,
                onclick: function() {
                    deleteEstimatePost();
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

    function deleteEstimatePost() {
        $.blockUI({
            message: 'Deleting the project.',
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
        $.post("controllers/projectsGridCB.php", {
                mode: "deleteEstimate",
                projectNumber: projectNumber
            },

            function(list) {
                $("#message")
                    .removeClass()
                    .html(list);
                var currentPage = $('#ct_page')
                    .val();
                /*-------- changes by Forammkumar Patel for dashboard page active project grid refresh issue put condition for check page name  ---------------------*/
                if (currentPage != 1) {
                    ctSubmitForm('ct6', currentPage, false, 'items_per_page,tbody,pager');
                } else {
                    ctSubmitForm('ct', currentPage, false, 'items_per_page,tbody,pager');
                }
                /*-------- changes by Forammkumar Patel for dashboard page active project grid refresh issue put condition for check page name  ---------------------*/
                $.unblockUI();
            })
    }
}


/******************************************************************
 Print Estimate
******************************************************************/
function printEstimate(e) {
    var estimateID = $(e)
        .closest('tr')
        .find('.estimateID')
        .text()
        .replace(/[^\d.]/g, "");
    mywindow = window.open('print/estimates/estimate.php?estimateNumber=' + estimateID + '', 'mywindow', 'location=0, Status=0, toolbar=0, menubar=0, directories=0, width=820,height=800');
    mywindow.moveTo(0, 0);
    mywindow.focus();
}


/******************************************************************
 Edit Estimate
******************************************************************/
function editEstimate(e) {
    //HAVE TO USE POST INSTEAD OF GET BECAUSE OF THE # IN THE URL AND ADDRESS PLUGIN
    var projectNumber = $(e)
        .closest('tr')
        .find('.jobNumber')
        .text();
    $.post("controllers/projectModesCB.php", {
            mode: "edit",
            getJobNumber: projectNumber,
            type: "estimate"
        },

        function(list) {
            $('a.triggerHREF')
                .attr('href', 'projectSetup.php');
            $('a.triggerHREF')
                .trigger('click');
        });
}


/******************************************************************
 Approve Estimate
******************************************************************/
function approveEstimate(e) {
    //HAVE TO USE POST INSTEAD OF GET BECAUSE OF THE # IN THE URL AND ADDRESS PLUGIN
    var jobNumber = $(e)
        .closest('tr')
        .find('.jobNumber')
        .text();
    $.post("controllers/projectModesCB.php", {
            mode: "edit",
            getJobNumber: jobNumber,
            type: "approve"
        },

        function(list) {
            $('a.triggerHREF')
                .attr('href', 'projectSetup.php');
            $('a.triggerHREF')
                .trigger('click');
        });
}


/******************************************************************
 Job EDIT OPTIONS
******************************************************************/
function jobOptions(e) {
    var menu = $(this);
    $(document).find('#invOptionsMenu').remove();
    $(e).closest('td').addClass('menu-wrapper').append('<div id="invOptionsMenu"><ul><li><a onClick="cloneJob(this)">clone</a></li><li><a onClick="editJob(this)">edit</a></li><li><a  onClick="printWorkOrder(this)">print</a></li><li><a onClick="deleteJob(this)">delete</a></li></ul></div>');
    setTimeout(function() {
        $('.menu-wrapper').on('click', function() {
            $('.menu-wrapper').off();
            return false;
        });
        $('body, #invOptionsMenu').on('click', function() {
            $('#invOptionsMenu').remove();
            $('body, #invOptionsMenu').off();
        });
    }, 50);
}
//global function: the first variable is the pageguide variable.


/******************************************************************
 Job Actions
******************************************************************/
function deleteJob(e) {
    var projectNumber = $(e).closest('tr').find('.jobNumber').text();
    $.fallr('show', {
        icon: 'error',
        useOverlay: true,
        position: 'center',
        closeKey: true,
        width: '360px',
        content: '<div id="fallrHeadline"><p>Are you sure you would like to DELETE this project?</p></div><div id="fallrContent"><p><span class="mediumRed">This is permenant action!</span> The project and all tasks/subtasks will be removed for the project. We will NOT be able to recover the data once choose to delete it.</p></div>',
        buttons: {
            button1: {
                text: 'Delete',
                danger: false,
                onclick: function() {
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
            message: 'Deleting the project.',
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
        $.post("controllers/projectsGridCB.php", {
                mode: "delete",
                projectNumber: projectNumber
            },

            function(list) {
                $("#message").removeClass().html(list);
                var currentPage = $('#ct_page').val();
                /*-------- changes by Forammkumar Patel for dashboard page active project grid refresh issue put condition for check page name  ---------------------*/
                if (currentPage != 1) {
                    ctSubmitForm('ct2', currentPage, false, 'items_per_page,tbody,pager');
                } else {
                    ctSubmitForm('ct', currentPage, false, 'items_per_page,tbody,pager');
                }
                /*-------- changes by Forammkumar Patel for dashboard page active project grid refresh issue put condition for check page name  ---------------------*/
                $.unblockUI();
            })
    }
}


/******************************************************************
 Job Actions For Quick Search
******************************************************************/
function deleteJobQuickSearch(jno) {
    var jobNumber = jno;
    $.fallr('show', {
        icon: 'error',
        useOverlay: true,
        position: 'center',
        closeKey: true,
        width: '360px',
        content: '<div id="fallrHeadline"><p>Are you sure you would like to DELETE this project?</p></div><div id="fallrContent"><p><span class="mediumRed">This is permenant action!</span> The project and all tasks/subtasks will be removed for the project. We will NOT be able to recover the data once choose to delete it.</p></div>',
        buttons: {
            button1: {
                text: 'Delete',
                danger: false,
                onclick: function() {
                    deleteInvoicePost(jobNumber);
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

    function deleteInvoicePost(projectNumber) {
        $.blockUI({
            message: 'Deleting the project.',
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
        $.post("controllers/projectsGridCB.php", {
                mode: "delete",
                projectNumber: projectNumber
            },

            function(list) {
                $("#message").removeClass().html(list);
                var currentPage = $('#ct_page').val();
                if (typeof currentPage != 'undefined') {
                    /*-------- changes by Forammkumar Patel for dashboard page active project grid refresh issue put condition for check page name  ---------------------*/
                    if (currentPage != 1) {
                        ctSubmitForm('ct2', currentPage, false, 'items_per_page,tbody,pager');
                    } else {
                        ctSubmitForm('ct', currentPage, false, 'items_per_page,tbody,pager');
                    }
                    /*-------- changes by Forammkumar Patel for dashboard page active project grid refresh issue put condition for check page name  ---------------------*/
                }
                $.unblockUI();
            })
    }
    quickActiveState();
}


/******************************************************************
 Project Billing EDIT OPTIONS
******************************************************************/
function projectOptions(e) {
    var menu = $(this);
    var projectNumber = $('h3.job-number').html().split(' :');
    projectNumber = "'" + projectNumber[0] + "'";

    $(document).find('#invOptionsMenu').remove();
    $('.editSettings').addClass('menu-wrapper').append('<div id="invOptionsMenu"><ul><li><a onClick="editJobQuickSearch(' + projectNumber + ')" class="project-billable">edit</a></li><li><a onClick="cloneJobQuickSearch(' + projectNumber + ')" class="project-billable">clone</a></li><li><a onClick="printWorkOrderQuickSearch(' + projectNumber + ')" class="project-billable">print</a></li><li><a onClick="deleteJobQuickSearch(' + projectNumber + ')" class="project-billable">delete</a></li></ul></div>');
    setTimeout(function() {
        $('.menu-wrapper').on('click', function() {
            $('.menu-wrapper').off();
            return false;
        });
        $('body, #invOptionsMenu').on('click', function() {
            $('#invOptionsMenu').remove();
            $('body, #invOptionsMenu').off();
        });
    }, 50);
}


/******************************************************************
 Quick Search - Projects EDIT OPTIONS
******************************************************************/
function qsProjectsOptions(e) {
    var menu = $(this);
    $(document).find('#projectsearchresultdata .qs-options-menu').addClass('hide');
    $(e).closest('li').addClass('menu-wrapper');
    $(e).siblings('#projectsearchresultdata .qs-options-menu').removeClass('hide');

    $('.qs-options-menu').hover(function() {}, function() {
        $(this).addClass('hide');
    });
}

/******************************************************************
 Print Job
******************************************************************/
function printWorkOrder(e) {
    var jobNumber = $(e).closest('tr').find('.jobNumber').text();
    mywindow = window.open('print/workOrders/workOrder.php?jobNumber=' + jobNumber + '', 'mywindow', 'location=0, Status=0, toolbar=0, menubar=0, directories=0, width=820,height=800');
    mywindow.moveTo(0, 0);
    mywindow.focus();
}


/******************************************************************
 Print Job For Quick Search
******************************************************************/
function printWorkOrderQuickSearch(jno) {
    var jobNumber = jno;
    mywindow = window.open('print/workOrders/workOrder.php?jobNumber=' + jobNumber + '', 'mywindow', 'location=0, Status=0, toolbar=0, menubar=0, directories=0, width=820,height=800');
    mywindow.moveTo(0, 0);
    mywindow.focus();
    quickActiveState();
}


/******************************************************************
 Edit Job
******************************************************************/
function editJob(e) {
    //HAVE TO USE POST INSTEAD OF GET BECAUSE OF THE # IN THE URL AND ADDRESS PLUGIN
    var jobNumber = $(e).closest('tr').find('.jobNumber').text();
    $.post("controllers/projectModesCB.php", {
            mode: "edit",
            getJobNumber: jobNumber
        },

        function(list) {
            changePage('projectSetup.php', false);
        }
    );
}


/******************************************************************
 Edit Job  For Quick Search
******************************************************************/
function editJobQuickSearch(jno) {
    var jobNumber = jno;

    //HAVE TO USE POST INSTEAD OF GET BECAUSE OF THE # IN THE URL AND ADDRESS PLUGIN
    $.post("controllers/projectModesCB.php", {
            mode: "edit",
            getJobNumber: jobNumber
        },

        function(list) {
            changePage('projectSetup.php', false);
        }
    );
    quickActiveState();
}


/******************************************************************
 Clone Job
******************************************************************/
function cloneJob(e) {
    //HAVE TO USE POST INSTEAD OF GET BECAUSE OF THE # IN THE URL AND ADDRESS PLUGIN
    var jobNumber = $(e).closest('tr').find('.jobNumber').text();
    $.post("controllers/projectModesCB.php", {
            mode: "clone",
            getJobNumber: jobNumber
        },

        function(list) {
            changePage('projectSetup.php', true);
        });
}


/******************************************************************
 Clone Job  For Quick Search
******************************************************************/
function cloneJobQuickSearch(jno) {
    //HAVE TO USE POST INSTEAD OF GET BECAUSE OF THE # IN THE URL AND ADDRESS PLUGIN
    var jobNumber = jno;
    $.post("controllers/projectModesCB.php", {
            mode: "clone",
            getJobNumber: jobNumber
        },

        function(list) {
            changePage('projectSetup.php', true);
        });
    quickActiveState();
}


/******************************************************************
Project time card  For quick Search
******************************************************************/
function projectTimecardQuickSearch(jno, jID) {

    var projectID = jID;

    var projectNum = jno;
    // $('a.triggerHREF').attr('href', 'projectTimecard.php');
    // $('a.triggerHREF').trigger('click');

    changePage('projectTimecard.php');

    // Sandro: after selecting the project, updates the links of the export to pass the project id
    $('#export_xls').attr('href', 'controllers/projectTimecardCB.php?project=' + projectID + '&export=xls');
    $('#export_csv').attr('href', 'controllers/projectTimecardCB.php?project=' + projectID + '&export=csv');
    $('#export_print').attr('href', 'controllers/projectTimecardCB.php?project=' + projectID + '&export=print');
    $('#export_pdf').attr('href', 'controllers/projectTimecardCB.php?project=' + projectID + '&export=pdf');

    $.post("controllers/projectTimecardCB.php", {
            project: projectID,
            projectNum: projectNum
        },
        function(list) {
            var checkContentLoaded = setInterval(function() {
                contentHasBeenLoaded()
            }, 10);

            function contentHasBeenLoaded() {
                //contentLoaded tells me that the content is there before I run this method.
                if (contentLoaded) {
                    quickActiveState();
                    $('#initialStartWrapper').remove();
                    $("#projectTimecardGrid")
                        .removeClass()
                        .html(list);
                    $("html,body")
                        .animate({
                            scrollTop: 0
                        }, 'slow');
                    $('.gridHeader').show();
                    stopInterval()
                }
            }

            function stopInterval() {
                clearInterval(checkContentLoaded);
            }
        });
}


/******************************************************************
 Fancybox bottomContent Height Change for scrolling to work correctly
******************************************************************/
function bottomContentHeightChange() {
    var fancyContent = $('#fancybox-content').height();
    var fancyboxTitle = $('.fancyboxTitle').height();
    var finalHeight = String(fancyContent - fancyboxTitle - 25) + 'px';
    $('.fancybottomContent').css('height', finalHeight);
}


/******************************************************************
 Company Calendar
******************************************************************/
function checkColorEvent() {
    $('.fc-event').each(function() {
        var color = $(this).css('backgroundColor');
        if ((color == 'rgb(255, 255, 102)') || (color == 'rgb(255, 255, 255)')) {
            $(this).addClass('lightText');
        } else {}
        if ((color == 'rgb(255, 255, 255)')) {
            $(this).addClass('eventWhite');
        } else {}
    });
};


/******************************************************************
 Advance Tooltip
******************************************************************/
function activateAdvTooltip() {
    $('#wrapper .ct_search').each(function(index) {
        var id = '#' + $(this).parent().parent().attr('id');
        $(id + ' #advSearchALT').altTips({
            width: '270px',
            position: 'right'
        });
    });
}


/******************************************************************
 Global function so we only have to call this on each page-----this should probably be at the bottom of the main.js SP
******************************************************************/
//IMPORTANT: the first variable is the pageguide variable.

function global(V) {
    pageGuide(V);

    activateAdvTooltip();

    //activatePlaceholders();
    //textarea grow
    //Mitch - added this condition so that the timecard does not get the autoGrow added to it.
    if (window.location.hash.substr(1) != "/timeCard.php") {
        $("textarea").autoGrow();
    }
    //Shutting down all modals and fallrs.
    $.fallr('hide');
    $('.ui-dialog-titlebar-close').trigger('click');

    // Temporary code to move the message div outside the fullWrapper div
    $('#message').insertBefore('#fullWrapper').addClass('tempDiv');

    // Menu fancybox call
    $('.iframe').fancybox({
        height: 250
    });
    $('.iframe.newCloseButton').fancybox({
        height: 230,
        onStart: function() {
            $('#fancybox-close').addClass('whiteClose');
        },
        onClosed: function() {
            $('#fancybox-close').removeClass('whiteClose');
        }
    });
    //Stop then enter from submitting the form.
    $(document).on('keydown', function(e) {
        if (e.which == 13) {
            var tagName = e.target.tagName.toLowerCase();
            if (tagName !== "textarea") {
                return false;
            }
        }

    });
    //Hide the Quick serach added by akshay
    /*$('body').keypress(function(e){
            if(e.which == 27){
             var quickWidth = $('#quickSearchWrapper').css('display');

             if (quickWidth == 'block') {
                    $('.quickSearch').trigger('click');

             }

            }
        }); */
    //Hide the Quick serach on esc added by Foramkumar
    $(document).keyup(function(e) {
        if (e.keyCode == 27) { // Esc
            var quickWidth = $('#quickSearchWrapper').css('display');

            if (quickWidth == 'block') {
                $('.quickSearch').trigger('click');

            }
        }
    });

    //System Workflow - QuickBooks Tooltip
    $('#workFlowWrapper a').hover(
        function() {
            var getID = '#' + $(this).attr('id') + 'Tooltip';
            $(getID).show();
        },
        function() {
            var getID = '#' + $(this).attr('id') + 'Tooltip';
            $(getID).hide();
        }
    );

    //Activate PageGuide
    $('#tlypageguideCustomLink').on('click', function() {
        $('.tlypageguide_toggle').trigger('click');
    });

    //Toggle Page Guide Link Class
    $('#tlypageguideCustomLink, .tlypageguide_close').on('click', function() {
        $('#tlypageguideCustomLink').toggleClass('activeLink');
    });

}
/*----added by Foramkumar For reset project search-----*/
function clearQuickSearchBox() {
    var dataString = '';
    $.ajax({
        type: "GET",
        url: "quicksearch_projects.php",
        data: dataString,
        success: function(server_response) {}
    })
    $('#projectSearch').val('');
    $('#clientSearch').val('');
    $('#invoiceSearch').val('');
    $('#employeesSearch').val('');
    $('#timesheetsSearch').val('');
    $('#projectsearchresultdata').empty();
    $('#clientsearchresultdata').empty();
    $('#invoicesearchresultdata').empty();
    $('#invoicesearchresultdata').text('');
    $('#employeessearchresultdata').empty();
    $('#timesheetsSearchresultdata').empty();
}
// this funtion is used to change the favourite link on save mysettig -Foramkumar

function getFavInMenu(objFav, url) {
    var textfav = $("#" + objFav).find("option:selected").text();
    if (textfav == "Select") {
        textfav = "add quick link";
    }
    $("#a_" + objFav).html(textfav);
    $("#a_" + objFav).attr('href', url);
}


/******************************************************************
 DESKTOP NOTIFICATIONS
******************************************************************/
// function playSound() {
//     $("#sounds").empty().html("<embed src='sounds/desktopNotify.wav' hidden='true' autostart='true' loop='false' />");
// }

// function allowDesktopNotify() {
//     if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
//         // function defined in step 2
//         notification = window.webkitNotifications.createNotification('images/fallrImages/chat.png', 'Congratulations', 'You are all setup with desktop notifications.');
//         notification.ondisplay = function() {
//             playSound();
//         };
//         /*notification.onclose = function() { };*/
//         notification.show();
//     } else if (window.webkitNotifications) {
//         //console.log("here");
//         window.webkitNotifications.requestPermission();
//     } else {
//         //console.log("Notifications are not supported for this Browser/OS version yet.");
//     }
// }
