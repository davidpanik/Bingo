(function() {
	'use strict';

	var EventHandler = function() {
		this.events = [];
	};

	EventHandler.prototype.on = function(identifier, callback) {
		if (!this.events[identifier]) {
			this.events[identifier] = {};
		}

		var randomId = function(chars) {
			chars = chars || 15;
			return (Math.random() + 1).toString(36).substring(2, chars);
		};

		var id = randomId();
		this.events[identifier][id] = callback;

		return id;
	};

	EventHandler.prototype.off = function(id) {
		for (var identifier in this.events) {
			for (var eventId in this.events[identifier]) {
				if (eventId === id) {
					this.events[identifier][eventId] = null;
				}
			}
		}
	};

	EventHandler.prototype.trigger = function(identifier) {
		var newArguments = [];
		for (var x = 1; x < arguments.length; x++) {
			newArguments.push(arguments[x]);
		}

		if (this.events[identifier]) {
			for (var event in this.events[identifier]) {
				this.events[identifier][event].apply(this, newArguments);
			}
		}

		return this;
	};

	module.exports = EventHandler;
})();