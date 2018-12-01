const parseInput = input => input.split(/\r?\n/).map(v => parseInt(v.trim(), 10));

const part1 = numbers => numbers.reduce((p, v) => p + v, 0);

const part2 = (numbers) => {
  const seen = new Set([]);
  let sum = 0;
  let iterator = 0;
  while (!seen.has(sum)) {
    seen.add(sum);
    sum += numbers[iterator % numbers.length];
    iterator += 1;
  }

  return sum;
};

module.exports = (part, data) => {
  const numbers = parseInput(data);
  if (part === 1) {
    return part1(numbers);
  }
  return part2(numbers);
};
