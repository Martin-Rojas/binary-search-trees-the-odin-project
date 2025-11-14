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

    // 3. Call recursive function to build the tree
    //return buildBalancedBST(noDuplicates, 0, noDuplicates.length - 1);

    // Helper function that builds the BST using recursion
    function buildBalancedBST(arr, start, end) {
      // Base case: if start crosses end → no tree (empty)
      if (start > end) return null;

      // 4. Pick the middle element — this keeps the tree balanced
      let mid = Math.floor((start + end) / 2);

      // 5. Create a node from the mid value
      let root = new Node(arr[mid]);

      // 6. Build left subtree from left half of array
      root.left = buildBalancedBST(arr, start, mid - 1);

      // 7. Build right subtree from right half of array
      root.right = buildBalancedBST(arr, mid + 1, end);

      // 8. Return root (this bubbles up until the full tree is built)
      return root;
    }

     // Build and save the root
     this.root = buildBalancedBST(noDuplicates, 0, noDuplicates.length - 1);

     return this.root;
  }

  /** Print the tree */
}
