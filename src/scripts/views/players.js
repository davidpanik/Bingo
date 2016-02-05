(function() {
	'use strict';

	var PlayersView = Ractive.extend({
		template: '#playersTemplate',
		magic: true
	});

	window.Bingo = window.Bingo || {};
	window.Bingo.PlayersView = PlayersView;
})();