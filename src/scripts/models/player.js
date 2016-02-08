(function() {
	'use strict';

	var Player = function(name, image, colour) {
		this.name = name || '';
		this.image = image || '';
		this.colour = colour || '';
		this.score = 0;
		this.bingoAvailable = false;
		this.nearlyBingo = false;
	};

	window.Bingo = window.Bingo || {};
	window.Bingo.Player = Player;
})();