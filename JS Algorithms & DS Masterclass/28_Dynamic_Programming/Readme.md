# Dynamic Programming

- "A method for solving a complex problem by breaking it down into a collection of simpler sub-problems, solving each of these sub-problems just once, and storing their solutions."

### Overlapping sub-problems

### Optimal Substructure

- "A problem is said to have optimal substructure if an optimal solution can be constructed from optimal solutions of its sub-problems"

#### Memoization

- Example: memoize when using recursion to calculate the nth number in the Fibonacci Sequence, this way every number is calculated once with O(n) as apposed to O(2^n):

```js
function fibonacci(n, memo = []) {
  if (memo[n] !== undefined) return memo[n];
  counter++;
  if (n <= 2) return 1;
  const res = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  memo[n] = res;
  return res;
}
```

#### Tabulation

```js
function fibonacci(n) {
  if (n <= 2) return 1;
  var fibNumbs = [0, 1, 1];
  for (var i; i <= n; i++) {
    fibNumbs[i] = fibNumbs[i - 1] + fibNumbs[i - 2];
  }
  return fibNumbs[n];
}
```
