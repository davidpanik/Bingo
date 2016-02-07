(function() {
	'use strict';

	var Screens = function() {
		this.current = 'loading';
	};

	Screens.prototype.goto = function(screen) {
		this.current = screen;
		return this;
	};

	window.Bingo = window.Bingo || {};
	window.Bingo.Screens = Screens;
})();