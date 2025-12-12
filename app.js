import { Tree } from "./Tree.js";

const tree = new Tree();
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(tree.root);

//tree.insert(8);
tree.insert(1000);
//tree.insert(23);
tree.insert(0);

console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

//prettyPrint(tree.root);

tree.deleteItem(3); // node has no child

prettyPrint(tree.root);
//tree.deleteItem(1); // node has one child left

//prettyPrint(tree.root);

//tree.deleteItem(5); // node has one child right

//prettyPrint(tree.root);

// console.log(tree.find(4) + " found it");

//tree.levelOrderForEach((data) => console.log(data));

tree.preOrderForEach((data) => console.log(data));

console.log(`==============================`);
tree.inOrderForEach((node) => console.log(node));
console.log(`+++++++++++++++++++++++++++++++++`);

tree.postOrderForEach(node => console.log(node))
