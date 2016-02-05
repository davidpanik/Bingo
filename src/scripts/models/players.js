(function() {
	'use strict';

	var Players = function() {
		this.players = [];
	};

	Players.prototype.add = function(player) {

		return this;
	};

	Players.prototype.remove = function(player) {

		return this;
	};

	window.Bingo = window.Bingo || {};
	window.Bingo.Players = Players;
})();