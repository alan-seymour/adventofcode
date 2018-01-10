const _ = require('lodash');

const splitLines = input => input.split(/\r?\n/);

const findMatchingCableIndexes = (cables, port) => cables.filter(cable => cable.find(p => p === port));

const calcCableStrength = cables => cables.reduce((sum, curr) => sum + parseInt(curr[0], 10) + parseInt(curr[1], 10), 0);

const solve = (cables) => {
  const queue = [{ unusedCables: cables, port: '0', usedCables: [] }];
  const fullCables = [];
  while (queue.length > 0) {
    const queueItem = queue.shift();
    const possibleCables = findMatchingCableIndexes(queueItem.unusedCables, queueItem.port);
    if (possibleCables.length === 0) {
      fullCables.push(queueItem.usedCables);
    } else {
      possibleCables.forEach((possibleCable) => {
        const index = queueItem.unusedCables.findIndex(c => c[0] === possibleCable[0] && c[1] === possibleCable[1]);
        const newCable = _.cloneDeep(queueItem.unusedCables[index]);
        const portIndex = newCable.findIndex(p => p === queueItem.port);
        const newPort = portIndex ? newCable[0] : newCable[1];
        const newUnusedCables = _.cloneDeep(queueItem.unusedCables);
        newUnusedCables.splice(index, 1);
        const newUsedCables = _.cloneDeep(queueItem.usedCables);
        newUsedCables.push(newCable);
        queue.push({
          unusedCables: newUnusedCables,
          port: newPort,
          usedCables: newUsedCables,
        });
      });
    }
  }
  const strengths = fullCables.map(c => calcCableStrength(c));
  strengths.sort((a, b) => a - b);
  const lengths = fullCables.map(c => ({ cable: c, cableLength: c.length, strength: calcCableStrength(c) }));
  lengths.sort((a, b) => {
    if (a.cableLength === b.cableLength) {
      return a.strength - b.strength;
    }
    return a.cableLength - b.cableLength;
  });
  return [strengths.pop(), lengths.pop().strength];
};

module.exports = (part, data) => {
  const cables = splitLines(data).map(line => line.trim().split('/'));
  return solve(cables)[part - 1];
};
