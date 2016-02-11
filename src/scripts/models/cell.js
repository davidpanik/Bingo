(function() {
	'use strict';

	var Cell = function(value) {
		this.value = value || 0;
		this.marked = false;
	};

	module.exports = Cell;
})();