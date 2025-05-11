console.log("# Graphs");

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(v) {
    if (!this.adjacencyList[v]) {
      this.adjacencyList[v] = [];
    }
  }

  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter((e) => e !== v2);
    this.adjacencyList[v2] = this.adjacencyList[v2].filter((e) => e !== v1);
  }

  removeVertex(v) {
    for (let e of this.adjacencyList[v]) {
      this.removeEdge(v, e);
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
          if (!visited[e]) helper(e);
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
          stack.push(neighbour);
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
          if (!visited[neighbour]) queue.push(neighbour);
        });
      }
    }
    return result;
  }
}

let g = new Graph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("D", "F");
g.addEdge("E", "F");

console.log(g.bfsQueue("A"));
