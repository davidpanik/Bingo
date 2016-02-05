(function() {
	'use strict';

	var Cell = function(value) {
		this.value = value || 0;
		this.marked = false;
	};

	window.Bingo = window.Bingo || {};
	window.Bingo.Cell = Cell;
})();