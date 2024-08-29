class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(array) {
    this.array = [...new Set(array)].sort((a, b) => a - b); // Delete duplicates(Set) and order (sort) the array
    this.root = this.buildTree(this.array); // Make the tree and assign the node;
  }

  buildTree(arr) {
    const buildTreeRecursive = (start, end) => {
      /* Base Case */
      if (start > end) {
        return null;
      }

      /* Get the middle element and make it root */
      let mid = Math.floor((start + end) / 2);
      let node = new Node(arr[mid]);
      /* Recursively construct the left subtree and make it 
     left child of root */
      node.left = buildTreeRecursive(start, mid - 1);
      /* Recursively construct the right subtree and make it 
     right child of root */
      node.right = buildTreeRecursive(mid + 1, end);

      return node;
    };
    return buildTreeRecursive(0, arr.length - 1);
  }

  insert(value) {
    // Recursive insert function
    const insertNode = (node, value) => {
      if (node === null) {
        return new Node(value);
      }

      if (value < node.data) {
        node.left = insertNode(node.left, value);
      } else if (value > node.data) {
        node.right = insertNode(node.right, value);
      }

      return node;
    };

    if (this.root === null) {
      this.root = new Node(value);
      return this.root;
    }

    //Dont allow duplicates
    if (this.root.data === value) {
      return this.root;
    }

    //Compare new value with the root node
    // Go through left subtree
    if (value < this.root.data) {
      if (this.root.left === null) {
        this.root.left = new Node(value);
      } else {
        // Recursive function
        this.root.left = insertNode(this.root.left, value);
      }
    } else {
      // Go through right subtree
      if (this.root.right === null) {
        this.root.right = new Node(value);
      } else {
        // Recursive function
        this.root.right = insertNode(this.root.right, value);
      }
    }

    return this.root;
  }

  deleteItem(value) {
    const deleteNode = (node, value) => {
      if (node === null) {
        return node;
      }

      if (value < node.data) {
        node.left = deleteNode(node.left, value);
      } else if (value > node.data) {
        node.right = deleteNode(node.right, value);
      } else {
        // Node found

        // Case 1: node with 0 or 1 leaf
        if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        }

        // Case 2: 2 leafs node

        const minValue = (node) => {
          let current = node;
          while (current.left !== null) {
            current = current.left;
          }
          return current;
        };

        const minValueNode = minValue(node.right);
        node.data = minValueNode.data;
        node.right = deleteNode(node.right, minValueNode.data);
      }
      return node;
    };
    this.root = deleteNode(this.root, value);
  }

  find(value) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (currentNode.data === value) {
        console.log('found: ', currentNode);
        return currentNode;
      }

      if (value < currentNode.data) {
        currentNode = currentNode.left; //Move to left subtree
      } else {
        currentNode = currentNode.right; //Move to right subtree
      }
    }

    console.log('Value not found');
    return null;
  }
}

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
