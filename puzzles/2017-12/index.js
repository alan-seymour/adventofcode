const splitLines = input => input.split(/\r?\n/).map(v => v.trim());

const deconstructInput = (line) => {
  const [full, node, links] = line.match(/(\d+)\s<->\s(.*)/);
  const linkedNodes = links.split(/,\s/);
  return { node, linkedNodes };
};


const findGroup = (nodes, start) => {
  const prevQueue = [start];
  const linkedNodes = [];
  const queue = [];
  let currentNode = nodes[start].node;
  while (currentNode !== undefined) {
    linkedNodes.push(currentNode);
    nodes[currentNode].linkedNodes.forEach((v) => {
      if (prevQueue.indexOf(v) === -1) {
        prevQueue.push(v);
        queue.push(v);
      }
    });
    currentNode = queue.shift();
  }
  return linkedNodes;
};

const findAllGroups = (nodes) => {
  const totalNodes = nodes.length;
  const groups = [];
  let groupedNodes = [];
  while (groupedNodes.length !== totalNodes) {
    // find first missing node from groupedNodes
    const nextNode = nodes.find(v => groupedNodes.indexOf(v.node) === -1);
    const nextGroup = findGroup(nodes, nextNode.node);
    groups.push(nextGroup);
    groupedNodes = [...groupedNodes, ...nextGroup];
  }
  return groups;
};

module.exports = (part, data) => {
  const lines = splitLines(data);
  const nodes = lines.map(v => deconstructInput(v));
  if (part === 1) {
    return findGroup(nodes, '0').length;
  }
  return findAllGroups(nodes).length;
};

