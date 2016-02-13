(function() {
	'use strict';

	module.exports = function(airconsole, pubSub) {
		var ScreensModel = require('../models/screens');

		var ScreensView = Ractive.extend({
			template: '#screensTemplate',
			magic: true,
			data: { model: new ScreensModel() },
			oninit: function() {
				this.addListeners();
			},
			addListeners: function() {
				airconsole.on('goto', (function(deviceId, screen) {
					this.get('model').goto(screen);
				}).bind(this));

				pubSub.on('goto', (function(screen) {
					this.get('model').goto(screen);
				}).bind(this));
			}
		});

		return ScreensView;
	};
})();