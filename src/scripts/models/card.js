(function() {
	'use strict';

	var CellModel = require('./cell');

	var Card = function(size, range) {
		this.size = size || 5;
		this.range = range || 75;

		this.reset();

		return this;
	};

	Card.prototype.reset = function() {
		this.grid = [];
		this.bingoAvailable = false;
		this.nearlyBingo = false;

		var ranges = Array.apply(null, Array(this.size)).map(function() { return []; });

		for (var z = 0; z < this.range; z++) {
			ranges[Math.floor(z / (this.range / this.size))].push(z + 1);
		}

		ranges.forEach(function(subrange) {
			subrange.shuffle().splice(0, subrange.length - this.size);
		}, this);

		for (var x = this.size; x > 0; x--) {
			var row = [];

			for (var y = this.size; y > 0; y--) {
				row.push(new CellModel(ranges[this.size-y][this.size-x]));
			}

			this.grid.push(row);
		}

		return this;
	};

	Card.prototype.markCell = function(cell) {
		cell.marked = true;
		this.checkForBingo();
	};

	Card.prototype.markCellByValue = function(value) {
		this.grid.forEach(function(row) {
			row.forEach(function(cell) {
				if (cell.value === value) {
					this.markCell(cell);
				}
			}, this);
		}, this);
	};

	Card.prototype.checkForBingo = function() {
		// Fake a row - this.grid[0].forEach(function(current) { current.marked = true; });
		// Fake a column - this.grid.forEach(function(current) { current[0].marked = true; });
		// Fake a declining diagonal - for (var x = 0; x < this.size; x++) { this.grid[x][x].marked = true; }
		// Fake a inclining diagonal - for (var x = 0; x < this.size; x++) { this.grid[this.size - 1 - x][x].marked = true; }

		var checkLength = (function(n) {
			if (n === this.size) {
				this.bingoAvailable = true;
			} else if (n >= Math.floor(this.size * 0.8)) {
				this.nearlyBingo = true;
			}
		}).bind(this);

		// Check for rows
		this.grid.forEach(function(row) {
			row = row.filter(function(cell) { return cell.marked; });
			checkLength(row.length);
		});

		// Check for columns
		this.grid[0].forEach(function(column, index) {
			column = this.grid.filter(function(row) { return row[index].marked; });
			checkLength(column.length);
		}, this);

		// Check for declining diagonals
		checkLength(this.grid.filter(function(row, index) {
			return row[index].marked;
		}, this).length);

		// Check for inclining diagonals
		checkLength(this.grid.filter(function(row, index) {
			return row[this.size - 1 - index].marked;
		}, this).length);

		return this;
	};

	module.exports = Card;
})();