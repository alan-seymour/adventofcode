const should = require('should');
const { getArgs } = require('./helpers.js');
const solutions = require('./puzzles');
const tests = require('./puzzles/test');
const solve = require('./app');

const argv = process.argv.slice(2);
const args = getArgs(argv);

const solver = solutions[`${args.year}${args.day}`];
const { testCases } = tests[`${args.year}${args.day}`];

let failCount = 0;

testCases.forEach(({ input, output, part }, index) => {
  const result = solve(solver, part, input);
  try {
    should(result).equal(output);
  } catch (e) {
    console.error(`Test #${index}: ${e.message}`);
    failCount += 1;
  }
});
if (!failCount) {
  console.log('All Tests Passed');
} else {
  console.error(`${failCount} Tests Failed`);
}
