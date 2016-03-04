(function() {
	'use strict';

	module.exports = function(airconsole, pubSub) {
		var CallerModel = require('../models/caller')(pubSub);

		var CallerView = Ractive.extend({
			template: '#callerTemplate',
			magic: true,
			data: { model: new CallerModel(), airconsoleEvents: [], pubsubEvents: [] },
			oninit: function() {
				this.get('airconsoleEvents').push(
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

				this.get('airconsoleEvents').push(
					airconsole.on('mark', (function(deviceId, cell) {
						if (this.get('model').hasBeenCalled(cell.value)) {
							airconsole.sendEvent(deviceId, 'marked', cell);
						}
					}).bind(this))
				);

				this.get('pubsubEvents').push(
					pubSub.on('reset', (function() {
						this.get('model').reset().start();
					}).bind(this))
				);
			},
			onrender: function() {
				this.get('model').reset().start();
				pubSub.trigger('playSound', 'intro');
			},
			onunrender: function() {
				while (this.get('airconsoleEvents').length) {
					airconsole.off(this.get('airconsoleEvents').pop());
				}

				while (this.get('pubsubEvents').length) {
					airconsole.off(this.get('pubsubEvents').pop());
				}
			}
		});

		return CallerView;
	};
})();