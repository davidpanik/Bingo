(function() {
	'use strict';

	module.exports = function(airconsole) {
		var CardModel = require('../models/card');

		var CardView = Ractive.extend({
			template: '#cardTemplate',
			magic: true,
			data: function() { return new CardModel(); },
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
					this.get().markCellByValue(cell.value);

					if (this.get().bingoAvailable) {
						airconsole.sendEvent(AirConsole.SCREEN, 'bingoAvailable', {});
					}

					if (this.get().nearlyBingo) {
						airconsole.sendEvent(AirConsole.SCREEN, 'nearlyBingo', {});
					}
				}).bind(this));

				airconsole.on('reset', (function(deviceId, data) {
					this.get().reset();
				}).bind(this));
			}
		});

		return CardView;
	};
})();