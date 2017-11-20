const fs = require('fs');
const parseArgs = require('minimist');

const options = {
  default: {
    // year: new Date().getFullYear(),
    year: 2016,
    part: 1,
    day: 1,
    fileName: 'input.txt',
  },
  alias: {
    y: 'year',
    p: 'part',
    d: 'day',
    f: 'fileName',
  },
};

const asyncReadFile = fileName => new Promise((resolve, reject) => {
  fs.readFile(fileName, (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(result);
  });
});

module.exports = {
  getArgs: (argv) => {
    const args = parseArgs(argv, options);
    if (args.day < 10) {
      args.day = `0${args.day}`;
    }
    return args;
  },
  getData: async (fileName) => {
    try {
      const data = await asyncReadFile(fileName);
      return data.toString();
    } catch (e) {
      console.error(`Error Reading File: ${e.message}`);
    }
    return undefined;
  },
};
