/*
	TODO Have seperate screens
	TODO Better display of bingo result
	TODO Better display of max players
	TODO Don't show player card until game begins
	TODO Better pause option
	TODO Simply event data
	TODO Use a PubSub instead of Airconsole messaging (on same device)
	TODO Switch to better use of modules
*/


(function() {
	'use strict';

	var airconsole = new AirConsole();

	airconsole.onMessage = function(deviceId, data) {
		this.dispatchEvent(deviceId, data);
	};


	// ========= CALLER ===================================================

	var Caller = require('./models/caller');
	var CallerView = require('./views/caller');

	var callerView = new CallerView({
		el: '#callerPlaceHolder',
		data: { model: new Caller() },
		oninit: function() {
			airconsole.on('bingo', (function(deviceId, data) {
				if (!this.get('model').bingoCalled) {
					alert(airconsole.getNickname(deviceId) + ' got bingo!');

					airconsole.sendEvent(AirConsole.SCREEN, 'gotBingo', { 'deviceId': deviceId });

					this.get('model').stop();
				}
			}).bind(this));

			airconsole.on('mark', (function(deviceId, data) {
				if (this.get('model').hasBeenCalled(data.mark.value)) {
					airconsole.sendEvent(deviceId, 'marked', { 'marked': data.mark });
				}
			}).bind(this));

			airconsole.on('reset', (function(deviceId, data) {
				this.get('model').reset().start();
			}).bind(this));
		}
	});



	// ========= PLAYERS ===================================================

	var Players = require('./models/players');
	var PlayersView = require('./views/players');

	var playersView = new PlayersView({
		el: '#playersPlaceHolder',
		data: { model: new Players() },
		oninit: function() {
			airconsole.on('bingoAvailable', (function(deviceId, data) {
				this.get('model').changeState(deviceId, 'bingoAvailable', true);
			}).bind(this));

			airconsole.on('nearlyBingo', (function(deviceId, data) {
				this.get('model').changeState(deviceId, 'nearlyBingo', true);
			}).bind(this));

			airconsole.on('gotBingo', (function(deviceId, data) {
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
				airconsole.sendEvent(AirConsole.SCREEN, 'reset', { reset: true });
				screensModel.goto('game');
				return false;
			});
		}
	});

	var Screens = require('./models/screens');
	var ScreensView = require('./views/screens');

	var screensModel = new Screens();
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