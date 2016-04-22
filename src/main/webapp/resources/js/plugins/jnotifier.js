/*
Plugin: jNotifier
Version: 2.1
Author: Tarahonich Yuriy a.k.a. Sofcase
*/
(function($) {
	$.jnotify = function(title, text, pictureSrc, options) {
		var stackContainer, messageBox, messageBody, messageTextBox, closeButton, messagePicture, image;

		options = $.extend({
			lifeTime: 0,
			click: undefined,
			close: undefined,
			customClass: '',
		}, options);
		
		// get stack container or create
		stackContainer = $('#notifier-box');
		if (!stackContainer.length) {
			stackContainer = $('<div>', {id: 'notifier-box'}).prependTo(document.body);
		}

		messageBox = $('<div>', {'class': 'message-box', css: {display: 'none'}});
		messageHeader = $('<div>', {'class': 'message-header', html: title});
		messageBody = $('<div>', {'class': 'message-body'});
		messageTextBox = $('<span>', {html: text});
		
		closeButton = $('<a>', {
			'class': 'message-close',
			href: 'javascript:void(0)',
			title: 'Click to close this message',
			click: function(e) {
				$(this).parent().fadeOut(500, function() {
					$(this).remove();
				});
				return false;
			}
		});

		if (typeof pictureSrc != 'undefined') {
			messagePicture = $('<div>', {
				'class': 'thumb'
			});
			image = $('<img>', {
				src: pictureSrc
			});
		}

		messageBox.appendTo(stackContainer).fadeIn(500);
		closeButton.appendTo(messageBox);
		messageHeader.appendTo(messageBox);
		messageBody.appendTo(messageBox);

		if (typeof messagePicture != 'undefined') {
			messagePicture.appendTo(messageBody);
			image.appendTo(messagePicture);
		}
		messageTextBox.appendTo(messageBody);

		// set message life time
		if (options.lifeTime > 0) {
			setTimeout(function() {
				$(messageBox).fadeOut(500, function() {
					$(this).remove();
				});
			}, options.lifeTime);
		}
		
		// add user custom class if exists
		if (options.customClass != '') {
			messageBox.addClass(options.customClass);
		}
		
		// if callback for click is exists, then run
		if (typeof options.click != 'undefined') {
			messageBox.click(function(e) {
				if (!jQuery(e.target).is('.message-close')) {
					options.click.call(this);
				}
			});
		}
		
		// if callback for close is exists, then run
		if (typeof options.close != 'undefined') {
			messageBox.click(function(e) {
				if (jQuery(e.target).is('.message-close')) {
					options.close.call(this);
				}
			});
		}
		
		return this;
	}
})(jQuery);
