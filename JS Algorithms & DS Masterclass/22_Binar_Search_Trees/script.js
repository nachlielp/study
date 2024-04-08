class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
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
        if (!current.left) {
          current.left = n;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
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
bst.insert(5);
bst.insert(4);
bst.insert(6);
bst.insert(9);
bst.insert(7);
console.log(bst.find(10));
