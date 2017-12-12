
const orderWord = word => word.split('').sort().join();

const splitWords = numberString => numberString.split(/\s/).map(v => orderWord(v.trim()));

const splitLines = input => input.split(/\r?\n/).map(v => v.trim());

const buildInputArrays = input => splitLines(input).map(v => splitWords(v));

const buildUniqueSentence = array => array.filter((v, i) => array.indexOf(v) === i);

const solve = lines => lines.filter(line => buildUniqueSentence(line).length === line.length).length;

module.exports = (part, data) => solve(buildInputArrays(data));

// code golfed
// module.exports = (part, data) => data.split(/\r?\n/).map(line => line.trim().split(/\s/).map(word => word.trim().split('').sort().join())).filter(line => line.filter((v, i) => line.indexOf(v) === i).length === line.length).length;
