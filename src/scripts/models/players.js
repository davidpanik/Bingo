(function() {
	'use strict';

	var colourPool = [
		'#FF6A00',
		'#0094FF',
		'#B200FF',
		'#FF006E',
		'#5B7F00',
		'#FF7F7F',
		'#A17FFF',
		'#0026FF',
		'#FFB27F'
	];

	var Players = function() {
		this.players = {};
		this.playersArray = [];
	};

	Players.prototype.add = function(id, name, image) {
		colourPool.shuffle();
		this.players['player_' + id] = new Bingo.Player(name, image, colourPool.pop());
		return this;
	};

	Players.prototype.remove = function(id) {
		colourPool.push(this.players['player_' + id].colour);
		delete this.players['player_' + id];
		return this;
	};

	window.Bingo = window.Bingo || {};
	window.Bingo.Players = Players;
})();