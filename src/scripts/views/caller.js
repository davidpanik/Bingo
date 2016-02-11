(function() {
	'use strict';

	var CallerView = Ractive.extend({
		template: '#callerTemplate',
		magic: true
	});

	module.exports = CallerView;
})();