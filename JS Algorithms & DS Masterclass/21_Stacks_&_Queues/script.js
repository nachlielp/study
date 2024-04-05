class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  enqueue(val) {
    const node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }
    return ++this.length;
  }
  dequeue() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) this.last = null;
    this.first = this.first.next;
    this.length--;
    return temp.val;
  }
  peek() {
    return this.first ? this.first.val : undefined;
  }
  isEmpty() {
    return this.first === null ? true : false;
  }
}
const queue = new Queue();
console.log(queue.enqueue("a"));
console.log(queue.enqueue("b"));
console.log(queue.enqueue("c"));
console.log(queue.enqueue("d"));
console.log(queue.dequeue());
console.log(queue.peek());
console.log(queue.isEmpty());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.isEmpty());
class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }
  push(val) {
    const node = new Node(val);
    if (this.isEmpty()) (this.first = node), (this.last = node);
    else {
      node.next = this.first;
      this.first = node;
    }
    this.length++;
    return this.length;
  }
  pop() {
    if (this.isEmpty()) return null;
    const oldFirst = this.first;
    if (this.length === 1) this.last = null;
    this.first = oldFirst.next;
    return oldFirst.val;
  }
  peek() {
    return this.first ? this.first.val : undefined;
  }
  isEmpty() {
    return this.first === null ? true : false;
  }
}
// const stack = new Stack();
// console.log(stack.push("a"));
// console.log(stack.push("b"));
// console.log(stack.push("c"));
// console.log(stack.push("d"));
// console.log(stack.peek());
// console.log(stack.pop());
// console.log(stack.peek());
// console.log(stack.isEmpty());
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.isEmpty());
