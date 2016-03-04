(function() {
	'use strict';

	module.exports = function(airconsole) {
		var CardModel = require('../models/card');

		var CardView = Ractive.extend({
			template: '#cardTemplate',
			magic: true,
			data: { model: new CardModel(), airconsoleEvents: [] },
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

				this.get('airconsoleEvents').push(
					airconsole.on('marked', (function(deviceId, cell) {
						this.get('model').markCellByValue(cell.value);

						airconsole.sendEvent(AirConsole.SCREEN, 'changeState', this.get('model').state);
					}).bind(this))
				);

				this.get('airconsoleEvents').push(
					airconsole.on('reset', (function(deviceId, data) {
						this.get('model').reset();
					}).bind(this))
				);
			},
			onrender: function() {
				this.get('model').reset();
			},
			onunrender: function() {
				while (this.get('airconsoleEvents').length) {
					airconsole.off(this.get('airconsoleEvents').pop());
				}
			}
		});

		return CardView;
	};
})();