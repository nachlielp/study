class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
  //push to end
  push(val) {
    if (!this.head) {
      this.head = new Node(val);
      this.tail = this.head;
    } else {
      this.tail.next = new Node(val);
      this.tail = this.tail.next;
    }
    this.length++;
    return this;
  }
  //pop from end
  pop() {
    if (!this.head) return undefined;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
      return null;
    }
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;

    return current;
  }
  //shift form start
  shift() {
    if (!this.head) return undefined;
    const currentHead = this.head;
    this.head = this.head.next;
    this.length--;
    return currentHead;
  }
  //adding to start
  unshift(val) {
    const current = new Node(val);
    if (!this.head) {
      this.head = current;
      this.tail = this.head;
    } else {
      current.next = this.head;
      this.head = current;
    }
    this.length++;
    return this;
  }
  get(i) {
    if (i < 0 || i >= this.length) return null;
    let current = this.head;
    while (i--) {
      current = current.next;
    }
    return current;
  }
  //set as
  set(i, val) {
    let current = this.get(i);
    if (!current) return false;
    current.val = val;
    return true;
  }
  insert(i, val) {
    if (i < 0 || i > this.length) return null;
    if (i === 0) return !!this.unshift(val);
    else if (i === this.length) return !!this.push(val);
    else {
      let current = this.get(i - 1);
      const newNode = new Node(val);
      newNode.next = current.next;
      current.next = newNode;
      this.length++;
      return true;
    }
  }
  remove(i) {
    if (i < 0 || i >= this.length) return null;
    if (i === 0) return this.shift();
    else if ((i = this.length - 1)) return this.pop();
    let current = this.get(i - 1);
    current.next = current.next.next;
    return true;
  }
  reverse() {
    if (this.length <= 1) return true;
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next,
      prev = null;
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }

    return this;
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

const list = new SinglyLinkedList();
list.push("a ");
list.push("b ");
list.push("c ");
list.push("d ");
list.push("e ");
list.reverse();
list.print();
