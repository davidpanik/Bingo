(function() {
	'use strict';

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
			var line = [];

			for (var y = this.size; y > 0; y--) {
				line.push(new Bingo.Cell(ranges[this.size-y][this.size-x]));
			}

			this.grid.push(line);
		}

		return this;
	};

	Card.prototype.markCell = function(cell) {
		cell.marked = true;
		this.checkForBingo();
	};

	// TODO This needs to be better
	Card.prototype.markCellByValue = function(value) {
		// TODO Get rid of self
		var self = this;
		this.grid.forEach(function(line) {
			line.forEach(function(cell) {
				if (cell.value === value) {
					self.markCell(cell);
				}
			});
		});
	};

	Card.prototype.checkForBingo = function() {
		// Fake a row - this.grid[0].forEach(function(current) { current.marked = true; });
		// Fake a column - this.grid.forEach(function(current) { current[0].marked = true; });
		// Fake a declining diagonal - for (var x = 0; x < this.size; x++) { this.grid[x][x].marked = true; }
		// Fake a inclining diagonal - for (var x = 0; x < this.size; x++) { this.grid[this.size - 1 - x][x].marked = true; }

		var checkLength = (function(n) {
			if (n === this.size) {
				this.bingoAvailable = true;
			} else if (n > Math.floor(this.size * 0.8)) {
				this.nearlyBingo = true;
			}
		}).bind(this);

		// Check for rows
		this.grid.forEach(function(line) {
			line = line.filter(function(cell) { return cell.marked; });
			checkLength(line.length);
		});

		// Check for columns
		this.grid[0].forEach(function(column, index) {
			column = this.grid.filter(function(row) { return row[index].marked; });
			checkLength(column.length);
		}, this);

		// Check for declining diagonals
		checkLength(this.grid.filter(function(line, index) {
			return line[index].marked;
		}, this).length);

		// Check for inclining diagonals
		checkLength(this.grid.filter(function(line, index) {
			return line[this.size - 1 - index].marked;
		}, this).length);

		return this;
	};

	window.Bingo = window.Bingo || {};
	window.Bingo.Card = Card;
})();