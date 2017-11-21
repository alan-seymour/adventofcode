const { getArgs, getData } = require('./helpers.js');
const solutions = require('./puzzles');
const solve = require('./app');

const argv = process.argv.slice(2);

const runSolver = async (args) => {
  const solver = solutions[`${args.year}${args.day}`];
  if (solver === undefined) {
    console.error('Not Yet Solved');
  } else {
    try {
      const data = await getData(args.fileName);
      console.log(solve(solver, args.part, data));
    } catch (e) {
      console.error('Error Solving');
      console.error(e.message);
    }
  }
};

runSolver(getArgs(argv));
