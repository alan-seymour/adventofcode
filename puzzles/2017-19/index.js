const splitLines = input => input.split(/\r?\n/);
const splitCells = input => input.split('');

const findStart = path => ({ row: 0, col: path[0].indexOf('|') });

const move = {
  s: state => ({ row: state.row + 1, col: state.col, direction: 's' }),
  n: state => ({ row: state.row - 1, col: state.col, direction: 'n' }),
  w: state => ({ row: state.row, col: state.col - 1, direction: 'w' }),
  e: state => ({ row: state.row, col: state.col + 1, direction: 'e' }),
};

const nextSpace = (path, state) => {
  if (path[state.row][state.col] === '+') {
    if (state.direction === 'n' || state.direction === 's') {
      // check left and right for continuation
      if (path[state.row][state.col - 1].match(/[a-zA-Z-]/)) {
        // turn west
        state.direction = 'w';
      } else {
        state.direction = 'e';
      }
    } else if (path[state.row - 1][state.col].match(/[a-zA-Z|]/)) {
      state.direction = 'n';
    } else {
      state.direction = 's';
    }
  }
  return move[state.direction](state);
};

const solve = (path) => {
  let state = findStart(path);
  state.direction = 's';
  const output = [];
  let steps = 0;
  while (path[state.row][state.col] !== ' ' || path[state.row][state.col] === undefined) {
    if (path[state.row][state.col].match(/[A-Za-z]/)) {
      output.push(path[state.row][state.col]);
    }
    state = nextSpace(path, state);
    steps += 1;
  }
  return [output.join(''), steps];
};

module.exports = (part, data) => {
  const path = splitLines(data).map(line => splitCells(line));
  return solve(path)[part - 1];
};
