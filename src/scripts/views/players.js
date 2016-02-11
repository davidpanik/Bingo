(function() {
	'use strict';

	var PlayersView = Ractive.extend({
		template: '#playersTemplate',
		magic: true
	});

	module.exports = PlayersView;
})();