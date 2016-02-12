(function() {
	'use strict';

	module.exports = function(airconsole, pubSub) {
		var CallerModel = require('../models/caller');

		var CallerView = Ractive.extend({
			template: '#callerTemplate',
			magic: true,
			data: function() { return new CallerModel(); },
			oninit: function() {
				airconsole.on('bingo', (function(deviceId, data) {
					if (!this.get().bingoCalled) {
						this.get().winner = airconsole.getNickname(deviceId);
						pubSub.trigger('gotBingo', deviceId);

						this.get().stop();
					}
				}).bind(this));

				airconsole.on('mark', (function(deviceId, cell) {
					if (this.get().hasBeenCalled(cell.value)) {
						airconsole.sendEvent(deviceId, 'marked', cell);
					}
				}).bind(this));

				pubSub.on('reset', (function() {
					this.get().reset().start();
				}).bind(this));
			}
		});

		return CallerView;
	};
})();