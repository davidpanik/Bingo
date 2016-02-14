(function() {
	'use strict';

	module.exports = function(airconsole, pubSub) {
		var PlayersModel = require('../models/players');

		var PlayersView = Ractive.extend({
			template: '#playersTemplate',
			magic: true,
			data: { model: new PlayersModel() },
			oninit: function() {
				airconsole.on('bingoAvailable', (function(deviceId, data) {
					this.get('model').changeState(deviceId, 'bingoAvailable', true);
				}).bind(this));

				airconsole.on('nearlyBingo', (function(deviceId, data) {
					this.get('model').changeState(deviceId, 'nearlyBingo', true);
				}).bind(this));

				pubSub.on('gotBingo', (function(deviceId) {
					this.get('model').recordWin(deviceId);
				}).bind(this));

				airconsole.onConnect = (function(deviceId) {
					this.get('model').add(
						deviceId,
						airconsole.getNickname(deviceId),
						airconsole.getProfilePicture(deviceId)
					);
				}).bind(this);

				airconsole.onDisconnect = (function(deviceId) {
					this.get('model').remove(deviceId);
				}).bind(this);
			},
			onrender: function() {

			}
		});

		return PlayersView;
	};
})();