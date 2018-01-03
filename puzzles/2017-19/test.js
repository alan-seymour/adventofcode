module.exports = {
  testCases: [
    {
      part: 1,
      input: `      |          
      |  +--+    
      A  |  C    
  F---|----E|--+ 
      |  |  |  D 
      +B-+  +--+ 
 `,
      output: 'ABCDEF',
    },
    {
      part: 2,
      input: `      |          
      |  +--+    
      A  |  C    
  F---|----E|--+ 
      |  |  |  D 
      +B-+  +--+ 
 `,
      output: 38,
    },
  ],
};
