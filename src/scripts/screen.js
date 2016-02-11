/*
	TODO Have seperate screens
	TODO Better display of bingo result
	TODO Better display of max players
	TODO Don't show player card until game begins
	TODO Better pause option
	TODO Simplfy event data
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

	var CallerModel = require('./models/caller');
	var CallerView = require('./views/caller');

	var callerView = new CallerView({
		el: '#callerPlaceHolder',
		data: { model: new CallerModel() },
		oninit: function() {
			airconsole.on('bingo', (function(deviceId, data) {
				if (!this.get('model').bingoCalled) {
					alert(airconsole.getNickname(deviceId) + ' got bingo!');

					// airconsole.sendEvent(AirConsole.SCREEN, 'gotBingo', { 'deviceId': deviceId });
					pubSub.trigger('gotBingo', { 'deviceId': deviceId });

					this.get('model').stop();
				}
			}).bind(this));

			airconsole.on('mark', (function(deviceId, data) {
				if (this.get('model').hasBeenCalled(data.mark.value)) {
					airconsole.sendEvent(deviceId, 'marked', { 'marked': data.mark });
				}
			}).bind(this));

			pubSub.on('reset', (function() {
				this.get('model').reset().start();
			}).bind(this));
		}
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

			pubSub.on('gotBingo', (function(data) {
				this.get('model').recordWin(data.deviceId);
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
				airconsole.broadcastEvent('reset', { reset: true });
				pubSub.trigger('reset');
				// airconsole.sendEvent(AirConsole.SCREEN, 'reset', { reset: true });
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