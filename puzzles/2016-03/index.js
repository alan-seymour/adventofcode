const isValidTriangle = (sides) => {
  const [a, b, c] = sides.map(v => parseInt(v, 10)).sort((aa, bb) => aa - bb);
  return ((a + b) > c);
};


const buildPart1TriangleArray = (data) => {
  const lines = data.split(/\r?\n/);
  return lines.map((v) => {
    const trimmed = v.trim();
    return trimmed.split(/\s+/);
  });
};

const buildPart2TriangleArray = triangles => triangles.reduce((prev, [a, b, c], row) => {
  const firstRow = Math.floor(row / 3) * 3;
  if (row % 3 === 0) {
    prev[firstRow] = [];
    prev[firstRow + 1] = [];
    prev[firstRow + 2] = [];
  }
  prev[firstRow].push(a);
  prev[firstRow + 1].push(b);
  prev[firstRow + 2].push(c);
  return prev;
}, []);

const buildTriangleArray = (part, data) => {
  const triangles = buildPart1TriangleArray(data);
  if (part === 2) {
    return buildPart2TriangleArray(triangles);
  }
  return triangles;
};


module.exports = (part, data) => {
  const triangleArray = buildTriangleArray(part, data);
  return triangleArray.reduce((prev, curr) => {
    if (isValidTriangle(curr)) {
      return prev + 1;
    }
    return prev;
  }, 0);
};
