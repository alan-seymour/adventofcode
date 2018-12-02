const parseInput = input => input.split(/\r?\n/).map(v => v.trim());

const countLetterFrequency = (word) => {
  const freqs = word.split('').map(c => (word.match(new RegExp(`${c}`, 'gi'))).length);
  return freqs;
};

const containsDouble = frequencies => frequencies.includes(2);
const containsTriple = frequencies => frequencies.includes(3);

const part1 = (boxes) => {
  const freqs = boxes.map(box => countLetterFrequency(box));
  const doubles = freqs.filter(box => containsDouble(box));
  const triples = freqs.filter(box => containsTriple(box));

  return (doubles.length) * (triples.length);
};

const part2 = (boxes) => {
  const strlength = boxes[0].length;
  for (let i = 0; i < boxes.length - 1; i++) {
    for (let j = 1; j < boxes.length; j++) {
      const diff = [];
      for (let k = 0; k < strlength; k++) {
        if (boxes[i].charAt(k) !== boxes[j].charAt(k)) {
          diff.push(k);
        }
        if (diff.length >= 2) {
          break;
        }
      }
      if (diff.length === 1) {
        return `${boxes[i].slice(0, diff[0])}${boxes[i].slice(diff[0] + 1)}`;
      }
    }
  }
};

module.exports = (part, data) => {
  const input = parseInput(data);
  if (part === 1) {
    return part1(input);
  }
  return part2(input);
};
