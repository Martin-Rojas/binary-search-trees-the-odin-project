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

    return mergeSort(array)
  }
}
