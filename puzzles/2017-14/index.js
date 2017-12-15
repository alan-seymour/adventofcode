const knotHash = require('../2017-10/');

const getHashes = (input) => {
  const output = [];
  for (let i = 0; i < 128; i++) {
    output.push(knotHash(2, `${input}-${i}`));
  }
  return output;
};

const hashToBits = hash => hash.split('').reduce((prev, curr) => `${prev}${parseInt(curr, 16).toString(2).padStart(4, '0')}`, '');

const countUsed = input => input.reduce((sum, line) => sum + line.filter(v => v === '1').length, 0);

const bitToMetadata = input => ({ state: input, group: null });

const getAdjacentCoords = (col, row) => {
  const output = [];
  if (col !== 0) {
    output.push({ col: col - 1, row });
  }
  if (col !== 127) {
    output.push({ col: col + 1, row });
  }
  if (row !== 0) {
    output.push({ col, row: row - 1 });
  }
  if (row !== 127) {
    output.push({ col, row: row + 1 });
  }
  return output;
};

const processNode = (node, group, col, row) => {
  if (node.state === '0' || node.group !== null) {
    return [node, []];
  }
  return [{ state: '1', group }, getAdjacentCoords(col, row)];
};

const groupRegions = (input) => {
  const bits = input.map(line => line.map(bit => bitToMetadata(bit)));
  const queue = [];
  let groupIndex = 0;
  bits.forEach((line, lineNumber) => {
    line.forEach((bit, columnNumber) => {
      if (bit.state === '0' || bit.group !== null) {
        return null;
      }
      const [newBit, adjacents] = processNode(bit, groupIndex, columnNumber, lineNumber);
      bits[lineNumber][columnNumber] = newBit;
      queue.push(...adjacents);
      while (queue.length > 0) {
        const nextBitLocation = queue.pop();
        const nextBit = bits[nextBitLocation.row][nextBitLocation.col];
        const [updatedBit, newAdjacents] = processNode(nextBit, groupIndex, nextBitLocation.col, nextBitLocation.row);
        bits[nextBitLocation.row][nextBitLocation.col] = updatedBit;
        queue.push(...newAdjacents);
      }
      groupIndex += 1;
      return null;
    });
  });
  return groupIndex;
};

module.exports = (part, data) => {
  const hashes = getHashes(data);
  const memory = hashes.map(hash => hashToBits(hash));
  const memoryArrays = memory.map(line => line.split(''));
  if (part === 1) {
    return countUsed(memoryArrays);
  }
  return groupRegions(memoryArrays);
};
