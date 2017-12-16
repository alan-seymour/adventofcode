const splitInput = input => input.split(',').map(letter => letter.trim());
const parseCommand = (input) => {
  let [full, command, params] = input.match(/([sxp])(.*)/);
  if (command === 'x' || command === 'p') {
    params = params.split('/');
  }
  return { command, params };
};

const spin = (programs, count) => [...programs.slice(-count), ...programs.slice(0, programs.length - count)];

const exchange = (programs, [positionA, positionB]) => {
  const output = programs.slice();
  output[positionA] = programs[positionB];
  output[positionB] = programs[positionA];
  return output;
};

const partner = (programs, [programA, programB]) => {
  const positionA = programs.indexOf(programA);
  const positionB = programs.indexOf(programB);
  return exchange(programs, [positionA, positionB]);
};

const solve = (commands, start) => {
  const programs = start.split('');
  const finalState = commands.reduce((state, command) => {
    if (command.command === 's') {
      return spin(state, command.params);
    }
    if (command.command === 'x') {
      return exchange(state, command.params);
    }
    return partner(state, command.params);
  }, programs);
  return finalState.join('');
};

const cache = [];

module.exports = (part, data) => {
  const input = splitInput(data);
  const commands = input.map(command => parseCommand(command));
  const start = 'abcdefghijklmnop';
  if (part === 1) {
    return solve(commands, start);
  }
  let state = start;
  for (let i = 0; i < 1000000000; i++) {
    if (cache[state] !== undefined) {
      state = cache[state];
    } else {
      const endState = solve(commands, state);
      cache[state] = endState;
      state = endState;
    }
  }
  return state;
};
