const _ = require('lodash');

const splitLines = input => input.split(/\r?\n/).map(v => v.trim());

const comparisons = {
  '>': (a, b) => a > b,
  '<': (a, b) => a < b,
  '>=': (a, b) => a >= b,
  '<=': (a, b) => a <= b,
  '==': (a, b) => a === b,
  '!=': (a, b) => a !== b,
};

const operations = {
  inc: (a, b) => a + b,
  dec: (a, b) => a - b,
};

const deconstructInstruction = (line) => {
  const [
    full, register, action, change, comparisonRegister, comparisonOperator, comparisonValue,
  ] =
    line.match(/([a-z]+)\s([a-z]{3})\s([0-9-]+)\sif\s([a-z]+)\s([><=!]+)\s([0-9-]*)/);
  return {
    register, action, change: parseInt(change, 10), comparisonRegister, comparisonOperator, comparisonValue: parseInt(comparisonValue, 10),
  };
};

const passesComparison = (comparison, registerValue = 0, value) => comparisons[comparison](registerValue, value);

const modifyRegister = (instruction, oldValue = 0, change) => operations[instruction](oldValue, change);

const solve = (instructions) => {
  let max = 0;
  const finalRegisters = instructions.reduce((registers, instruction) => {
    if (passesComparison(instruction.comparisonOperator, registers[instruction.comparisonRegister], instruction.comparisonValue)) {
      registers[instruction.register] = modifyRegister(instruction.action, registers[instruction.register], instruction.change);
      if (registers[instruction.register] > max) {
        max = registers[instruction.register];
      }
    }
    return registers;
  }, {});
  const finalValues = Object.values(finalRegisters);
  return [Math.max(...finalValues), max];
};

module.exports = (part, data) => {
  const lines = splitLines(data);
  const instructions = lines.map(v => deconstructInstruction(v));
  const results = solve(instructions);
  return results[part - 1];
};
