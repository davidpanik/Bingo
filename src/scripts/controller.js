(function() {
	'use strict';

	require('./other/arrayShuffle');

	var airconsole = new AirConsole({ 'orientation': 'portrait' });

	airconsole.onMessage = function(deviceId, data) {
		this.dispatchEvent(deviceId, data);
	};

	var CardView = require('./views/card')(airconsole);

	var cardView = new CardView({
		el: '#cardPlaceHolder'
	});
})();