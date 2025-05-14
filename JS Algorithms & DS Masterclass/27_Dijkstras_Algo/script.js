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
}

let g = new WeightedGraph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B", 4);
g.addEdge("A", "C", 2);
g.addEdge("C", "D", 2);
g.addEdge("C", "F", 4);
g.addEdge("D", "F", 1);
g.addEdge("D", "E", 3);
g.addEdge("B", "E", 3);
g.addEdge("F", "E", 1);

const start = "A";
const end = "E";

dijkstra(start, end, g);

function dijkstra(start, end, graph) {
  const visited = [];
  const previous = {};
  const shortestDis = {};

  for (let node of Object.keys(graph.adjacencyList)) {
    shortestDis[node] = Infinity;
    previous[node] = null;
  }
  shortestDis[start] = 0;

  while (visited.length < Object.keys(graph.adjacencyList).length) {
    let shortestNotVisited;
    let shortestDestince = Infinity;
    for (let node of Object.keys(shortestDis)) {
      if (!visited.includes(node) && shortestDis[node] < shortestDestince) {
        shortestDestince = shortestDis[node];
        shortestNotVisited = node;
      }
    }
    visited.push(shortestNotVisited);

    const neighbours = graph.getVertex(shortestNotVisited);
    for (let neighbour of neighbours) {
      if (neighbour.weight < shortestDis[neighbour.node]) {
        shortestDis[neighbour.node] = neighbour.weight;
        previous[neighbour.node] = shortestNotVisited;
      }
    }
    delete shortestDis[shortestNotVisited];
  }

  let path = `->${end}`;
  let tPath = end;
  while (tPath !== start) {
    tPath = previous[tPath];
    if (tPath === start) {
      path = `${tPath}` + path;
    } else {
      path = `->${tPath}` + path;
    }
  }

  console.log(path);
}
