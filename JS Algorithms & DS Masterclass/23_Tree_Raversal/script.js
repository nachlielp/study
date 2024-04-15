import { Queue } from "../21_Stacks_&_Queues/script.js";

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
//Binary Search Tree
class BST {
  constructor() {
    this.root = null;
  }
  insert(val) {
    const n = new Node(val);
    if (!this.root) {
      this.root = n;
      return this;
    }
    let current = this.root;
    while (true) {
      if (val === current.val) return undefined;
      if (val < current.val) {
        if (current.left === null) {
          current.left = n;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = n;
          return this;
        }
        current = current.right;
      }
    }
  }
  find(val) {
    if (!this.root) {
      return false;
    }
    let current = this.root;
    while (true) {
      if (!current) return false;
      else if (current.val === val) return true;
      else if (val < current.val) current = current.left;
      else if (val > current.val) current = current.right;
    }
  }
}
const bst = new BST();
bst.insert(10);
bst.insert(6);
bst.insert(3);
bst.insert(8);
bst.insert(15);
bst.insert(20);

let queue = new Queue();
let list = [];

//Breadth First Search
function BFS() {
  queue.enqueue(bst.root);
  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    console.log(node.val);
    list.push(node.val);
    if (node.left) queue.enqueue(node.left);
    if (node.right) queue.enqueue(node.right);
  }
  console.log("list: ", list);
}
// BFS();

//DFS - Pre Order
function preOrder(node) {
  if (!node) return;
  list.push(node.val);
  if (node.left) preOrder(node.left);
  if (node.right) preOrder(node.right);
}
// preOrder(bst.root);

//DFS Post Order
function postOrder(node) {
  if (node.left) postOrder(node.left);
  if (node.right) postOrder(node.right);
  list.push(node.val);
}
// postOrder(bst.root);

function inOrder(node) {
  if (node.left) inOrder(node.left);
  list.push(node.val);
  if (node.right) inOrder(node.right);
}
// inOrder(bst.root);
// console.log("In Order list: ", list);
