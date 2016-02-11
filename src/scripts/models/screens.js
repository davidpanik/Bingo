(function() {
	'use strict';

	var Screens = function() {
		this.current = 'loading';
	};

	Screens.prototype.goto = function(screen) {
		this.current = screen;
		return this;
	};

	Screens.prototype.onScreen = function(screen) {
		return (this.current === screen);
	};

	module.exports = Screens;
})();