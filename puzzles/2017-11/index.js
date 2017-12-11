const splitString = input => input.split(',').map(v => v.trim());

const move = {
  n: ({ x, y, z }) => ({ x, y: y + 1, z: z - 1 }),
  s: ({ x, y, z }) => ({ x, y: y - 1, z: z + 1 }),
  ne: ({ x, y, z }) => ({ x: x + 1, y, z: z - 1 }),
  sw: ({ x, y, z }) => ({ x: x - 1, y, z: z + 1 }),
  nw: ({ x, y, z }) => ({ x: x - 1, y: y + 1, z }),
  se: ({ x, y, z }) => ({ x: x + 1, y: y - 1, z }),
};

const distanceFromOrigin = ({ x, y, z }) => (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2;

const solve = (input) => {
  const { location, maxDistance } = input.reduce((prev, curr) => {
    const newLocation = move[curr](prev.location);
    const distance = distanceFromOrigin(newLocation);
    const newMaxDistance = distance > prev.maxDistance ? distance : prev.maxDistance;
    return { location: newLocation, maxDistance: newMaxDistance };
  }, { location: { x: 0, y: 0, z: 0 }, maxDistance: 0 });
  return [distanceFromOrigin(location), maxDistance];
};

module.exports = (part, data) => {
  const directions = splitString(data);
  return solve(directions)[part - 1];
};

