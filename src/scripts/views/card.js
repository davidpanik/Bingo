(function() {
	'use strict';

	var CardView = Ractive.extend({
		template: '#cardTemplate',
		magic: true
	});

	module.exports = CardView;
})();