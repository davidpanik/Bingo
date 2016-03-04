(function() {
	'use strict';

	module.exports = function(airconsole, pubSub) {
		var CallerModel = require('../models/caller')(pubSub);

		var CallerView = Ractive.extend({
			template: '#callerTemplate',
			magic: true,
			data: { model: new CallerModel(), events: [] },
			oninit: function() {
				this.get('events').push(
					airconsole.on('bingo', (function(deviceId) {
						if (!this.get('model').bingoCalled) {
							pubSub.trigger('gotBingo', deviceId);

							pubSub.trigger('setWinner', deviceId);
							pubSub.trigger('goto', 'postGame');

							airconsole.broadcastEvent('setWinner', deviceId);
							airconsole.broadcastEvent('goto', 'postGame');

							pubSub.trigger('playSound', 'winner');

							this.get('model').stop();
						}
					}).bind(this))
				);

				this.get('events').push(
					airconsole.on('mark', (function(deviceId, cell) {
						if (this.get('model').hasBeenCalled(cell.value)) {
							airconsole.sendEvent(deviceId, 'marked', cell);
						}
					}).bind(this))
				);

				pubSub.on('reset', (function() {
					this.get('model').reset().start();
				}).bind(this));
			},
			onrender: function() {
				this.get('model').reset().start();
				pubSub.trigger('playSound', 'intro');
			},
			onunrender: function() {
				while (this.get('events').length) {
					airconsole.off(this.get('events').pop());
				}
			}
		});

		return CallerView;
	};
})();