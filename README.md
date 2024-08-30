# binarySearchTrees-

Creating a Binary Search Tree Structure using JS!

To test this repository you need to clone it to your computer (git clone https://github.com/mauroagustin99/binarySearchTrees-) then, navigate to the project directory, install the dependencies with: npm install and use the script with node main.js in a terminal.

## Next updates

- Implement HTML-View BST

## Methods

`buildTree(array)` takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed. The buildTree function returns the level-0 root node.

`find(value)` returns the node with the given value.

`insert(value)` insert the given value.

`deleteItem(value)` delete the given value.

`levelOrder(callback)` accepts a callback function as its parameter. levelOrder traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument, similarly to how Array.prototype.forEach might work for arrays.

`inOrder(callback)`, `preOrder(callback)`, `postOrder(callback)` accept a callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and pass each node to the provided callback.

`height(node)` returns the given node’s height. Height is defined as the number of edges in the longest path from a given node to a leaf node.

`depth(node)` returns the given node’s depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.

`isBalanced` checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.

`rebalance` rebalances an unbalanced tree.
