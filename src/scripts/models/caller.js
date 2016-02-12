(function() {
	'use strict';

	var Caller = function(range, speed) {
		this.range = range || 75;
		this.speed = speed || 2000;

		this.reset();

		return this;
	};

	Caller.prototype.reset = function() {
		this.called = [];
		this.uncalled = [];
		this.current = 0;
		this.bingoCalled = false;
		this.winner = 0;

		this.uncalled = Array.apply(null, Array(this.range)).map(function(current, index) { return index + 1; });

		this.uncalled.shuffle();

		return this;
	};

	Caller.prototype.call = function() {
		if (this.uncalled.length > 0) {
			this.current = this.uncalled.pop();

			this.called.push(this.current);
		} else {
			console.log('Nothing left to call');
			this.stop();
		}

		return this;
	};

	Caller.prototype.stop = function() {
		clearInterval(this.timer);

		return this;
	};

	Caller.prototype.start = function() {
		this.stop();
		this.timer = setInterval(this.call.bind(this), this.speed);

		return this;
	};

	Caller.prototype.hasBeenCalled = function(value) {
		value = Number(value);
		return (this.called.indexOf(value) > -1);
	};

	module.exports = Caller;
})();