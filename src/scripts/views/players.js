(function() {
	'use strict';

	module.exports = function(airconsole, pubSub) {
		var PlayersModel = require('../models/players');

		var PlayersView = Ractive.extend({
			template: '#playersTemplate',
			magic: true,
			data: { model: new PlayersModel(), events: [] },
			oninit: function() {
				this.get('events').push(
					airconsole.on('changeState', (function(deviceId, state) {
						this.get('model').changeState(deviceId, state);
					}).bind(this))
				);

				pubSub.on('gotBingo', (function(deviceId) {
					this.get('model').recordWin(deviceId);
					this.get('model').changeState(deviceId, 'gotBingo');
				}).bind(this));

				this.get('events').push(
					airconsole.on('newGame', (function() {
						this.get('model').reset();
					}).bind(this))
				);

				airconsole.onConnect = (function(deviceId) {
					var newPlayer = this.get('model').add(
						deviceId,
						airconsole.getNickname(deviceId),
						airconsole.getProfilePicture(deviceId, 128)
					);

					airconsole.sendEvent(deviceId, 'setColour', newPlayer.colour);

					var host = this.get('model').getHost();
					airconsole.sendEvent(host, 'setHost');
				}).bind(this);

				airconsole.onDisconnect = (function(deviceId) {
					this.get('model').remove(deviceId);

					var host = this.get('model').getHost();
					airconsole.sendEvent(host, 'setHost');
				}).bind(this);
			},
			onrender: function() {

			},
			onunrender: function() {
				while (this.get('events').length) {
					airconsole.off(this.get('events').pop());
				}
			}
		});

		return PlayersView;
	};
})();