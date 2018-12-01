module.exports = {
  testCases: [
    {
      part: 1,
      input: `+1
-2
+3
+1`,
      output: 3,
    }, {
      part: 1,
      input: `+1
+1
+1`,
      output: 3,
    },
    {
      part: 1,
      input: `+1
+1
-2`,
      output: 0,
    },
    {
      part: 1,
      input: `-1
-2
-3`,
      output: -6,
    },
    {
      part: 2,
      input: `+1
-2
+3
+1`,
      output: 2,
    },
    {
      part: 2,
      input: `+1
-1`,
      output: 0,
    },
    {
      part: 2,
      input: `+3
+3
+4
-2
-4`,
      output: 10,
    },
    {
      part: 2,
      input: `-6
+3
+8
+5
-6`,
      output: 5,
    },
    {
      part: 2,
      input: `+7
+7
-2
-7
-4`,
      output: 14,
    },
  ],
};
