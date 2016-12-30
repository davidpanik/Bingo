(function() {
	'use strict';

	module.exports = function(airconsole, pubSub) {
		var PlayersModel = require('../models/players');

		var gamesPlayed = 0;

		var PlayersView = Ractive.extend({
			template: '#playersTemplate',
			magic: true,
			data: { model: new PlayersModel(), airconsoleEvents: [], pubsubEvents: [] },
			oninit: function() {
				this.get('airconsoleEvents').push(
					airconsole.on('changeState', (function(deviceId, state) {
						this.get('model').changeState(deviceId, state);
					}).bind(this))
				);

				this.get('pubsubEvents').push(
					pubSub.on('gotBingo', (function(deviceId) {
						this.get('model').recordWin(deviceId);
						this.get('model').changeState(deviceId, 'gotBingo');
					}).bind(this))
				);

				this.get('airconsoleEvents').push(
					airconsole.on('requestNewGame', (function() {
						function startGame() {
							airconsole.broadcastEvent('goto', 'game');
							airconsole.broadcastEvent('newGame');
							pubSub.trigger('goto', 'game');
						}

						// Show an ad after every 2 games
						if (gamesPlayed > 0 && gamesPlayed % 2 === 0) {
							airconsole.showAd();
							airconsole.onAdComplete = function(ad_was_shown) {
								if (ad_was_shown) {
									startGame();
								}
							};
						} else {
							startGame();
						}

						gamesPlayed++;
					}).bind(this))
				);

				this.get('airconsoleEvents').push(
					airconsole.on('newGame', (function() {
						this.get('model').reset();
					}).bind(this))
				);

				airconsole.onConnect = (function(deviceId) {
					if (this.get('model').maxReached) {
						airconsole.sendEvent(deviceId, 'maxPlayers');
					} else {
						var newPlayer = this.get('model').add(
							deviceId,
							airconsole.getNickname(deviceId),
							airconsole.getProfilePicture(deviceId, 128)
						);

						airconsole.sendEvent(deviceId, 'setColour', newPlayer.colour);

						var host = this.get('model').getHost();
						airconsole.sendEvent(host, 'setHost');
					}

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
				while (this.get('airconsoleEvents').length) {
					airconsole.off(this.get('airconsoleEvents').pop());
				}

				while (this.get('pubsubEvents').length) {
					airconsole.off(this.get('pubsubEvents').pop());
				}

			}
		});

		return PlayersView;
	};
})();