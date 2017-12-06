const _ = require('lodash');

const splitString = numberString => numberString.split(/\s/).map(v => parseInt(v.trim(), 10));
const findDuplicate = (banks, history) => history.findIndex(v => _.isEqual(v, banks));
const findLargest = banks => banks.indexOf(Math.max(...banks));

const step = (banks) => {
  const cloned = _.clone(banks);
  const largestBank = findLargest(cloned);
  const pool = cloned[largestBank];
  cloned[largestBank] = 0;
  for (let i = largestBank + 1; i <= largestBank + pool; i++) {
    cloned[i % cloned.length] += 1;
  }
  return cloned;
};

const solve = (banks) => {
  const history = [];
  let dupeIndex = -1;
  while (dupeIndex === -1) {
    history.push(banks);
    banks = step(banks);
    dupeIndex = findDuplicate(banks, history);
  }
  return { steps: history.length, dupeIndex };
};

module.exports = (part, data) => {
  const banks = splitString(data);
  const { steps, dupeIndex } = solve(banks);

  if (part === 1) {
    return steps;
  }

  return steps - dupeIndex;
};
