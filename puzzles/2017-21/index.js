const _ = require('lodash');

const startingImage = '.#./..#/###';
// const startingImage = '#./..';

const splitLines = input => input.split(/\r?\n/);

const parseRule = (line) => {
  const [fullMatch, input, output] = line.match(/(.*) => (.*)/);
  return { input: input.trim(), output: output.trim() };
};

const gridToString = (grid) => {
  const output = grid.reduce((prev, curr) => {
    const line = curr.reduce((prev2, curr2) => `${prev2}${curr2}`, '');
    return `${prev}${line}/`;
  }, '');
  return output.slice(0, -1);
};

const stringToGrid = string => string.split('/').map(line => line.split(''));

const flipGrid = grid => _.cloneDeep(grid).map(line => line.reverse());

const rotateGrid = (grid) => {
  const output = _.cloneDeep(grid);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      output[i][j] = grid[j][i];
    }
  }
  return flipGrid(output);
};

const getPermutations = (grid) => {
  const output = [];
  output.push(grid);
  output.push(flipGrid(grid));
  for (let i = 0; i < 3; i++) {
    const rotated = rotateGrid(output[output.length - 2]);
    output.push(rotated);
    output.push(flipGrid(rotated));
  }
  return output;
};

const printGrid = (grid) => {
  grid.forEach(line => console.log(line.join('')));
  console.log('');
};

const enhanceGrid = (grid, rules) => {
  const permutations = getPermutations(grid);
  const stringPermutations = permutations.map(g => gridToString(g));
  const rule = rules.find(testingRule => stringPermutations.some(gridString => gridString === testingRule.input));
  return stringToGrid(rule.output);
};

// TODO convert to algorithmic method
const splitGrid = (grid) => {
  const grids = [];
  if (grid.length % 2 === 0) {
    // split into 2x2 grids
    for (let i = 0; i < grid.length; i += 2) {
      for (let j = 0; j < grid.length; j += 2) {
        grids.push([
          [grid[i][j], grid[i][j + 1]],
          [grid[i + 1][j], grid[i + 1][j + 1]],
        ]);
      }
    }
  } else {
    // split into 3x3 grids
    for (let i = 0; i < grid.length; i += 3) {
      for (let j = 0; j < grid.length; j += 3) {
        grids.push([
          [grid[i][j], grid[i][j + 1], grid[i][j + 2]],
          [grid[i + 1][j], grid[i + 1][j + 1], grid[i + 1][j + 2]],
          [grid[i + 2][j], grid[i + 2][j + 1], grid[i + 2][j + 2]],
        ]);
      }
    }
  }
  return grids;
};

const joinGrids = (grids) => {
  const gLength = grids[0].length;
  const length = Math.sqrt(grids.length) * gLength;
  const grid = [...Array(length).keys()].map(a => Array(length));
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const gridOffset = (Math.floor(j / gLength)) + ((Math.floor(i / gLength)) * length / gLength);
      const gi = i % gLength;
      const gj = j % gLength;
      grid[i][j] = grids[gridOffset][gi][gj];
    }
  }
  return grid;
};

const enhanceFullGrid = (grid, rules) => {
  const grids = splitGrid(grid);
  const enhanced = [];
  grids.forEach((g) => {
    enhanced.push(enhanceGrid(g, rules));
  });
  return joinGrids(enhanced);
};

// TODO need to rejoin grids into big grid after each enhancement,
// then split apart afterwards to handle case where is divisible by 2 and 3
const solve = (rules, iterations = 5) => {
  let grid = stringToGrid(startingImage);
  for (let i = 0; i < iterations; i++) {
    grid = enhanceFullGrid(grid, rules);
    // printGrid(grid);
  }

  return grid.reduce((count, curr) => curr.filter(c => c === '#').length + count, 0);
};

module.exports = (part, data) => {
  const rules = splitLines(data).map(line => parseRule(line));
  if (part === 1) {
    return solve(rules, 5);
  }
  return solve(rules, 18);
};
