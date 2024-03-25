# Recursion

A method that calls itself is called recursion.

Recursion is a method of solving problems by breaking them down into smaller sub-problems.

## Call Stack

The call stack is a data structure that stores information about the active sub-routines or functions in a program.

### Example:

For 4! we get 4*3*2\*1 and return 24

```
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

## Helper method Recursion

A helper method is a method that is used to solve a problem by breaking it down into smaller sub-problems.

### Example with helper method:

I use i to avoid needing to slice arr and increase the complexly

```
function collectOdds(arr) {
  const odds = [];
  function helper(helperArr, i = 0) {
    if (i === helperArr.length) {
      return;
    }
    if (helperArr[i] % 2 === 1) {
      odds.push(helperArr[i]);
    }
    helper(helperArr, ++i);
  }
  helper(arr);
  console.log(odds);
}
collectOdds([1, 2, 3, 4, 5, 6, 7, 8, 9]);
```

### Example pure recursion:

```
function collectOddsPure(arr) {
  if (arr.length === 0) {
    return [];
  }
  if (arr[0] % 2 === 1) {
    return [arr[0], ...collectOddsPure(arr.slice(1))];
  } else {
    return [...collectOddsPure(arr.slice(1))];
  }
}
console.log("res: ", collectOddsPure([1, 2, 3, 4, 5, 6, 7, 8, 9]));
```
