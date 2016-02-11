(function() {
	'use strict';

	module.exports = function(airconsole, pubSub) {
		var PlayersModel = require('../models/players');

		var PlayersView = Ractive.extend({
			template: '#playersTemplate',
			magic: true,
			data: function() { return new PlayersModel(); },
			oninit: function() {
				airconsole.on('bingoAvailable', (function(deviceId, data) {
					this.get().changeState(deviceId, 'bingoAvailable', true);
				}).bind(this));

				airconsole.on('nearlyBingo', (function(deviceId, data) {
					this.get().changeState(deviceId, 'nearlyBingo', true);
				}).bind(this));

				pubSub.on('gotBingo', (function(deviceId) {
					this.get().recordWin(deviceId);
				}).bind(this));

				airconsole.onConnect = (function(deviceId) {
					this.get().add(
						deviceId,
						airconsole.getNickname(deviceId),
						airconsole.getProfilePicture(deviceId)
					);
				}).bind(this);

				airconsole.onDisconnect = (function(deviceId) {
					this.get().remove(deviceId);
				}).bind(this);
			}
		});

		return PlayersView;
	};
})();