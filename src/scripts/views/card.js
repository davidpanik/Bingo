(function() {
	'use strict';

	module.exports = function(airconsole) {
		var CardModel = require('../models/card');

		var CardView = Ractive.extend({
			template: '#cardTemplate',
			magic: true,
			data: { model: new CardModel(), airconsoleEvents: [] },
			oninit: function(options) {
				this.on('mark',
					(function(e, cell) {
						if (!cell.marked) {
							if (this.get('model').hasBeenCalled(cell.value)) {
								this.get('model').markCellByValue(cell.value);
								if (this.get('model').stateChanged) {
									airconsole.sendEvent(AirConsole.SCREEN, 'changeState', this.get('model').state);
									this.get('model').stateChanged = false;
								}
							} else {
								// Player tapped a number that hasn't been called
							}
						}

						return false;
					}).bind(this)
				);

				this.on('bingo', function(e, cell) {
					airconsole.sendEvent(AirConsole.SCREEN, 'bingo', {});

					return false;
				});

				this.get('airconsoleEvents').push(
					airconsole.on('reset', (function(deviceId, data) {
						this.get('model').reset();
					}).bind(this))
				);

				this.get('airconsoleEvents').push(
					airconsole.on('numberCalled', (function(deviceId, number) {
						this.get('model').addCalled(number);
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