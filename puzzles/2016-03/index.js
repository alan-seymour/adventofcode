isValidTriangle = (sides) => {
  const [a, b, c] = sides.map((v) => parseInt(v)).sort((a, b) => a - b);
  return ((a + b) > c);
}

buildTriangleArray = (part, data) => {
  const triangles = buildPart1TriangleArray(data);
  if (part === 2) {
    return buildPart2TriangleArray(triangles);
  }
  return triangles;
}

buildPart1TriangleArray = (data) => {
  const lines = data.split(/\r?\n/);
  return triangleArray = lines.map ((v) => {
    const trimmed = v.trim();
    return trimmed.split(/\s+/);
  });
}

buildPart2TriangleArray = (triangles) => {
  return triangles.reduce((prev, [a, b, c], row) => {
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
}

module.exports = (part, data) => {
  const triangleArray = buildTriangleArray(part, data);
  return triangleArray.reduce((prev, curr) => {
    if (isValidTriangle(curr)) {
      return prev + 1;
    }
    return prev;
  }, 0);
};
