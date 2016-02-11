(function() {
	'use strict';

	module.exports = function(airconsole, pubSub) {
		var CallerModel = require('../models/caller');

		var CallerView = Ractive.extend({
			template: '#callerTemplate',
			magic: true,
			data: { model: new CallerModel() },
			oninit: function() {
				airconsole.on('bingo', (function(deviceId, data) {
					if (!this.get('model').bingoCalled) {
						alert(airconsole.getNickname(deviceId) + ' got bingo!');

						pubSub.trigger('gotBingo', deviceId);

						this.get('model').stop();
					}
				}).bind(this));

				airconsole.on('mark', (function(deviceId, cell) {
					if (this.get('model').hasBeenCalled(cell.value)) {
						airconsole.sendEvent(deviceId, 'marked', cell);
					}
				}).bind(this));

				pubSub.on('reset', (function() {
					this.get('model').reset().start();
				}).bind(this));
			}
		});

		return CallerView;
	};
})();