/*
	TODO Have seperate screens
	TODO Better display of bingo result
	TODO Better display of max players
	TODO Don't show player card until game begins
	TODO Better pause option
	TODO Simply event data
*/


(function() {
	'use strict';

	var airconsole = new AirConsole();

	airconsole.onMessage = function(deviceId, data) {
		this.dispatchEvent(deviceId, data);
	};



	// ========= CALLER ===================================================

	var callerModel = new Bingo.Caller();
	var callerView = new Bingo.CallerView({
		el: '#callerPlaceHolder',
		data: { model: callerModel },
		oninit: function() {}
	});

	airconsole.on('bingo', function(deviceId, data) {
		if (!callerModel.bingoCalled) {
			alert(airconsole.getNickname(deviceId) + ' got bingo!');
			airconsole.sendEvent(0, 'gotBingo', { 'deviceId': deviceId });

			callerModel.stop();
		}
	});

	airconsole.on('mark', function(deviceId, data) {
		if (callerModel.hasBeenCalled(data.mark.value)) {
			airconsole.sendEvent(deviceId, 'marked', { 'marked': data.mark });
		}
	});



	// ========= PLAYERS ===================================================

	var playersView = new Bingo.PlayersView({
		el: '#playersPlaceHolder',
		data: { model: new Bingo.Players() },
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
				this.get('model').add(deviceId, airconsole.getNickname(deviceId), airconsole.getProfilePicture(deviceId));
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
				callerModel.reset().start();
				airconsole.broadcastEvent('reset', { reset: true });
				screensModel.goto('game');
				return false;
			});
		}
	});

	var screensModel = new Bingo.Screens();
	var screensView = new Bingo.ScreensView({
		el: '#screensPlaceHolder',
		data: {
			model: screensModel
		},
		components: {
			'home-screen': HomeView,
			'caller': Bingo.CallerView,
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