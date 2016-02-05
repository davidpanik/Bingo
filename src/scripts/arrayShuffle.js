(function() {
	'use strict';

	Array.prototype.shuffle = function() {
		var randomSort = function() {
			return (0.5 - Math.random());
		};

		this.sort(randomSort);

		return this;
	};
})();