const rows = numberString => numberString.split(/\r?\n/).map(v => v.trim());

const part1 = (numbers) => {
  const diffs = numbers.map((line) => {
    const sorted = line.sort((a, b) => a - b);
    return sorted[sorted.length - 1] - sorted[0];
  });

  return diffs.reduce((prev, curr) => prev + curr, 0);
};

const part2 = (numbers) => {
  const divs = numbers.map((line) => {
    const sorted = line.sort((a, b) => a - b);
    for (let i = 0; i < sorted.length - 1; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        if (sorted[j] % sorted[i] === 0) {
          return [sorted[i], sorted[j]];
        }
      }
    }
    return [1, 1];
  });
  return divs.reduce((prev, curr) => prev + (curr[1] / curr[0]), 0);
};

module.exports = (part, data) => {
  const numberRows = rows(data);
  const numberArray = numberRows.map(v => v.split(/\s/).map(i => parseInt(i, 10)));
  if (part === 1) {
    return part1(numberArray);
  }
  return part2(numberArray);
};
