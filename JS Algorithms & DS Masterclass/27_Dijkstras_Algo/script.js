class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(v) {
    if (!this.adjacencyList[v]) {
      this.adjacencyList[v] = [];
    }
  }

  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight });
    this.adjacencyList[v2].push({ node: v1, weight });
  }

  getVertex(v) {
    return this.adjacencyList[v];
  }

  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(
      (e) => e.node !== v2
    );
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(
      (e) => e.node !== v1
    );
  }

  removeVertex(v) {
    for (let e of this.adjacencyList[v]) {
      this.removeEdge(v, e.node);
    }
    delete this.adjacencyList[v];
  }

  dfsRecusion(v) {
    if (!this.adjacencyList[v]) return null;

    const result = [];
    const visited = {};

    const helper = (v) => {
      if (!visited[v]) {
        visited[v] = true;
        result.push(v);
        for (let e of this.adjacencyList[v]) {
          if (!visited[e.node]) helper(e.node);
        }
      }
    };

    helper(v);

    return result;
  }

  dfsStack(v) {
    if (!this.adjacencyList[v]) return null;

    const result = [];
    const visited = {};
    const stack = [v];

    while (stack.length > 0) {
      const node = stack.pop();

      if (!visited[node]) {
        result.push(node);
        visited[node] = true;
        this.adjacencyList[node].reverse().forEach((neighbour) => {
          if (!visited[neighbour.node]) stack.push(neighbour.node);
        });
      }
    }

    return result;
  }

  bfsQueue(v) {
    const queue = [v];
    const result = [];
    const visited = {};

    while (queue.length > 0) {
      const node = queue.shift();
      if (!visited[node]) {
        visited[node] = true;
        result.push(node);
        this.adjacencyList[node].forEach((neighbour) => {
          if (!visited[neighbour.node]) queue.push(neighbour.node);
        });
      }
    }
    return result;
  }

  dijkstra(start, end) {
    const visited = new Set();
    const previous = {};
    const distances = {};
    const nodes = new PriorityQueue();

    for (let node in this.adjacencyList) {
      distances[node] = Infinity;
      previous[node] = null;
    }

    distances[start] = 0;
    nodes.enqueue(start, 0);

    while (visited.size < Object.keys(this.adjacencyList).length) {
      const current = nodes.dequeue();
      visited.add(current);
      const neighbors = this.getVertex(current.val);
      for (let neighbor of neighbors) {
        nodes.enqueue(neighbor.node, neighbor.weight);
        if (neighbor.weight < distances[neighbor.node]) {
          distances[neighbor.node] = neighbor.weight;
          previous[neighbor.node] = current.val;
        }
      }
      delete distances[current.val];
    }

    const path = [end];
    let tPath = end;
    while (tPath !== start) {
      tPath = previous[tPath];
      path.unshift(tPath);
    }

    console.log(path);
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

let g = new WeightedGraph();

g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdge('A', 'B', 4);
g.addEdge('A', 'C', 2);
g.addEdge('B', 'E', 3);
g.addEdge('C', 'D', 2);
g.addEdge('C', 'F', 4);
g.addEdge('D', 'E', 3);
g.addEdge('D', 'F', 1);
g.addEdge('F', 'E', 1);

g.dijkstra('A', 'E');
