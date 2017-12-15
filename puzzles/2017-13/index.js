const splitLines = input => input.split(/\r?\n/).map(v => v.trim());

const layerDepth = (line) => {
  const [layer, depth] = line.split(/:\s/);
  return {
    layer: parseInt(layer, 10),
    depth: parseInt(depth, 10),
    interval: (depth - 1) * 2,
  };
};

const totalCost = layers => layers.reduce((sum, curr) => ((curr.layer % curr.interval === 0) ? (sum + (curr.depth * curr.layer)) : sum), 0);

const isSafeRun = (delay, layers) => layers.every(layer => ((layer.layer + delay) % layer.interval) !== 0);

const zeroCost = (layers) => {
  let delay = 0;
  while (!isSafeRun(delay, layers)) {
    delay += 1;
  }
  return delay;
};

module.exports = (part, data) => {
  const lines = splitLines(data);
  const depths = lines.map(line => layerDepth(line));
  if (part === 1) {
    return totalCost(depths);
  }
  return zeroCost(depths);
};
