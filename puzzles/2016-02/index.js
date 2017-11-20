const part1grid = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];
const part2grid = [
  ['*', '*', '1', '*', '*'],
  ['*', '2', '3', '4', '*'],
  ['5', '6', '7', '8', '9'],
  ['*', 'A', 'B', 'C', '*'],
  ['*', '*', 'D', '*', '*'],
];

const move = ({ x, y }, direction) => {
  switch (direction) {
    case 'U':
      return { x, y: y - 1 };
    case 'D':
      return { x, y: y + 1 };
    case 'R':
      return { x: x + 1, y };
    case 'L':
      return { x: x - 1, y };
    default:
      return { x, y };
  }
};

const isValidPosition = ({ x, y }, grid) => (x >= 0 && y >= 0) && (x < grid.length && y < grid.length) && (grid[y][x] !== '*');

const getDigitLocation = (moves, startingLocation, grid) => {
  const moveList = moves.split('');
  const digitLocation = moveList.reduce((prev, curr) => {
    const tempMove = move(prev, curr);
    if (isValidPosition(tempMove, grid)) {
      return tempMove;
    }
    return prev;
  }, startingLocation);
  return digitLocation;
};

const getDigits = (input, grid, start) => {
  let digitMoves = input.split(/\r?\n/);
  digitMoves = digitMoves.map(v => v.trim());
  const { location: _, code } = digitMoves.reduce((prev, curr) => {
    const newLocation = getDigitLocation(curr, prev.location, grid);
    return {
      location: newLocation,
      code: `${prev.code}${grid[newLocation.y][newLocation.x]}`,
    };
  }, { location: start, code: '' });
  return code;
};

module.exports = (part, data) => {
  let grid;
  let start;
  if (part === 1) {
    grid = part1grid;
    start = { x: 1, y: 1 };
  } else {
    grid = part2grid;
    start = { x: 0, y: 2 };
  }

  return getDigits(data, grid, start);
};
