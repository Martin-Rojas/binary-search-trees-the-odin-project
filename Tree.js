import { Node } from "./Node.js";

export class Tree {
  constructor(root = null) {
    this.root = root;
  }
  /** First mergeSort the array, after delete duplicates */
  buildTree(array) {
    function merge(left, right) {
      let mergeArray = [];
      let i = 0;
      let j = 0;

      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          mergeArray.push(left[i]);
          i++;
        } else {
          mergeArray.push(right[j]);
          j++;
        }
      }
      return mergeArray.concat(left.slice(i)).concat(right.slice(j));
    }

    function mergeSort(array) {
      // Base case — array with 1 or 0 elements is already sorted
      if (array.length <= 1) return array;

      // Split in half
      const mid = Math.floor(array.length / 2);
      const left = array.slice(0, mid);
      const right = array.slice(mid);

      // Recursively sort both halves
      const sortedLeft = mergeSort(left);
      const sortedRight = mergeSort(right);

      // Merge the sorted halves
      return merge(sortedLeft, sortedRight);
    }

    const sortedArr = mergeSort(array);

    let noDuplicates = [];

    sortedArr.forEach((number) => {
      if (!noDuplicates.includes(number)) {
        noDuplicates.push(number);
      }
    });

    // Helper function that builds the BST using recursion
    function buildBalancedBST(arr, start, end) {
      // Base case: if start crosses end → no tree (empty)
      if (start > end) return null;

      // 4. Pick the middle element — this keeps the tree balanced
      let mid = Math.floor((start + end) / 2);

      // 5. Create a node from the mid value
      let root = new Node(arr[mid]);

      // 6. Build left subtree from left half of array
      root.leftNode = buildBalancedBST(arr, start, mid - 1);

      // 7. Build right subtree from right half of array
      root.rightNode = buildBalancedBST(arr, mid + 1, end);

      // 8. Return root (this bubbles up until the full tree is built)
      return root;
    }

    // Build and save the root
    this.root = buildBalancedBST(noDuplicates, 0, noDuplicates.length - 1);

    return this.root;
  }

  /** Insert new value into the tree */
  insert(value) {
    const newNode = new Node(value);
    // If the tree is empty (root is null),
    // make the new node the root and stop.
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;

    while (true) {
      // Duplicate value check
      if (newNode.data === currentNode.data) {
        console.log("Value already exists in the tree:", value);
        return;
      }

      /** If value < current.data → we must place it in the left subtree. */
      if (newNode.data < currentNode.data) {
        if (currentNode.leftNode === null) {
          currentNode.leftNode = newNode;
          return;
        }
        currentNode = currentNode.leftNode;
      } // If value > current.data → we must place it in the right subtree.
      else {
        if (currentNode.rightNode === null) {
          currentNode.rightNode = newNode;
          return;
        }
        currentNode = currentNode.rightNode;
      }
    }
  }

  deleteItem(value) {
    // Start at the root.
    let currentNode = this.root;
    let parentNode = null;

    // Search for the node and keep track of parent
    while (currentNode !== null && currentNode.data !== value) {
      parentNode = currentNode;
      // Check if the pointer goes left or right of the tree
      if (value < currentNode.data) {
        currentNode = currentNode.leftNode;
      } else {
        currentNode = currentNode.rightNode;
      }
    }

    // Value not found
    if (currentNode === null) return;

    // If node has no child
    if (currentNode.leftNode === null && currentNode.rightNode === null) {
      // If the node is the root
      if (currentNode === this.root) {
        this.root = null;
        return;
      }

      // Remove child reference from parent
      if (parentNode.leftNode === currentNode) {
        parentNode.leftNode = null;
      } else {
        parentNode.rightNode = null;
      }
    } /** If the node has one child left */ else if (
      currentNode.leftNode !== null &&
      currentNode.rightNode === null
    ) {
      // If the node is the root
      if (currentNode === this.root) {
        this.root = currentNode.leftNode;
        return;
      }
      // choose if the parent node will bw left or rigth
      if (parentNode.leftNode === currentNode) {
        parentNode.leftNode = currentNode.leftNode;
      } else {
        parentNode.rightNode = currentNode.leftNode;
      }
    } else if (
      currentNode.leftNode === null &&
      currentNode.rightNode !== null
    ) {
      /** If the node has one child */
      // If the node is the root
      if (currentNode === this.root) {
        this.root = currentNode.rightNode;
        return;
      }

      // choose if the parent node will be left or rigth
      if (parentNode.rightNode === currentNode) {
        parentNode.rightNode = currentNode.rightNode;
      } else {
        parentNode.leftNode = currentNode.rightNode;
      }
    }
  }

  /* Function that returns the node with the given value */
  find(value) {
    let currentNode = this.root;

    while (currentNode !== null && currentNode.data !== value) {
      if (value < currentNode.data) {
        currentNode = currentNode.leftNode;
      } else {
        currentNode = currentNode.rightNode;
      }
    }
    return currentNode;
  }
  // Function that accepts a callback function as its parameter
  levelOrderForEach(callback = null) {
    // root is null return emptry array
    // Start at the root.
    if (!this.root) return [];
    // Put it into a queue.
    const queue = [this.root];
    const result = [];
    // While the queue has nodes:
    while (queue.length > 0) {
      // Take the next node from the front
      let currentNode = queue.shift();
      // If callback exists → call it for the current node
      if (callback) {
        callback(currentNode.data);
      } else {
        result.push(currentNode.data);
      }
      // Add children to queue
      if (currentNode.leftNode) queue.push(currentNode.leftNode);
      if (currentNode.rightNode) queue.push(currentNode.rightNode);
    }

    // Only return the result if NO callback was used
    return callback ? undefined : "needs a callback function";
  }

  /** Traverse the tree  pre Order  */
  preOrderForEach(callback) {
    if (!callback) throw new Error("Callback is required.");
    if (!this.root) return;

    const stack = [this.root]; // Start with the root node

    while (stack.length > 0) {
      const current = stack.pop(); // Take the top item from the stack

      callback(current.data); // Apply the callback to the current node's value

      // Push RIGHT first so LEFT is processed first (stack = LIFO)
      if (current.rightNode) stack.push(current.rightNode);
      if (current.leftNode) stack.push(current.leftNode);
    }
  }
  /** Traverse the BST In Order recursion version*/
  inOrderForEach(callback) {
    if (!callback) throw new Error("Callback is required.");

    function traverse(node) {
      if (!node) return;
      traverse(node.leftNode);
      callback(node.data);
      traverse(node.rightNode);
    }
    traverse(this.root);
  }

  /** Traverse the BST Post Order recursion version*/
  postOrderForEach(callback) {
    if (!callback) throw new Error(`callback is required`);

    function traverse(node) {
      if (!node) return;
      traverse(node.leftNode);
      traverse(node.rightNode);
      callback(node.data);
    }
    traverse(this.root);
  }
}
