const north = Symbol('north');
const east = Symbol('east');
const south = Symbol('south');
const west = Symbol('west');

const turnMap = {
  [north]: { L: west, R: east },
  [east]: { L: north, R: south },
  [south]: { L: east, R: west },
  [west]: { L: south, R: north },
};

const moveForward = ({ x, y }, facing) => {
  let output;
  switch (facing) {
    case north:
      output = { x, y: y + 1 };
      break;
    case south:
      output = { x, y: y - 1 };
      break;
    case east:
      output = { x: x + 1, y };
      break;
    case west:
      output = { x: x - 1, y };
      break;
    default:
      output = { x, y };
  }
  return output;
};

const turn = (facing = north, turnDirection) => turnMap[facing][turnDirection];

const makeMove = (currentLocation, currentDirection, turnDirection, moveDistance, visitCount, firstRepeat) => {
  const newDirection = turn(currentDirection, turnDirection);
  let newPosition = currentLocation;
  for (let i = 0; i < moveDistance; i++) {
    newPosition = moveForward(newPosition, newDirection);
    if (firstRepeat === null) {
      if (visitCount[newPosition.x] === undefined) {
        visitCount[newPosition.x] = [];
        visitCount[newPosition.x][newPosition.y] = 1;
      } else {
        visitCount[newPosition.x][newPosition.y] += 1;
      }
      if (visitCount[newPosition.x][newPosition.y] === 2) {
        firstRepeat = newPosition;
      }
    }
  }
  return {
    visitCount,
    currentLocation: newPosition,
    currentDirection: newDirection,
    firstRepeat,
  };
};

const splitMove = moveString => (
  {
    dir: moveString.substr(0, 1),
    dist: moveString.substr(1),
  }
);

module.exports = (part, data) => {
  let steps = data.split(',');
  steps = steps.map(v => v.trim());
  const finalLocation = steps.reduce((prev, curr) => {
    const split = splitMove(curr);
    return makeMove(prev.currentLocation, prev.currentDirection, split.dir, split.dist, prev.visitCount, prev.firstRepeat);
  }, {
    currentLocation: { x: 0, y: 0 },
    currentDirection: north,
    visitCount: [],
    firstRepeat: null,
  });

  if (part === 1) {
    return Math.abs(finalLocation.currentLocation.x) + Math.abs(finalLocation.currentLocation.y);
  }
  return Math.abs(finalLocation.firstRepeat.x) + Math.abs(finalLocation.firstRepeat.y);
};
