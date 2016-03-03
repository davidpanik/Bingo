(function() {
	'use strict';

	module.exports = function(airconsole) {
		var CardModel = require('../models/card');

		var CardView = Ractive.extend({
			template: '#cardTemplate',
			magic: true,
			data: { model: new CardModel() },
			oninit: function(options) {
				this.on('mark', function(e, cell) {
					if (!cell.marked) {
						airconsole.sendEvent(AirConsole.SCREEN, 'mark', cell);
					}

					return false;
				});

				this.on('bingo', function(e, cell) {
					airconsole.sendEvent(AirConsole.SCREEN, 'bingo', {});

					return false;
				});

				airconsole.on('marked', (function(deviceId, cell) {
					this.get('model').markCellByValue(cell.value);

					airconsole.sendEvent(AirConsole.SCREEN, 'changeState', this.get('model').state);
				}).bind(this));

				airconsole.on('reset', (function(deviceId, data) {
					this.get('model').reset();
				}).bind(this));
			},
			onrender: function() {
				this.get('model').reset();
			}
		});

		return CardView;
	};
})();