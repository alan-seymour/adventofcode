const _ = require('lodash');

const gridSize = 1999;

const splitLines = input => input.split(/\r?\n/);

const padLine = (line) => {
  const padSize = (gridSize - line.length) / 2;
  return line.padStart(padSize + line.length, '.').padEnd(gridSize, '.');
};

const printGrid = (grid) => {
  grid.forEach(line => console.log(line.join('')));
};

const directions = ['up', 'right', 'down', 'left'];

const move = {
  up: ant => ({ row: ant.row - 1, col: ant.col, dir: ant.dir }),
  right: ant => ({ row: ant.row, col: ant.col + 1, dir: ant.dir }),
  down: ant => ({ row: ant.row + 1, col: ant.col, dir: ant.dir }),
  left: ant => ({ row: ant.row, col: ant.col - 1, dir: ant.dir }),
};

const turnAnt = (ant, grid) => {
  const dirIndex = directions.indexOf(ant.dir);
  if (grid[ant.row][ant.col] === '#') {
    return { row: ant.row, col: ant.col, dir: directions[(dirIndex + 1) % 4] };
  } else if (grid[ant.row][ant.col] === 'w') {
    return { row: ant.row, col: ant.col, dir: ant.dir };
  } else if (grid[ant.row][ant.col] === 'f') {
    return { row: ant.row, col: ant.col, dir: directions[(dirIndex + 2) % 4] };
  }
  return { row: ant.row, col: ant.col, dir: directions[(((dirIndex - 1) % 4) + 4) % 4] };
};

const updateGrid = (ant, grid, part = 1) => {
  if (grid[ant.row][ant.col] === '#') {
    if (part === 1) {
      grid[ant.row][ant.col] = '.';
    } else {
      grid[ant.row][ant.col] = 'f';
    }
  } else if (grid[ant.row][ant.col] === 'w') {
    grid[ant.row][ant.col] = '#';
  } else if (grid[ant.row][ant.col] === 'f') {
    grid[ant.row][ant.col] = '.';
  } else if (part === 1) {
    grid[ant.row][ant.col] = '#';
  } else {
    grid[ant.row][ant.col] = 'w';
  }
  return grid;
};

const solve = (grid, iterations = 10, part = 1) => {
  let ant = { row: Math.floor(gridSize / 2), col: Math.floor(gridSize / 2), dir: 'up' };
  let infected = 0;
  for (let i = 0; i < iterations; i++) {
    ant = turnAnt(ant, grid);
    grid = updateGrid(ant, grid, part);
    if (grid[ant.row][ant.col] === '#') {
      infected += 1;
    }
    ant = move[ant.dir](ant);
  }
  return infected;
};

module.exports = (part, data) => {
  const lines = splitLines(data).map(line => padLine(line.trim()));
  const blankLine = ''.padStart(gridSize, '.');
  const blankBlock = Array((gridSize - lines.length) / 2).fill(blankLine);
  const paddedLines = [...blankBlock, ...lines, ...blankBlock];
  const grid = paddedLines.map(line => line.split(''));
  if (part === 1) {
    return solve(grid, 10000, part);
  }
  return solve(grid, 10000000, part);
};
