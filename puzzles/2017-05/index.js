const _ = require('lodash');

const splitLines = numberString => numberString.split(/\r?\n/).map(v => parseInt(v.trim(), 10));

const part1Incrementer = (v => v + 1);
const part2Incrementer = (v => ((v >= 3) ? (v - 1) : (v + 1)));


const traceMaze = (data, incrementer) => {
  let position = 0;
  let steps = 0;
  let jump = 0;
  while (position < data.length) {
    jump = data[position];
    data[position] = incrementer(data[position]);
    steps += 1;
    position += jump;
  }
  return steps;
};

module.exports = (part, data) => {
  const instructions = splitLines(data);
  if (part === 1) {
    return traceMaze(instructions, part1Incrementer);
  }
  return traceMaze(instructions, part2Incrementer);
};
