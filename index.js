const minIndent = require('min-indent');
// Temp: const stripIndent = require('strip-indent');
const stripIndent = require('./stripIndent.temp');

const reduceIndent = (node, indent) => {
  node.raws.before = stripIndent(node.raws.before || '', {indent});
  node.raws.after = stripIndent(node.raws.after || '', {indent});

  if (node.nodes) {
    node.nodes.map(subnode => reduceIndent(subnode, indent));
  }
};

module.exports = container => {
  // Determine indentation
  const indentString = container.nodes.reduce((prev, curr) => prev + (curr.raws.before || '') + curr.toString(), '') + (container.raws.before || '');
  const indent = minIndent(indentString);
  // Save unwrapped nodes reference
  const nodes = [];
  // See below
  let firstNodeBefore = null;
  // Loop bound values
  const maxIndex = container.nodes.length - 1;
  let i;
  for (i = maxIndex; i >= 0; i--) {
    const node = container.nodes[i];
    nodes[i] = node;

    // Last iteration, i.e. first node: save the original whitespace, since PostCSS clones the preceding on insert
    if (i === 0) {
      firstNodeBefore = node.raws.before;
    }

    container.parent.insertAfter(container, node);
  }

  // Save original preceding whitespace - will be the final value for the first node
  const {before: containerBefore} = container.raws;
  // Remove the wrapper container
  container.remove();

  // Restore original preceding whitespace for the first node temporarily - only to identify the indentation
  const firstNode = nodes[0];
  if (firstNode && (firstNodeBefore !== null)) {
    firstNode.raws.before = firstNodeBefore;
  }

  // Reduce indentation
  nodes.map(node => reduceIndent(node, indent));

  // Set the first node's preceding whitespace eventually same as for the container (as including proper newlines)
  if (firstNode) {
    firstNode.raws.before = containerBefore;
  }
};
