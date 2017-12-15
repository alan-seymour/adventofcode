const splitInput = input => input.split(/\s/).map(letter => letter.trim());

const genAFactor = 16807;
const genBFactor = 48271;

const divisor = 2147483647;

const calcNext = (prev, factor, mod) => {
  let acceptable = false;
  while (!acceptable) {
    prev = (prev * factor) % divisor;
    acceptable = (prev % mod) === 0;
  }
  return prev;
};

const solve = ([aPrev, bPrev], iterations, aTest = 1, bTest = 1) => {
  const matches = [];
  for (let i = 0; i < iterations; i++) {
    aPrev = calcNext(aPrev, genAFactor, aTest);
    bPrev = calcNext(bPrev, genBFactor, bTest);
    const aBinary = aPrev.toString(2).slice(-16);
    const bBinary = bPrev.toString(2).slice(-16);
    if (aBinary === bBinary) {
      matches.push({ a: aPrev, b: bPrev });
    }
  }
  return matches.length;
};

module.exports = (part, data) => {
  const input = splitInput(data);
  if (part === 1) {
    return solve(input, 40000000);
  }
  return solve(input, 5000000, 4, 8);
};
