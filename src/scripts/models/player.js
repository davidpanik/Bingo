(function() {
	'use strict';

	var Player = function(name, image, colour) {
		this.name = name || '';
		this.image = image || '';
		this.colour = colour || '';
		this.score = 0;
	};

	window.Bingo = window.Bingo || {};
	window.Bingo.Player = Player;
})();