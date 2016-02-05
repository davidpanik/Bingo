(function() {
	'use strict';

	var Player = function(name, image) {
		this.name = name || '';
		this.image = image || '';
		this.score = 0;
	};

	window.Bingo = window.Bingo || {};
	window.Bingo.Player = Player;
})();