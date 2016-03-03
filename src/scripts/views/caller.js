(function() {
	'use strict';

	module.exports = function(airconsole, pubSub) {
		var CallerModel = require('../models/caller')(pubSub);

		var CallerView = Ractive.extend({
			template: '#callerTemplate',
			magic: true,
			data: { model: new CallerModel() },
			oninit: function() {
				airconsole.on('bingo', (function(deviceId, data) {
					if (!this.get('model').bingoCalled) {
						pubSub.trigger('gotBingo', deviceId);

						pubSub.trigger('setWinner', deviceId);
						pubSub.trigger('goto', 'postGame');

						airconsole.broadcastEvent('setWinner', deviceId);
						airconsole.broadcastEvent('goto', 'postGame');

						pubSub.trigger('playSound', 'winner');

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
				pubSub.trigger('playSound', 'intro');
			}
		});

		return CallerView;
	};
})();