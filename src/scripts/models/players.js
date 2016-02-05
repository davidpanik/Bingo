(function() {
	'use strict';

	var Players = function() {
		this.players = {};
		this.playersArray = [];
	};

	Players.prototype.add = function(id, name, image) {
		this.players['player_' + id] = new Bingo.Player(name, image);
		return this;
	};

	Players.prototype.remove = function(id) {
		delete this.players['player_' + id];
		return this;
	};

	window.Bingo = window.Bingo || {};
	window.Bingo.Players = Players;
})();