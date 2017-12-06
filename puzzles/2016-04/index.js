const decomposeLine = (line) => {
  const [_, name, sectorId, checksum] = line.match(/([a-z\-]*)(\d+)\[([a-z]{5})\]/);
  const newName = name.replace(/-/g, '');
  return { name: newName, sectorId, checksum };
};

const generateChecksum = (letters) => {
  const chars = letters.split('');
  const charCounts = chars.reduce((prev, curr) => {
    if (prev[curr] === undefined) {
      prev[curr] = 1;
    } else {
      prev[curr] += 1;
    }
    return prev;
  }, {});
  const charCountArray = Object.keys(charCounts).map(v => ({ char: v, count: charCounts[v] }))
    .sort((first, second) => {
      if (first.count === second.count) {
        if (first.char < second.char) {
          return -1;
        }
        return 1;
      }
      return second.count - first.count;
    });
  const checkSum = charCountArray.slice(0, 5).map(v => v.char).join('');
  return checkSum;
};

const toLines = data => data.split(/\r?\n/).map(v => v.trim());

const shiftString = (string, shift) => {
  const chars = string.split('');
  const shifted = chars.map((v) => {
    const code = v.charCodeAt(0);
    return String.fromCharCode((((code - 97) + parseInt(shift, 10)) % 26) + 97);
  });
  return shifted.join('');
};

module.exports = (part, data) => {
  const lines = toLines(data);
  let decomposedLines = lines.map(v => decomposeLine(v));
  if (part === 2) {
    decomposedLines = decomposedLines.map(v => ({ name: shiftString(v.name, v.sectorId), sectorId: v.sectorId, checksum: v.checksum }));
    const result = decomposedLines.find(v => v.name === 'northpoleobjectstorage');
    return result.sectorId;
  }
  const valid = decomposedLines.filter((v) => {
    const checkSum = generateChecksum(v.name);
    return checkSum === v.checksum;
  });
  return valid.reduce((prev, curr) => prev + parseInt(curr.sectorId, 10), 0);
};
