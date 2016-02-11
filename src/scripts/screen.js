/*
	TODO Have seperate screens
	TODO Better display of bingo result
	TODO Don't show player card until game begins
	TODO Better pause option
	TODO Send messages to controller to say what's happening
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


	// ========= CALLER ===================================================

	var CallerView = require('./views/caller')(airconsole, pubSub);

	var callerView = new CallerView({
		el: '#callerPlaceHolder'
	});



	// ========= PLAYERS ===================================================

	var PlayersView = require('./views/players')(airconsole, pubSub);

	var playersView = new PlayersView({
		el: '#playersPlaceHolder'
	});



	// ========= SCREENS ===================================================

	var HomeView = Ractive.extend({
		template: '#homeScreenTemplate',
		data: {},
		oninit: function() {
			this.on('start', function(e, cell) {
				airconsole.broadcastEvent('reset', {});
				pubSub.trigger('reset');
				screensModel.goto('game');
				return false;
			});
		}
	});

	var ScreensModel = require('./models/screens');
	var ScreensView = require('./views/screens');

	var screensModel = new ScreensModel();
	var screensView = new ScreensView({
		el: '#screensPlaceHolder',
		data: {
			model: screensModel
		},
		components: {
			'home-screen': HomeView,
			'caller': CallerView
		},
		oninit: function() {}
	});

	setTimeout(function() {
		screensModel.goto('home');
	}, 1000);


	// window.addEventListener('blur', function() {
	// 	callerModel.stop();
	// });

	// window.addEventListener('focus', function() {
	// 	callerModel.start();
	// });
})();