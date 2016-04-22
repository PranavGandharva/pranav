/*
 * Alternative Tips - An easier and more flexible way to create custom tooltips.
 *
 * Examples and documentation at: ""
 *
 * Copyright (c) 2011-2012 Anselm Marie (levelupgraphics.com)
 *
 * Version: 1.0.0 (12/11/2011)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
  
(function ($) {
	
	$.fn.altTips  = function (options) {
	
	var
	  defaults = {
		style: 'none',
		width: '300px',
		height: 'auto',		
		position: 'top',
		headline:'15px',
		fontSize:'',
		tip: true,
        sticky: false, 
		shadow: false,
		rounded: false
	  },
	  settings = $.extend({}, defaults, options);

	if ( $.browser.msie && $.browser.version == 7 ) {
		$('body').append( '<style type="text/css">.ALTtipsWrapper, .ALTtrigger {display: inline;}.ALTtipsWrapper{z-index: 28;}.ALTsticky {z-index: 27;}</style>' );
	}

	  this.each(function() {		  
		var a = $(this).attr("id");
		if (a == '') {
			var a = 'commentBillTypes';
		}else{
		}
		var ab = ('#' + a + 'Tooltip');
		var triggerHeight = $(this).height();
		var tooltipPositionH = String(triggerHeight + 20);
		//var az = $(this).attr("class");
		
		//CSS settings for ab
		$(ab).css({
			width: settings.width,
			height: settings.height,					
			fontSize: settings.fontSize
		});

		//CSS settings for ALTtipsHeadline
		$('.ALTtipsHeadline').css({					
			fontSize: settings.headline,
			textAlign: settings.headlinePos
		});
		
		$(this).hover(function (event) {
  	  
			//This is so the tooltipWrapper won't always be added for manual popups 
			if ($(ab).is(':visible')) {
				$(ab).css('z-index', '30');
			} else {
				$(this).wrap('<div class="ALTtipsWrapper"></div>').after($(ab));			
				$(ab).css('z-index', '30');
			};
 
			var tooltipWidth = $(this).parent().find('.ALTtips').width();
			var triggerWidth = $(this).parent().width();
			var tooltipPositionW = String(tooltipWidth / 2);
			var tooltipHeight = $(ab).height();
		  
			var tooltipPositionLRW =  String(triggerWidth + 20);
			var tooltipPositionLRH =  String(tooltipHeight / 2);
			  
			//Settings for adding a shadow
			if(settings.shadow == true) {
				if ($(ab + ' .ALTboxShadow').is(':visible')) {
				} else {				
					$(ab + '.ALTtips .ALTbox').wrap('<div class="ALTboxShadow"></div>');
				};
			};

			//CSS settings for ALTboxShadow
			$(ab + ' .ALTboxShadow').css({
				height: settings.height
			});
		  
			//Settings for rounded corners
			if(settings.rounded == true) {
				$(ab).addClass('ALTrounded');
				$(ab + '.ALTtips .ALTboxShadow').addClass('ALTrounded');
			};
			  
			//Settings for changing the style
			if(settings.style == 'none') {
			}else if(settings.style == 'white') {
				$(ab).addClass('ALTstyleWhite');
			}else if(settings.style == 'black') {
				$(ab).addClass('ALTstyleBlack');
			}else if(settings.style == 'grey'){
				$(ab).addClass('ALTstyleGrey');				  
			}else if(settings.style == 'red') {
				$(ab).addClass('ALTstyleRed');
			}else if(settings.style == 'blue'){
				$(ab).addClass('ALTstyleBlue');
			};
  
			//Settings for changing the position of the tooltip
			if(settings.position == 'top') {
				$(ab + '.ALTtips').css({ bottom:(parseInt(tooltipPositionH)) + 'px', left: 50 + '%', marginLeft:-(parseInt(tooltipPositionW)) + 'px' });
			} else if(settings.position == 'bottom') {
				$(ab + '.ALTtips').css({ top:(parseInt(tooltipPositionH) + 15) + 'px', left: 50 + '%', marginLeft:-(parseInt(tooltipPositionW)) + 'px' });
			} else if(settings.position == 'left') {
			//Custom change added '- 10' to get the tooltip closer to the commander
				$(ab + '.ALTtips').css({ right:(parseInt(tooltipPositionLRW) - 10) + 'px', top: 50 + '%', marginTop:-(parseInt(tooltipPositionLRH)) + 'px' });
			} else if(settings.position == 'right') {
			//Custom change added '- 5' to get the tooltip closer to the commander
				$(ab + '.ALTtips').css({ left:(parseInt(tooltipPositionLRW) - 5) + 'px', top: 50 + '%', marginTop:-(parseInt(tooltipPositionLRH)) + 'px' });
			};

			//Settings for tip
			if(settings.position == 'top' && settings.tip == true) {
				$(ab).append('<div class="ALTtip"></div>');
				$(ab + ' .ALTtip').css({ left: 50 + '%', marginLeft: -14 + 'px'}).addClass('borderTop');
			} else if(settings.position == 'bottom' && settings.tip == true) {
			//Custom change the 'marginLeft: -28' to 'marginLeft: -15'
			//Custom change the 'marginLeft: -14' to 'marginLeft: -10'
				$(ab).append('<div class="ALTtip"></div>');
				$(ab + ' .ALTtip').css({ left: 50 + '%', top: -15 + 'px', marginLeft: -10 + 'px'}).addClass('borderBottom');
			} else if(settings.position == 'left' && settings.tip == true) {
				$(ab).append('<div class="ALTtip"></div>');
			//Custom change the 'marginLeft: -28' to 'marginLeft: -29'
			//Custom change the 'right: 0' to 'right: 13 + 'px''				
				$(ab + ' .ALTtip').css({ right: 13, top: 50 + '%', marginTop: -13 + 'px', marginRight: -29 + 'px'}).addClass('borderLeft');
			} else if(settings.position == 'right' && settings.tip == true) {
				$(ab).append('<div class="ALTtip"></div>');
			//Custom change the 'marginLeft: -28' to 'marginLeft: -27'
			//Custom change the 'left: 0' to 'left: 13 + 'px''
				$(ab + ' .ALTtip').css({ left: 13 + 'px', top: 50 + '%', marginTop: -13 + 'px', marginLeft: -27 + 'px'}).addClass('borderRight');
			};
			  				  
			//Settings for manual hovers
			if(settings.sticky == true) {	
				if ($(ab + ' .ALTtipsClose').is(':visible')) {
				} else {
					$(ab + '.ALTtips').append('<div class="ALTtipsClose"></div>');
					$(ab).addClass('ALTsticky');
				};
			};
		  
			//This closes the popup manually
			var tooltipC = $(this).next(ab).find('.ALTtipsClose');
		  
			$(tooltipC).click(function() {

				$(tooltipC).parent().unwrap();
				$(tooltipC).remove();	
				$(ab).removeClass('ALTsticky');
				$('#ALTinlineWrapper').append($(ab));		
  
			});
			  
		},function () {

			$(ab).css('z-index', '29');
		  
				if(settings.sticky == false) {	

					$(this).unwrap();
					$(ab + ' .ALTtip').remove();
					$('#ALTinlineWrapper').append($(ab));			
					$(ab).removeClass('ALTsticky');
		  
				};
  
			});
				
		}); //Ends "this.each" function

	}; //Ends "$.fn.altTips" function
	
})(jQuery);