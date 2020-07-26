import _ from 'lodash';

// Creates a Generation of cells
// (width: Number, height: Number) => Generation
export function Generation(width = 10, height = 10) {
  return _.times(height, () => _.times(width, () => 0));
}

// Creates next generation of cells
// (generation: Generation) => Generation
export function nextGeneration(generation) {
	const nextGeneration = generation.map((row, rowNum) => {
		return row.map((cell, colNum) => nextGenCell(generation, rowNum, colNum));
	});

	// Remove padding before returning result
  return nextGeneration;
}

// Returns the next generation of a cell
// (generation: Array, row: Number, col: Number) => Number
function nextGenCell(generation, row, col) {
	// Get cells that are a neighbor of this cell
	const isAlive = !!generation[row][col];
	const neighbors = getNeighbors(generation, row, col);
	const liveCount = _.sum(neighbors);

	if (isAlive) {
		// Any live cell with fewer than two live neighbors dies (underpopulation)
		// Any live cell with more than three live neighbors dies (overpopulation)
		// Any live cell with two or three live neighbors lives on to the next generation
		return liveCount < 2 || liveCount > 3 ? 0 : 1;
	} else {
		// Any dead cell with exactly three live neighbors becomes a live cell (reproduction)
		return liveCount === 3 ? 1 : 0;
	}
}

// Gets the neighbors of a cell in a generation
// (generation: Generation, row: Number, col: Number) => Array
function getNeighbors(generation, row, col) {
	if (!generation.length) return [];

	const isLeft = row === 0;
	const isRight = row === generation.length - 1;
	const isTop = col === 0;
	const isBot = col === generation[0].length - 1;

	return _.compact([
		isLeft ? null : generation[row - 1][col], // Left
		isLeft || isTop ? null : generation[row - 1][col - 1], // Top Left
		isTop ? null : generation[row][col - 1], // Top
		isTop || isRight ? null : generation[row + 1][col - 1], // Top Right
		isRight ? null : generation[row + 1][col], // Right
		isRight || isBot ? null : generation[row + 1][col + 1], // Right Bottom
		isBot ? null : generation[row][col + 1], // Bottom,
		isBot || isLeft ? null : generation[row - 1][col + 1], // Bottom Left
	]);
}
