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
				airconsole.sendEvent(AirConsole.SCREEN, 'mark', cell);

				return false;
			});

			this.on('bingo', function(e, cell) {
				airconsole.sendEvent(AirConsole.SCREEN, 'bingo', {});

				return false;
			});

			airconsole.on('marked', (function(deviceId, cell) {
				this.get('model').markCellByValue(cell.value);

				if (this.get('model').bingoAvailable) {
					airconsole.sendEvent(AirConsole.SCREEN, 'bingoAvailable', {});
				}

				if (this.get('model').nearlyBingo) {
					airconsole.sendEvent(AirConsole.SCREEN, 'nearlyBingo', {});
				}
			}).bind(this));

			airconsole.on('reset', (function(deviceId, data) {
				this.get('model').reset();
			}).bind(this));
		}
	});
})();