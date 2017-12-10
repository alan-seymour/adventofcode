module.exports = {
  testCases: [
    {
      part: 1,
      input: `b inc 5 if a > 1
      a inc 1 if b < 5
      c dec -10 if a >= 1
      c inc -20 if c == 10`,
      output: 1,
    },
    {
      part: 2,
      input: `b inc 5 if a > 1
      a inc 1 if b < 5
      c dec -10 if a >= 1
      c inc -20 if c == 10`,
      output: 10,
    },
  ],
};
