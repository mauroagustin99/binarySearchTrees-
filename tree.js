class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

export class Tree {
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
        console.log('Node not Found');
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
        node.data = minValueNode.data; // Replace current node with the minValueNode
        node.right = deleteNode(node.right, minValueNode.data); // Delete that minValueNode
      }
      return node;
    };
    this.root = deleteNode(this.root, value);
  }

  find(value) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (currentNode.data === value) {
        return currentNode;
      }

      if (value < currentNode.data) {
        currentNode = currentNode.left; //Move to left subtree
      } else {
        currentNode = currentNode.right; //Move to right subtree
      }
    }

    return null;
  }

  levelOrder(callback) {
    if (!callback) {
      throw new Error('No callback function is provided');
    }
    const queue = [this.root];
    let node;
    while (queue.length !== 0) {
      node = queue.shift();

      if (node !== null) {
        callback(node);
        queue.push(node.left);
        queue.push(node.right);
      }
    }
  }

  inOrder(callback) {
    if (!callback) {
      throw new Error('No callback function is provided');
    }

    const inOrderRecursive = (node) => {
      if (node === null) {
        return;
      }

      // Traverse the left subtree first
      inOrderRecursive(node.left);

      // Process the current node
      callback(node);

      // Traverse the right subtree
      inOrderRecursive(node.right);
    };

    // Start the traversal from the root
    inOrderRecursive(this.root);
  }

  preOrder(callback) {
    if (!callback) {
      throw new Error('No callback function is provided');
    }

    const preOrderRecursive = (node) => {
      if (node === null) {
        return;
      }
      callback(node);
      preOrderRecursive(node.left);
      preOrderRecursive(node.right);
    };

    preOrderRecursive(this.root);
  }

  postOrder(callback) {
    if (!callback) {
      throw new Error('No callback function is provided');
    }

    const postOrderRecursive = (node) => {
      if (node === null) {
        return;
      }

      postOrderRecursive(node.left);
      postOrderRecursive(node.right);
      callback(node);
    };

    postOrderRecursive(this.root);
  }

  height(node) {
    const currentNode = this.find(node);

    if (currentNode === null) {
      return -1; // Node not found
    }

    const calculateHeight = (currentNode) => {
      if (currentNode === null) return -1;
      const leftHeight = calculateHeight(currentNode.left);
      const rightHeight = calculateHeight(currentNode.right);
      return Math.max(leftHeight, rightHeight) + 1;
    };
    // Calculate and return the height of the found node
    return calculateHeight(currentNode);
  }

  depth(node) {
    let currentNode = this.root;
    let count = 0;
    while (currentNode !== null) {
      if (currentNode.data === node) {
        return count; // Return the depth when the node is found
      }

      if (node < currentNode.data) {
        currentNode = currentNode.left; //Move to left subtree
      } else {
        currentNode = currentNode.right; //Move to right subtree
      }
      count += 1; // Increment count as we move down the tree
    }

    return -1; // Return -1 if the node is not found
  }

  isBalanced() {
    const isBalancedRecursive = (node) => {
      if (node === null) return 0;

      const leftHeight = isBalancedRecursive(node.left);
      if (leftHeight === -1) return -1; // Not balanced

      const rightHeight = isBalancedRecursive(node.right);
      if (rightHeight === -1) return -1; // Not balanced

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1; // Not balanced
      }

      return Math.max(leftHeight, rightHeight) + 1; // Return height
    };

    return isBalancedRecursive(this.root) !== -1;
  }

  rebalance() {
    // Create an array to store the nodes in sorted order
    const sortedArray = [];

    // Modify the inOrder function to push nodes into the array
    this.inOrder((node) => {
      sortedArray.push(node.data);
    });

    // Rebuild the tree using the sorted array
    this.root = this.buildTree(sortedArray);
  }
}
