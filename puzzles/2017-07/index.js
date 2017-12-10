const _ = require('lodash');

const splitLines = input => input.split(/\r?\n/).map(v => v.trim());

const processRootString = rootString => rootString.split(/\s+/).map(v => v.trim());
const processLine = (line) => {
  const [rootString, childrenString] = line.split('->').map(v => v.trim());
  const [rootName, rootWeightString] = processRootString(rootString);

  const childNodeNames = (childrenString !== undefined) ? childrenString.split(',').map(v => v.trim()) : [];
  return {
    name: rootName,
    weight: parseInt(rootWeightString.slice(1, -1), 10),
    childrenNames: childNodeNames,
  };
};

const findRoot = (nodes) => {
  const nonRoots = Object.keys(nodes).reduce((prev, curr) => {
    prev.push(...nodes[curr].childrenNames);
    return prev;
  }, []);
  const allNodes = Object.keys(nodes).map(v => nodes[v].name);
  return _.difference(allNodes, nonRoots)[0];
};

const buildTree = (root, nodes) => {
  const node = nodes[root];
  node.children = node.childrenNames.map(childName => buildTree(childName, nodes));
  return node;
};

const calcWeight = (tree) => {
  if (tree.children !== undefined) {
    tree.children.forEach((child) => {
      calcWeight(child);
    });
    tree.realWeight = tree.children.reduce((sum, curr) => sum + curr.realWeight, 0) + tree.weight;
  } else {
    tree.realWeight = tree.weight;
  }
  return tree;
};

const childrenBalanced = children => !!children.reduce((a, b) => ((a.realWeight === b.realWeight) ? a : NaN));
const findUnique = (array) => {
  const weightArray = array.map(v => v.realWeight);
  return array.find(v => _.indexOf(weightArray, v.realWeight) === _.lastIndexOf(weightArray, v.realWeight));
};

const findImbalancedNode = (tree, siblingWeight = 0) => {
  if (childrenBalanced(tree.children)) {
    const weightImbalance = tree.realWeight - siblingWeight;
    return tree.weight - weightImbalance;
  }
  const uniqueNode = findUnique(tree.children);
  const childKeys = tree.children.map(child => child.name);
  const nonUniqueKeys = _.remove(childKeys, v => v !== uniqueNode.name);
  const correctWeight = tree.children.find(child => child.name === nonUniqueKeys[0]).realWeight;
  return findImbalancedNode(uniqueNode, correctWeight);
};

module.exports = (part, data) => {
  const lines = splitLines(data);
  const nodes = lines.map(v => processLine(v)).reduce((prev, curr) => { prev[curr.name] = curr; return prev; }, {});
  const root = findRoot(nodes);
  if (part === 1) {
    return root;
  }
  let tree = buildTree(root, nodes);
  tree = calcWeight(tree);
  return findImbalancedNode(tree);
};
