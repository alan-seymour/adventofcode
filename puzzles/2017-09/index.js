const _ = require('lodash');

const handleGarbage = (input) => {
  const streamResult = input.split('').reduce((prev, curr) => {
    if (prev.characterNegated) {
      return {
        cleanStream: prev.cleanStream, insideGarbage: true, characterNegated: false, garbageCount: prev.garbageCount,
      };
    }
    if (prev.insideGarbage && curr === '!') {
      return {
        cleanStream: prev.cleanStream, insideGarbage: true, characterNegated: true, garbageCount: prev.garbageCount,
      };
    }
    if (prev.insideGarbage && curr === '>') {
      return {
        cleanStream: prev.cleanStream, insideGarbage: false, characterNegated: false, garbageCount: prev.garbageCount,
      };
    }
    if (prev.insideGarbage) {
      return {
        cleanStream: prev.cleanStream, insideGarbage: true, characterNegated: false, garbageCount: prev.garbageCount + 1,
      };
    }
    if (curr === '<') {
      return {
        cleanStream: prev.cleanStream, insideGarbage: true, characterNegated: false, garbageCount: prev.garbageCount,
      };
    }
    if (curr === ',') {
      return {
        cleanStream: prev.cleanStream, insideGarbage: false, characterNegated: false, garbageCount: prev.garbageCount,
      };
    }
    return {
      cleanStream: `${prev.cleanStream}${curr}`, insideGarbage: false, characterNegated: false, garbageCount: prev.garbageCount,
    };
  }, {
    cleanStream: '', insideGarbage: false, characterNegated: false, garbageCount: 0,
  });
  return streamResult;
};

const scoreStream = input => input.split('').reduce((prev, curr) => {
  let { depth, score } = prev;
  if (curr === '{') {
    depth += 1;
    score += depth;
  } else {
    depth -= 1;
  }
  return { score, depth };
}, { score: 0, depth: 0 });

const solve = (data) => {
  const streamResult = handleGarbage(data);
  return [scoreStream(streamResult.cleanStream).score, streamResult.garbageCount];
};

module.exports = (part, data) => solve(data)[part - 1];
