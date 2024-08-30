import { Tree } from './tree.js';

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// TOP Tests:

/*

MY TESTS

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);

prettyPrint(tree.root);

tree.insert(10);
tree.insert(10);
tree.insert(15);
tree.insert(-1);
tree.insert(0);
prettyPrint(tree.root);
tree.deleteItem(8);
prettyPrint(tree.root);

let array2 = [4, 2, 6, 1, 3, 5, 7];
const tree2 = new Tree(array2);

prettyPrint(tree2.root);

function printNode(node) {
  console.log(node.data);
}

// Test inOrder traversal
console.log('In-order traversal:');
tree2.inOrder(printNode);

// Test preOrder traversal
console.log('Pre-order traversal:');
tree2.preOrder(printNode);

// Test postOrder traversal
console.log('Post-order traversal:');
tree2.postOrder(printNode);

console.log('Node 4 Height: ' + tree.height(4));
console.log('Node 4 Depth: ' + tree.depth(4));
console.log(tree.isBalanced());
console.log(tree2.isBalanced());

tree.rebalance();

prettyPrint(tree.root);
*/
