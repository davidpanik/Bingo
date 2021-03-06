(function() {
	'use strict';

	Ractive.DEBUG = false;

	require('./other/arrayShuffle');

	var airconsole = new AirConsole({ 'orientation': 'portrait' });

	navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

	airconsole.onMessage = function(deviceId, data) {
		this.dispatchEvent(deviceId, data);
	};

	var Events = require('./other/events');
	var pubSub = new Events();

	var CardView = require('./views/card')(airconsole);

	var ScreensView = require('./views/screens')(airconsole, pubSub);
	var screensView = new ScreensView({
		el: '#content',
		components: {
			'card': CardView
		},
		oninit: function() {
			this.addListeners();

			this.get('model').goto('home');

			this.on('start', function(e, cell) {
				airconsole.broadcastEvent('requestNewGame');

				return false;
			});

			airconsole.on('setHost', (function(deviceId) {
				this.set('custom.host', true);
			}).bind(this));

			airconsole.on('setWinner', (function(deviceId, winnerId) {
				if (winnerId === airconsole.getDeviceId()) {
					this.set('custom.winnerName', 'You');
				} else {
					this.set('custom.winnerName', airconsole.getNickname(winnerId));
				}

				this.set('custom.winnerImage', airconsole.getProfilePicture(winnerId, 512));
			}).bind(this));

			airconsole.on('setColour', (function(deviceId, colour) {
				this.set('custom.colour', colour);
			}).bind(this));

			airconsole.on('maxPlayers', (function(deviceId) {
				this.get('model').goto('maxPlayers');
			}).bind(this));
		}
	});
})();