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
						this.get('model').winner = airconsole.getNickname(deviceId);
						pubSub.trigger('gotBingo', deviceId);
						airconsole.broadcastEvent('goto', 'postGame');
						airconsole.broadcastEvent('gotBingo', airconsole.getNickname(deviceId));

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
			},
			onrender: function() {
				this.get('model').reset().start();
			}
		});

		return CallerView;
	};
})();