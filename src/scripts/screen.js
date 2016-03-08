/*
	TODO Intro logo and animation
	TODO How to play
	TODO Cross browser compatiblity

	NICE Offline test harness
	NICE Convert all px to vm
	NICE Add loading progress
	NICE Speed up responses when marking numbers
	NICE Rework Players object/map hybrid
	NICE Show player image on controller
	NICE Add crowd cheering sound
	NICE Background music
	NICE Add explosion effect
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
})();