# Graphs

## What is a Graph?

A graph is a collection of nodes and edges.

node = vertex = point

edge = connection between nodes

weighted/unweighted = edges have values (e.g. distance, cost, time)
directed/undirected = edges have direction (e.g. x follows y on twitter, facebook friends)

## Adjacency Matrix

A matrix is a 2D array of size V x V where V is the number of vertices.

For example, A -> B -> C -> D -> E -> F -> A

|     | A   | B   | C   | D   | E   | F   |
| --- | --- | --- | --- | --- | --- | --- |
| A   | 0   | 1   | 0   | 0   | 0   | 1   |
| B   | 1   | 0   | 1   | 0   | 0   | 0   |
| C   | 0   | 1   | 0   | 1   | 0   | 0   |
| D   | 0   | 0   | 1   | 0   | 1   | 0   |
| E   | 0   | 0   | 0   | 1   | 0   | 1   |
| F   | 1   | 0   | 0   | 0   | 1   | 0   |

## Adjacency List

A list of arrays, each containing the nodes that are connected to the node at the index.

For example, A -> B -> C -> D -> E -> F -> A
Hashtable:

```js
const graph = {
  A: ["B", "F"],
  B: ["A", "C"],
  C: ["B", "D"],
  D: ["C", "E"],
  E: ["D", "F"],
  F: ["E", "A"],
};
```

## Big O Notation

(V = vertices, E = edges)

| Operation     | Adjacency Matrix | Adjacency List |
| ------------- | ---------------- | -------------- |
| Add Vertex    | O(V²)            | O(1)           |
| Add Edge      | O(1)             | O(1)           |
| Remove Vertex | O(V²)            | O(V + E)       |
| Remove Edge   | O(1)             | O(E)           |
| Query         | O(1)             | O(V + E)       |
| Storage       | O(V²)            | O(V + E)       |

## Add/ Remove Vertex & Edge

```js
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
}
```

## Graph Traversal

### Depth First Search (DFS)

          A
        /   \
       B     C
       |     |
       D --- E
        \   /
          F

```js
const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "E"],
  D: ["B", "E", "F"],
  E: ["C", "D", "F"],
  F: ["D", "E"],
};
```

Path: A -> B -> D -> E -> C -> E -> F

This can be done using a stack or recursion.

```js
// Recursive
dfs(v) {
    if (!this.adjacencyList[v]) return null;

    let result = [];
    let visited = {};

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

  //Stack
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
```

### Breadth First Search (BFS)
