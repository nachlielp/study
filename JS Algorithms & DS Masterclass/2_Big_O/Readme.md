<h1>Big O Notation</h1>

- A way to formalize fuzzy counting
- Allows us to talk formally about how the runtime of an algorithm grows as the inputs grow

Ex 1: AddUpTo:

```
function addUpTo_1(n) {
 let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
```

```
function addUpTo_2(n) {
  return (n * (n + 1)) / 2;
}
```

//(1+2+3...+n)+(n+(n-1)+(n-2)...+1) = n(n+1)

What way is better?
What does better mean?

- Faster?
- Less memory-intensive?
- More readable?

addUpTo_1 does 5n+2 operations -> linear f(n)=n -> O(1)
addUpTo_2 does 3 operations, regardless of the size of n - constant f(n)=1 -> O(n)

But what we care is not the exact number of operations, but the general trend. So with addUpTo_1 we can say that the number of operations grows roughly in proportion to n, while with addUpTo_2 the number of operations is constant.

```
function printAllPairs(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i, j);
    }
  }
}
```

printAllPairs(n) does n operations n times, so it does n^2 operations - quadratic f(n)=n^2 -> O(n^2)

<h2>Auxiliary Space Complexity</h2>
What concerns us is the space complexity of the algorithm, not the space complexity of the inputs, so the size of the input array is not relevant, but the size of the array that we allocate in the function is.

So a Sum algorithm has a space complexity of O(1) since it only uses a total variable, and an algorithm that takes an array of n elements and creates a new array with the same elements reversed, has a space complexity of O(n).

- Most primitives are constant space

- Strings require O(n) space (where n is the string length)

- Reference types are generally O(n), where n is the length (for arrays) or the number of keys (for objects)

<h2>Logarithms</h2>
- A logarithm is the inverse of exponentiation
B^P=N -> logB(N)=P
Since it is all dealing with the same base (probably 2) so be just write log(N) since the trend is what matters.
- A log(n) complexity is slightly better than a linear complexity, but not as good as a constant complexity.
