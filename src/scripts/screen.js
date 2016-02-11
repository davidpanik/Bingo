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

	var PlayersModel = require('./models/players');
	var PlayersView = require('./views/players');

	var playersView = new PlayersView({
		el: '#playersPlaceHolder',
		data: { model: new PlayersModel() },
		oninit: function() {
			airconsole.on('bingoAvailable', (function(deviceId, data) {
				this.get('model').changeState(deviceId, 'bingoAvailable', true);
			}).bind(this));

			airconsole.on('nearlyBingo', (function(deviceId, data) {
				this.get('model').changeState(deviceId, 'nearlyBingo', true);
			}).bind(this));

			pubSub.on('gotBingo', (function(deviceId) {
				this.get('model').recordWin(deviceId);
			}).bind(this));

			airconsole.onConnect = (function(deviceId) {
				this.get('model').add(
					deviceId,
					airconsole.getNickname(deviceId),
					airconsole.getProfilePicture(deviceId)
				);
			}).bind(this);

			airconsole.onDisconnect = (function(deviceId) {
				this.get('model').remove(deviceId);
			}).bind(this);
		}
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