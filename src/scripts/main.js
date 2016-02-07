/*
	TODO Show players ready for bingo
	TODO Show player nearing bingo
	TODO Ensure only one player can call bingo
	TODO Start a new game
	TODO Have seperate screens
	TODO Replace buttons with divs
	TODO Listen for touch events
	TODO Enforce max players limit (8?)
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

	if (mode === 'card' || mode === 'local') {
		var cardView = new Bingo.CardView({
			el: '#cardPlaceHolder',
			data: { model: new Bingo.Card() },
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
						airconsole.message(AirConsole.SCREEN, { 'mark': cell });
					});

					this.on('bingo', function(e, cell) {
						airconsole.message(AirConsole.SCREEN, { 'bingo': true });
					});

					airconsole.onMessage = (function(deviceId, data) {
						if (data.marked) {
							this.get('model').markCellByValue(data.marked.value);
						}
					}).bind(this);
				}
			}
		});
	}

	if (mode === 'caller' || mode === 'local') {
		var callerModel = new Bingo.Caller();

		var callerView = new Bingo.CallerView({
			el: '#callerPlaceHolder',
			data: { model: callerModel },
			oninit: function() {
				this.on('start', function(e, cell) {
					this.get('model').start();
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
		airconsole.onMessage = function(deviceId, data) {
			if (data.bingo) {
				alert(airconsole.getNickname(deviceId) + ' got bingo!');
				playersModel.recordWin(deviceId);

				callerModel.stop();
			}

			if (data.mark) {
				if (callerModel.hasBeenCalled(data.mark.value)) {
					airconsole.message(deviceId, { 'marked': data.mark });
				}
			}
		};

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
			console.log(playersModel);
		};

		airconsole.onDisconnect = function(deviceId) {
			playersModel.remove(deviceId);
		};
	}
})();