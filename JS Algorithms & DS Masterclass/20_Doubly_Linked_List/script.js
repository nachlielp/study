class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}
class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
  push(val) {
    const node = new Node(val);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }
  pop() {
    if (this.length === 0) return undefined;
    let poppedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length--;
    return poppedNode;
  }
  shift() {
    if (this.length === 0) return undefined;
    let oldHead = this.head;
    if (this.length === 1) {
      this.tail = null;
      this.head = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }
  unshift(val) {
    const node = new Node(val);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.length++;
    return this;
  }
  get(i) {
    if (this.length === 0 || i >= this.length || i < 0) return null;
    if (i > this.length / 2) {
      let temp = this.tail;
      while (i < this.length - 1) {
        temp = temp.prev;
        i++;
      }
      return temp;
    } else {
      let temp = this.head;
      while (i) {
        temp = temp.next;
        i--;
      }
      return temp;
    }
  }
  set(i, val) {
    const current = this.get(i);
    if (current) current.val = val;
    return current ? true : false;
  }
  insert(i, val) {
    if (i < 0 || i > this.length) return false;
    if (i === 0) return !!this.unshift(val);
    if (i === this.length) return !!this.push(val);

    const current = this.get(i);
    const node = new Node(val);
    current.prev.next = node;
    node.prev = current.prev;
    node.next = current;
    current.prev = node;
    this.length++;
    return true;
  }
  remove(i) {
    if (i < 0 || i > this.length) return undefined;
    if (i === 0) return this.shift();
    if (i === this.length - 1) this.pop();

    let current = this.get(i);
    current.prev.next = current.next;
    current.next.prev = current.prev;
    this.length--;
    return current;
  }
  reverse() {
    if (this.length <= 1) return true;
    let node = this.tail;
    this.tail = this.head;
    this.head = node;

    while (node) {
      const newNext = node.prev;
      node.prev = node.next;
      node.next = newNext;
      node = newNext;
    }
  }
  print() {
    let current = this.head;
    let str = "";
    while (current) {
      str += current.val + ", ";
      current = current.next;
    }
    console.log(str.slice(0, -2));
  }
}
const list = new DoublyLinkedList();

list.push("a");
list.push("b");
list.push("c");
list.push("d");
list.push("e");
list.push("f");
list.push("g");
list.reverse();
list.print();
