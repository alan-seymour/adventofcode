const _ = require('lodash');

const splitString = input => input.split(',').map(v => parseInt(v, 10));

const asciiConvertInput = input => input.split('').map(v => v.charCodeAt(0));

const getSlice = (array, index, length) => {
  const output = [];
  for (let i = 0; i < length; i++) {
    output.push(array[(index + i) % array.length]);
  }
  return output;
};

const putSlice = (array, index, slice) => {
  const output = _.clone(array);
  slice.forEach((v, i) => {
    output[(index + i) % output.length] = v;
  });
  return output;
};

const solve = (lengths, iterations = 1) => {
  let list = Array.from(Array(256).keys());
  let position = 0;
  let skipSize = 0;
  for (let i = 0; i < iterations; i++) {
    for (let j = 0; j < lengths.length; j++) {
      const slice = getSlice(list, position, lengths[j]);
      const reversedSlice = _.clone(slice).reverse();
      list = putSlice(list, position, reversedSlice);
      position += lengths[j] + skipSize;
      skipSize += 1;
    }
  }
  return list;
};

const xOrArray = array => array.reduce((prev, curr) => prev ^ curr);

const part1 = (input) => {
  const sparseHash = solve(input, 1);
  return sparseHash[0] * sparseHash[1];
};

const part2 = (input) => {
  input.push(17, 31, 73, 47, 23);
  const sparseHash = solve(input, 64);
  const blocks = _.chunk(sparseHash, 16);
  const xored = blocks.map(block => xOrArray(block));
  const hex = xored.map(v => v.toString(16).padStart(2, '0'));
  return hex.join('');
};

module.exports = (part, data) => {
  if (part === 1) {
    const lengths = splitString(data);
    return part1(lengths);
  }
  const input = asciiConvertInput(data);
  return part2(input);
};

