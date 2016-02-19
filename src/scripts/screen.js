/*
	TODO Rework Players object/map hybrid
	TODO Add sound controller
	TODO Add scrolling background
	TODO Start adding animation
	TODO Choose font
	TODO Better assignment of colours
	TODO Add number sounds
	TODO Why are sounds playing multiple times?
	TODO Use perlin noise for background
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

			pubSub.on('setWinner', (function(name) {
				this.set('custom.winner', name);
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