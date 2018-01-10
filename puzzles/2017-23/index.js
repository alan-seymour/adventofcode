const _ = require('lodash');

const splitLines = input => input.split(/\r?\n/);

const commandActions = {
  set: ({ registers, position }, register, value) => {
    registers[register] = value;
    return { registers, position: position + 1 };
  },
  sub: ({ registers, position }, register, value) => {
    registers[register] -= value;
    return { registers, position: position + 1 };
  },
  mul: ({ registers, position }, register, value) => {
    registers[register] *= value;
    return { registers, position: position + 1 };
  },
  jnz: ({ registers, position }, register, value) => {
    if (register === 1 || registers[register] !== 0) {
      return { registers, position: position + value };
    }
    return { registers, position: position + 1 };
  },
};

const solve = (commands, state) => {
  let counter = 0;
  while (state.position < commands.length && state.position >= 0) {
    let [command, register, value] = commands[state.position];
    if (value.match(/[a-z]/)) {
      value = state.registers[value];
    }
    if (command === 'mul') {
      counter += 1;
    }
    state = commandActions[command](state, register, parseInt(value, 10));
    // console.log(state);
  }

  return [counter, state.registers.h];
};

const isPrime = (num) => {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

// Without seeing other users inputs, not sure how portable this is
const part2 = (commands) => {
  console.log(commands[0][2], commands[4][2], commands[5][2]);
  const lowerBounds = (parseInt(commands[0][2], 10) * parseInt(commands[4][2], 10)) - parseInt(commands[5][2], 10);
  const upperBounds = lowerBounds + 17000;
  let count = 0;
  console.log(lowerBounds);
  for (let i = lowerBounds; i <= upperBounds; i += 17) {
    if (!isPrime(i)) {
      count += 1;
    }
  }
  return count;
};

module.exports = (part, data) => {
  const lines = splitLines(data).map(line => line.trim());
  const commands = lines.map(line => line.split(/\s/));
  const state = {
    registers: {
      a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0,
    },
    position: 0,
  };
  if (part === 1) {
    return solve(commands, state)[0];
  }
  state.registers.a = 1;
  return part2(commands);
};
