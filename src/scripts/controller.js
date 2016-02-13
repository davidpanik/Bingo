(function() {
	'use strict';

	require('./other/arrayShuffle');

	var airconsole = new AirConsole({ 'orientation': 'portrait' });

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
				airconsole.broadcastEvent('goto', 'game');
				pubSub.trigger('goto', 'game');
				return false;
			});

		}
	});
})();