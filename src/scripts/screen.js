/*
	TODO Have seperate screens
	TODO Better display of bingo result
	TODO Better display of max players
	TODO Don't show player card until game begins
	TODO Better pause option
*/


(function() {
	'use strict';

	var airconsole = new AirConsole();

	airconsole.onMessage = function(deviceId, data) {
		this.dispatchEvent(deviceId, data);
	};

	var callerModel = new Bingo.Caller();
	var callerView = new Bingo.CallerView({
		el: '#callerPlaceHolder',
		data: { model: callerModel },
		oninit: function() {
			this.on('start', function(e, cell) {
				this.get('model').reset().start();
				airconsole.broadcastEvent('reset', { reset: true });
				return false;
			});
		}
	});

	airconsole.on('bingo', function(deviceId, data) {
		if (!callerModel.bingoCalled) {
			alert(airconsole.getNickname(deviceId) + ' got bingo!');
			playersModel.recordWin(deviceId);

			callerModel.stop();
		}
	});

	airconsole.on('mark', function(deviceId, data) {
		if (callerModel.hasBeenCalled(data.mark.value)) {
			airconsole.sendEvent(deviceId, 'marked', { 'marked': data.mark });
		}
	});

	airconsole.on('bingoAvailable', function(deviceId, data) {
		playersModel.changeState(deviceId, 'bingoAvailable', true);
	});

	airconsole.on('nearlyBingo', function(deviceId, data) {
		playersModel.changeState(deviceId, 'nearlyBingo', true);
	});

	var playersModel = new Bingo.Players();
	var playersView = new Bingo.PlayersView({
		el: '#playersPlaceHolder',
		data: { model: playersModel },
		oninit: function() {

		}
	});

	var screensModel = new Bingo.Screens();
	var screensView = new Bingo.ScreensView({
		el: '#screensPlaceHolder',
		data: {
			model: screensModel
		},
		oninit: function() {
		}
	});


	// window.addEventListener('blur', function() {
	// 	callerModel.stop();
	// });

	// window.addEventListener('focus', function() {
	// 	callerModel.start();
	// });

	airconsole.onConnect = function(deviceId) {
		playersModel.add(deviceId, airconsole.getNickname(deviceId), airconsole.getProfilePicture(deviceId));
	};

	airconsole.onDisconnect = function(deviceId) {
		playersModel.remove(deviceId);
	};
})();