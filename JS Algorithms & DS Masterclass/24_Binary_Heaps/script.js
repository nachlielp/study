class Heap {
  constructor() {
    this.list = [];
  }
  insert(val) {
    this.list.push(val);
    this.bubbleUp();
  }
  bubbleUp() {
    if (this.list.length > 1) {
      let i = this.list.length - 1;
      const val = this.list[i];
      while (i > 0) {
        let pi = Math.floor((i - 1) / 2);
        const parent = this.list[pi];
        if (parent >= val) break;
        this.list[pi] = val;
        this.list[i] = parent;
        i = pi;
      }
    }
  }
  extractMax() {
    if (this.list.length > 0) {
      let max = this.list[0];
      this.list[0] = this.list[this.list.length - 1];
      this.list.pop();
      this.sinkDown();
      return max;
    }
  }
  sinkDown() {
    let i = 0;
    const val = this.list[i];
    let cil = 1;
    let cir = 2;
    while (val < this.list[cil] || val < this.list[cir]) {
      let largerChildI = this.list[cil] > this.list[cir] ? cil : cir;
      this.list[i] = this.list[largerChildI];
      this.list[largerChildI] = val;
      i = largerChildI;
      cil = i * 2 + 1;
      cir = i * 2 + 2;
    }
  }
}
// const heap = new Heap();
// heap.insert(41);
// heap.insert(39);
// heap.insert(33);
// heap.insert(18);
// heap.insert(27);
// heap.insert(12);
//[ 41,39,33, 18, 27, 12]
// console.log(heap.list);
// console.log("max: ", heap.extractMax());
// console.log(heap.list);

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    const node = new Node(val, priority);
    this.values.push(node);
    this.bubbleUp();
  }
  bubbleUp() {
    if (this.values.length < 2) return;
    let i = this.values.length - 1;
    while (i > 0) {
      const parentIndex = Math.floor((i - 1) / 2);
      if (this.values[parentIndex].priority < this.values[i].priority) break;
      this.swap(i, parentIndex);
      i = parentIndex;
    }
  }
  dequeue() {
    if (this.values.length === 0) return null;
    const n = this.values[0];
    this.values[0] = this.values.pop();
    this.sinkDown();
  }
  sinkDown() {
    if (this.values.length < 2) return;
    if (this.values.length === 2) {
      this.values[0].priority > this.values[1].priority && this.swap(0, 1);
      return;
    }
    let i = 0;
    while (2 * i + 1 < this.values.length) {
      const childAI = 2 * i + 1;
      let higherP;
      if (
        this.values[i].priority < this.values[childAI].priority &&
        this.values[i].priority < this.values[childAI + 1].priority
      ) {
        break;
      } else {
        higherP =
          this.values[childAI].priority < this.values[childAI + 1].priority
            ? childAI
            : childAI + 1;
      }
      this.swap(i, higherP);
      i = higherP;
    }
  }
  swap(i, j) {
    const n = this.values[i];
    this.values[i] = this.values[j];
    this.values[j] = n;
  }
}
const pq = new PriorityQueue();
pq.enqueue(8, 8);
pq.enqueue(2, 2);
pq.enqueue(3, 3);
pq.enqueue(1, 1);
pq.enqueue(4, 4);
pq.enqueue(9, 9);

pq.dequeue();
console.log(pq.values);
// console.log(pq.extractMax());
// console.log(pq.extractMax());
// console.log(pq.extractMax());
// console.log(pq.extractMax());
// console.log(pq.extractMax());
