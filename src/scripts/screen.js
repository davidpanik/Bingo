/*
	TODO Start adding animation
	TODO Show player image and colour when winning
	TODO Handle display of large number of players
	TODO Speed up responses when marking numbers
	TODO Cross browser compatiblity

	NICE Rework Players object/map hybrid
	NICE Show player image on controller
	NICE Add crowd cheering sound
	NICE Background music
*/


(function() {
	'use strict';

	require('./other/arrayShuffle');

	var airconsole = new AirConsole();

	airconsole.onMessage = function(deviceId, data) {
		this.dispatchEvent(deviceId, data);
	};

	var Events = require('./other/events');
	var pubSub = new Events();

	require('./other/sound')(pubSub);

	var CallerView = require('./views/caller')(airconsole, pubSub);
	var PlayersView = require('./views/players')(airconsole, pubSub);
	var PerlinView = require('./views/perlin')();

	var ScreensView = require('./views/screens')(airconsole, pubSub);
	var screensView = new ScreensView({
		el: '#content',
		components: {
			'caller': CallerView,
			'players': PlayersView,
			'perlin': PerlinView
		},
		oninit: function() {
			this.addListeners();

			pubSub.on('setWinner', (function(winnerId) {
				this.set('custom.winnerName', airconsole.getNickname(winnerId));
			}).bind(this));

			this.get('model').goto('home');
		}
	});

	// window.addEventListener('blur', function() {
	// 	callerModel.stop();
	// });

	// window.addEventListener('focus', function() {
	// 	callerModel.start();
	// });
})();