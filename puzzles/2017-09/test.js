module.exports = {
  testCases: [
    {
      part: 1,
      input: '{}',
      output: 1,
    },
    {
      part: 1,
      input: '{{{}}}',
      output: 6,
    },
    {
      part: 1,
      input: '{{},{}}',
      output: 5,
    },
    {
      part: 1,
      input: '{{{},{},{{}}}}',
      output: 16,
    },
    {
      part: 1,
      input: '{<a>,<a>,<a>,<a>}',
      output: 1,
    },
    {
      part: 1,
      input: '{{<ab>},{<ab>},{<ab>},{<ab>}}',
      output: 9,
    },
    {
      part: 1,
      input: '{{<!!>},{<!!>},{<!!>},{<!!>}}',
      output: 9,
    },
    {
      part: 1,
      input: '{{<a!>},{<a!>},{<a!>},{<ab>}}',
      output: 3,
    },
  ],
};
