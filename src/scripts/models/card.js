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

		if (this.checkForBingo()) {
			this.bingoAvailable = true;
		}
	};

	// TODO This needs to be better
	Card.prototype.markCellByValue = function(value) {
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

		// Check for rows
		if (this.grid.filter(function(line) {
			line = line.filter(function(cell) { return cell.marked; });
			return (line.length === this.size);
		}, this).length) {
			console.log('Found a row');
			return true;
		}

		// Check for columns
		if (this.grid[0].filter(function(column, index) {
			column = this.grid.filter(function(row) { return row[index].marked; });
			return (column.length === this.size);
		}, this).length) {
			console.log('Found a column');
			return true;
		}

		// Check for declining diagonals
		if (this.grid.filter(function(line, index) {
			return line[index].marked;
		}, this).length === this.size) {
			console.log('Found a declining diagonal');
			return true;
		}

		// Check for inclining diagonals
		if (this.grid.filter(function(line, index) {
			return line[this.size - 1 - index].marked;
		}, this).length === this.size) {
			console.log('Found an inclining diagonal');
			return true;
		}

		return false;
	};

	window.Bingo = window.Bingo || {};
	window.Bingo.Card = Card;
})();