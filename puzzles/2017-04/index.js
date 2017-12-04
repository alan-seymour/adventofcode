const _ = require('lodash');

const splitWords = numberString => numberString.split(/\s/).map(v => v.trim());

const splitLines = input => input.split(/\r?\n/).map(v => v.trim());

const buildInputArrays = input => splitLines(input).map(v => splitWords(v));

const decomposeWord = word => word.split('').reduce((prev, curr) => _.defaults({ [curr]: (prev[curr] || 0) + 1 }, prev), {});

const buildUniqueSentence = array => array.filter((v, i) => array.indexOf(v) === i);

const part1 = lines => lines.filter(line => buildUniqueSentence(line).length === line.length).length;

const part2 = lines => lines.filter((line) => {
  const decomposedWords = line.map(word => decomposeWord(word));
  return decomposedWords.map(word => decomposedWords.filter(compareWord => _.isEqual(compareWord, word)).length).filter(v => v > 1).length === 0;
}).length;

module.exports = (part, data) => {
  const lines = buildInputArrays(data);
  if (part === 1) {
    return part1(lines);
  }
  return part2(lines);
};
