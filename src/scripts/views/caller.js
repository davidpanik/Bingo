(function() {
	'use strict';

	var CallerView = Ractive.extend({
		template: '#callerTemplate',
		magic: true
	});

	window.Bingo = window.Bingo || {};
	window.Bingo.CallerView = CallerView;
})();