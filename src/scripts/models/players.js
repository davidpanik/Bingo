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

	var PlayerModel = require('./player');

	var prefix = 'player_';

	var Players = function(maxPlayers) {
		this.maxPlayers = maxPlayers || 8;
		this.currentPlayers = 0;
		this.maxReached = false;
		this.players = {};
		this.playersArray = [];
	};

	Players.prototype.add = function(id, name, image) {
		if (this.currentPlayers < this.maxPlayers) {
			colourPool.shuffle();
			this.players[prefix + id] = new PlayerModel(name, image, colourPool.pop());
			this.currentPlayers++;
			this.toArray();
			this.maxReached = false;

			if (!this.hostAssigned()) {
				this.assignHost();
			}
		} else {
			this.maxReached = true;
		}

		return this;
	};

	Players.prototype.remove = function(id) {
		colourPool.push(this.players['player_' + id].colour);
		delete this.players['player_' + id];
		this.currentPlayers--;
		this.toArray();
		this.maxReached = false;

		if (!this.hostAssigned()) {
			this.assignHost();
		}

		return this;
	};

	Players.prototype.toArray = function() {
		this.playersArray = [];
		for (var player in this.players) {
			this.playersArray.push(this.players[player]);
		}
	};

	Players.prototype.hostAssigned = function() {
		for (var x in this.players) {
			if (this.players[x].host) {
				return true;
			}
		}

		return false;
	};

	Players.prototype.assignHost = function() {
		for (var x in this.players) {
			this.players[x].host = true;
			this.toArray();
			return this;
		}
	};

	Players.prototype.getHost = function() {
		for (var x in this.players) {
			if (this.players[x].host) {
				return Number(x.replace(prefix, ''));
			}
		}

		return 0;
	};

	Players.prototype.recordWin = function(id) {
		this.players['player_' + id].score++;
		this.toArray();

		return this;
	};

	Players.prototype.changeState = function(id, state, value) {
		this.players['player_' + id][state] = value;
		this.toArray();

		return this;
	};

	module.exports = Players;
})();