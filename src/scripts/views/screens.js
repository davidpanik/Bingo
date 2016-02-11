(function() {
	'use strict';

	module.exports = function(airconsole, pubSub) {
		var ScreensModel = require('../models/screens');

		var ScreensView = Ractive.extend({
			template: '#screensTemplate',
			magic: true,
			data: { model: new ScreensModel() },
			oninit: function() {
				setTimeout((function() {
					this.get('model').goto('home');
				}).bind(this), 1000);
			}
		});

		return ScreensView;
	};
})();