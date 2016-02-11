(function() {
	'use strict';

	require('./other/arrayShuffle');

	var airconsole = new AirConsole({ 'orientation': 'portrait' });

	airconsole.onMessage = function(deviceId, data) {
		this.dispatchEvent(deviceId, data);
	};

	var CardModel = require('./models/card');
	var CardView = require('./views/card');

	var cardView = new CardView({
		el: '#cardPlaceHolder',
		data: { model: new CardModel() },
		oninit: function(options) {
			this.on('mark', function(e, cell) {
				airconsole.sendEvent(AirConsole.SCREEN, 'mark', { 'mark': cell });

				return false;
			});

			this.on('bingo', function(e, cell) {
				airconsole.sendEvent(AirConsole.SCREEN, 'bingo', { 'bingo': true });

				return false;
			});

			airconsole.on('marked', (function(deviceId, data) {
				this.get('model').markCellByValue(data.marked.value);

				if (this.get('model').bingoAvailable) {
					airconsole.sendEvent(AirConsole.SCREEN, 'bingoAvailable', { 'bingoAvailable': true });
				}

				if (this.get('model').nearlyBingo) {
					airconsole.sendEvent(AirConsole.SCREEN, 'nearlyBingo', { 'nearlyBingo': true });
				}
			}).bind(this));

			airconsole.on('reset', (function(deviceId, data) {
				this.get('model').reset();
			}).bind(this));
		}
	});
})();