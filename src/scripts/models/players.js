(function() {
	'use strict';

	var colourPool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

	var PlayerModel = require('./player');

	var prefix = 'player_';

	var Players = function(maxPlayers) {
		this.maxPlayers = maxPlayers || 20;
		this.currentPlayers = 0;
		this.maxReached = false;
		this.players = {};
		this.playersArray = [];
	};

	Players.prototype.add = function(id, name, image) {
		if (this.currentPlayers < this.maxPlayers) {
			var newPlayer = new PlayerModel(name, image, colourPool.shift());
			this.players[prefix + id] = newPlayer;
			this.currentPlayers++;
			this.toArray();
			this.maxReached = false;

			if (!this.hostAssigned()) {
				this.assignHost();
			}

			return newPlayer;
		} else {
			this.maxReached = true;
		}

		return this;
	};

	Players.prototype.remove = function(id) {
		colourPool.unshift(this.players['player_' + id].colour);
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

	Players.prototype.changeState = function(id, state) {
		this.players['player_' + id].state = state;
		this.toArray();

		return this;
	};

	Players.prototype.reset = function() {
		for (var x in this.players) {
			this.players[x].state = '';
		}

		return this;
	};

	Players.prototype.moreThan = function(x) {
		return (this.currentPlayers > x);
	};

	module.exports = Players;
})();