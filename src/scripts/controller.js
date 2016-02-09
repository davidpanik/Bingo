(function() {
	'use strict';

	var airconsole = new AirConsole({ 'orientation': 'portrait' });

	airconsole.onMessage = function(deviceId, data) {
		this.dispatchEvent(deviceId, data);
	};

	var card = new Bingo.Card();
	var cardView = new Bingo.CardView({
		el: '#cardPlaceHolder',
		data: { model: card },
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
		}
	});

	airconsole.on('reset', function(deviceId, data) {
		card.reset();
	});
})();