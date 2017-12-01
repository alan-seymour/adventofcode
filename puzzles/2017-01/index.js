const splitNumbers = numberString => numberString.split('').map(v => parseInt(v, 10));

const part1 = (numbers) => {
  const { sum } = numbers.reduce((prev, curr) => {
    if (prev.number === curr) {
      prev.sum += curr;
    }
    prev.number = curr;
    return prev;
  }, { sum: 0, number: numbers[numbers.length - 1] });
  return sum;
};

const part2 = (numbers) => {
  let sum = 0;
  const offset = numbers.length / 2;
  numbers.forEach((v, i) => {
    const partnerIndex = (i + offset) % numbers.length;
    const partner = numbers[partnerIndex];
    if (partner === v) {
      sum += v;
    }
  });
  return sum;
};

module.exports = (part, data) => {
  const numbers = splitNumbers(data);
  if (part === 1) {
    return part1(numbers);
  }
  return part2(numbers);
};
