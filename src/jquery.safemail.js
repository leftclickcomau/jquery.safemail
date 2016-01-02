/*!
 * jquery.safemail.js
 *
 * Simple jQuery plugin wrapper for safemail.
 *
 * To be called on elements with content of the form:
 * (user) at (domain) dot (domain) dot (domain)
 *
 * For example:
 * joe at example dot com dot au
 *
 * This will be converted into a "mailto" link, using the given address.
 * If the element has a title attribute, it is used as the email subject.
 */

(function() {
	'use strict';
	(function (factory) {
		if (typeof define === 'function' && define.amd) {
			define(['jquery'], factory);
		} else {
			factory(jQuery); //global jQuery
		}
	}(function ($) {
		var defaults = {
				linkTextRegex: /(.*?)\s+\((.*?)\)/,
				atRegex: /\s+at\s+/g,
				dotRegex: /\s+dot\s+/g,
				applyTitleAsSubject: true
			},
			makeItSafe = function(options, val) {
				return val.replace(options.atRegex, '@').replace(options.dotRegex, '.');
			};

		$.fn.safemail = function(options) {
			options = $.extend({}, defaults, options);

			return $(this).each(function() {
				if (this.tagName.toLowerCase() === 'input') {
					$(this).val(makeItSafe(options, $(this).val()));
				} else {
					var match, address, linkText, subject, text = $(this).text();
					if (options.linkTextRegex.test(text)) {
						match = options.linkTextRegex.exec(text);
						address = makeItSafe(options, match[1]);
						linkText = match[2];
					} else {
						linkText = address = makeItSafe(options, text);
					}
					subject = options.applyTitleAsSubject && $(this).attr('title') ? '?subject=' + encodeURIComponent($(this).attr('title')) : '';
					$(this).before($('<a href="mailto:' + address + subject + '">'+ linkText + '</a>')).hide();
				}
			});
		};
	}));
}());
