(function() {
	'use strict';

	module.exports = function(airconsole, pubSub) {
		var ScreensModel = require('../models/screens');

		var ScreensView = Ractive.extend({
			template: '#screensTemplate',
			magic: true,
			data: function() { return new ScreensModel(); },
			oninit: function() {
				setTimeout((function() {
					this.get().goto('home');
				}).bind(this), 1000);
			}
		});

		return ScreensView;
	};
})();