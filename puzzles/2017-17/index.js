
const part1 = (stepSize, limit) => {
  let currentPos = 0;
  const buffer = [0];
  for (let i = 1; i <= limit; i++) {
    currentPos = (currentPos + stepSize + 1) % buffer.length;
    buffer.splice(currentPos + 1, 0, i);
  }
  return buffer[currentPos + 2];
};

const part2 = (stepSize, limit) => {
  let currentPos = 0;
  let next;
  for (let i = 1; i <= limit; i++) {
    currentPos = (currentPos + stepSize + 1) % i;
    if (currentPos === 0) {
      next = i;
    }
  }
  return next;
};

module.exports = (part, data) => {
  const step = parseInt(data, 10);
  if (part === 1) {
    return part1(step, 2017);
  }
  return part2(step, 50000000);
};
