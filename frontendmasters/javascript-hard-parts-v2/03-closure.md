- Nested function scopes
  - In the example below, func points to the inc function, which has access to the counter variable in the outer function, all stored in the global scope, within a closure of the outer function
  - lexical - static - scope is the scope of the function - where it is defined. So in out case, counter is within the scope where inc is defined, meaning func is stored in the global scope, referencing the counter variable in the outer function.
  - P.L.S.R.D. - Persistent Lexically Scope Reference Data

```js
function outer() {
  let counter = 0;
  const inc = () => ++counter;
  return inc;
}
const func = outer();

console.log(func()); //1
console.log(func()); //2
```

or:

```js
function once(fn) {
  let called = false;
  return function (...args) {
    if (called) return null;
    called = true;
    return fn.apply(this, args);
  };
}
```
