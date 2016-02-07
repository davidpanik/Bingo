(function() {
	'use strict';

	var ScreensView = Ractive.extend({
		template: '#screensTemplate',
		magic: true
	});

	window.Bingo = window.Bingo || {};
	window.Bingo.ScreensView = ScreensView;
})();