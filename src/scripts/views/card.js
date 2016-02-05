(function() {
	'use strict';

	var CardView = Ractive.extend({
		template: '#cardTemplate',
		magic: true
	});

	window.Bingo = window.Bingo || {};
	window.Bingo.CardView = CardView;
})();