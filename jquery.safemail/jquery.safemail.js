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

;(function($) {
	$.fn.safemail = function() {
		var makeItSafe = function(val) {
			return val.replace(/\s+at\s+/, '@').replace(/\s+dot\s+/g, '.');
		};

		$(this).each(function() {
			if (this.tagName.toLowerCase() === 'input') {
				$(this).val(makeItSafe($(this).val()));
			} else {
				var exp = $(this).text().search(/\((.*?)\)/) != -1 ? new RegExp(/(.*?)\s+\((.*?)\)/) : new RegExp(/.*/);
				var match = exp.exec($(this).text());
				var addr = match[1] ? makeItSafe(match[1]) : makeItSafe(match[0]);
				var link = match[2] ? match[2] : addr;
				var subject = $(this).attr('title') ? "?subject="+$(this).attr('title').replace(/\s/g,"%20") : "";
				$(this).before($('<a href="mailto:'+addr+subject+'">'+ link + '</a>'));
				$(this).hide();
			}
		});
	};
})(jQuery);
