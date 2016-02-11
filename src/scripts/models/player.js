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

	module.exports = Player;
})();