/*
	TODO Show players ready for bingo
	TODO Show player nearing bingo
	TODO Start a new game
	TODO Have seperate screens
	TODO Replace buttons with divs
	TODO Listen for touch events
	TODO Enforce max players limit (8?)
	TODO Better display of bingo result
*/


(function() {
	'use strict';

	var mode = '';
	if (document.getElementById('cardPlaceHolder') && document.getElementById('callerPlaceHolder')) {
		mode = 'local';
	} else if (document.getElementById('cardPlaceHolder')) {
		mode = 'card';
	} else if (document.getElementById('callerPlaceHolder')) {
		mode = 'caller';
	}

	var airconsole;

	if (mode === 'card') {
		airconsole = new AirConsole({ 'orientation': 'portrait' });
	}

	if (mode === 'caller') {
		airconsole = new AirConsole();
	}

	if (mode === 'card' || mode === 'caller') {
		airconsole.onMessage = function(deviceId, data) {
			this.dispatchEvent(deviceId, data);
		};
	}

	if (mode === 'card' || mode === 'local') {
		var card = new Bingo.Card();
		var cardView = new Bingo.CardView({
			el: '#cardPlaceHolder',
			data: { model: card },
			oninit: function(options) {
				if (mode === 'local') {
					this.on('mark', function(e, cell) {
						if (callerModel.hasBeenCalled(cell.value)) {
							this.get('model').markCell(cell);
						}
					});

					this.on('bingo', function(e, cell) {
						alert('BINGO!');

						callerModel.stop();
					});
				}

				if (mode === 'card') {
					this.on('mark', function(e, cell) {
						airconsole.sendEvent(AirConsole.SCREEN, 'mark', { 'mark': cell });
					});

					this.on('bingo', function(e, cell) {
						airconsole.sendEvent(AirConsole.SCREEN, 'bingo', { 'bingo': true });
					});

					airconsole.on('marked', (function(deviceId, data) {
						this.get('model').markCellByValue(data.marked.value);
					}).bind(this));
				}
			}
		});

		if (mode === 'card') {
			airconsole.on('reset', function(deviceId, data) {
				card = new Bingo.Card();
			});
		}
	}

	if (mode === 'caller' || mode === 'local') {
		var callerModel = new Bingo.Caller();

		var callerView = new Bingo.CallerView({
			el: '#callerPlaceHolder',
			data: { model: callerModel },
			oninit: function() {
				this.on('start', function(e, cell) {
					this.get('model').start();
					if (mode === 'caller') {
						airconsole.broadcastEvent('reset', { reset: true });
					}
				});
			}
		});

		window.addEventListener('blur', function() {
			callerModel.stop();
		});

		window.addEventListener('focus', function() {
			callerModel.start();
		});
	}

	if (mode === 'caller') {
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

		var playersModel = new Bingo.Players();
		var playersView = new Bingo.PlayersView({
			el: '#playersPlaceHolder',
			data: { model: playersModel },
			oninit: function() {

			}
		});

		// var screensModel = new Bingo.Screens();
		// var screensView = new Bingo.ScreensView({
		// 	el: '#screensPlaceHolder',
		// 	data: { model: screensModel },
		// 	oninit: function() {
		// 		this.on('onScreen', function(e, screen) {
		// 			return (this.get('model').current === screen);
		// 		});
		// 	}
		// });

		airconsole.onConnect = function(deviceId) {
			playersModel.add(deviceId, airconsole.getNickname(deviceId), airconsole.getProfilePicture(deviceId));
		};

		airconsole.onDisconnect = function(deviceId) {
			playersModel.remove(deviceId);
		};
	}
})();