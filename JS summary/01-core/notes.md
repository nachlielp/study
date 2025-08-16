# Section 1 - Core language mastery

## Session 1 - Scope, closures, this, call/apply/bind

### Lexical Scope and Closures

- Lexical Scope - variables are defined in the scope they are declared in - they are not accessible outside of that scope
- Encapsulation - variables are not accessible outside of the scope they are declared in - live a class with private variables and public methods

```js
function counter() {
  let count = 0;
  return {
    increment() {
      count++;
    },
    getCount() {
      return count;
    },
  };
}
```

### Practical Closure Use Cases

- Memoization - caching the result of a function call - useful for expensive calculations

```js
function memoizedFibonacci() {
  const cache = new Map(); // private cache

  return function fib(n) {
    if (n in cache) {
      console.log("Fetching from cache:", n);
      return cache.get(n);
    }
    console.log("Calculating:", n);
    if (n < 2) return n;
    const result = fib(n - 1) + fib(n - 2);
    cache.set(n, result);
    return result;
  };
}
```

### `this` in Functions vs Arrow Functions

- Regular functions lose `this` unless bound

- Arrow functions keep `this` from surrounding scope

- Arguments - arrow functions do not have their own `arguments` object

### Practical Use Cases

- Patterns

  - Once function - a function that can only be called once

  ```js
  function once(fn) {
    let called = false;
    let result;
    return function (...args) {
      if (!called) {
        result = fn(...args);
        called = true;
      }
      return result;
    };
  }
  ```

  - Function Factories - a function that returns a function

  ```js
  function multiplier(factor) {
    return function (n) {
      return n * factor;
    };
  }

  const double = multiplier(2); // double is a function that multiplies by 2
  console.log(double(5)); // 10
  ```

  - Module Pattern - a function that returns an object with private variables and public methods

  ```js
  const UserModule = (function () {
    let name = "John"; // private
    return {
      getName: () => name,
      setName: (newName) => (name = newName),
    };
  })();

  UserModule.getName(); // John
  UserModule.setName("Jane");
  UserModule.getName(); // Jane
  ```

  - Pub/Sub - a function that publishes and subscribes to events

  ```js
  const EventEmitter = (function () {
    const events = {};
    return {
      on: (eventName, callback) => {
        events[eventName] = events[eventName] || [];
        events[eventName].push(callback);
      },
      emit: (eventName, ...args) => {
        events[eventName]?.forEach((callback) => callback(...args));
      },
    };
  })();
  ```

### `new` keyword

- Regular functions can be used as constructors
- Arrow functions cannot be used as constructors

### `prototype` property

- Regular functions have a `prototype` property
- Arrow functions do not have a `prototype` property

  ```js
  function Timer() {
    this.seconds = 0;

    // Regular function loses `this` unless bound
    const that = this;
    setInterval(function () {
      that.seconds++;
      console.log("Regular:", that.seconds);
    }, 1000);

    //or bind the function to the this context
    const tick = function () {
      this.seconds++;
      console.log("Bound:", this.seconds);
    }.bind(this);

    setInterval(tick, 1000);

    // Arrow functions keep `this` from Timer
    setInterval(() => {
      this.seconds++;
      console.log("Arrow:", this.seconds);
    }, 1000);
  }
  new Timer();
  ```

### `arguments` object

- Regular functions have their own `arguments` object
- Arrow functions inherit `arguments` from surrounding scope

  ```js
  function foo() {
    console.log(arguments);
  }

  foo(1, 2, 3); // [1, 2, 3]

  const bar = (a, b) => {
    console.log(arguments);
  };

  bar(1, 2, 3); // ❌ ReferenceError (if no outer arguments)
  ```

### Summary

| Feature                  | Regular Function           | Arrow Function                   |
| ------------------------ | -------------------------- | -------------------------------- |
| **Closures**             | ✅ Yes                     | ✅ Yes                           |
| **`this` binding**       | Dynamic (depends on call)  | Lexical (from surrounding scope) |
| **`arguments` object**   | Own `arguments`            | Inherits from outer scope        |
| **`new` keyword**        | Can be used as constructor | ❌ Cannot be used as constructor |
| **`prototype` property** | Yes                        | No                               |

### `call` / `apply` / `bind`

These all are relevant to the `this` keyword, therefore they are not relevant to arrow functions.

- `call` - calls a function with a given `this` value and arguments
- `apply` - calls a function with a given `this` value and an array of arguments
- `bind` - returns a new function with a given `this` value and arguments

```js
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "Alice" };

greet.call(person, "Hello", "!"); // Hello, Alice!
greet.apply(person, ["Hi", "!!"]); // Hi, Alice!!
const boundGreet = greet.bind(person, "Hey");
boundGreet("?");
```

## Session 2 - Prototypes, classes, object model

### Prototype Chain and Method Lookup

- Prototype chain - a chain of objects that are linked together by a `prototype` property
- Method lookup - the process of finding a method in the prototype chain

```js
const animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  },
};

const rabbit = {
  jumps: true,
};

rabbit.__proto__ = animal; // set prototype

console.log(rabbit.eats); // true (found in animal)
rabbit.walk();
```

### Consturctor Functions and Prototypes

- Constructor functions are functions that are used to create objects
- Constructor functions have a `prototype` property
- Constructor functions can be used as constructors
- Constructor functions can be used to create objects

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}`);
};

const john = new Person("John");
john.sayHello();
```

### Prototype Chain and Method Lookup

```js
const animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  },
};

const rabbit = {
  jumps: true,
};

rabbit.__proto__ = animal;

console.log(rabbit.eats);
rabbit.walk();
```

### `Object.create` and `Object.getPrototypeOf`

- `Object.create` - creates a new object with a given prototype
- `Object.getPrototypeOf` - returns the prototype of an object

```js
const animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  },
};

const rabbit = Object.create(animal); // rabbit.__proto__ = animal
```

```js
const proto = { hello: "world" };
const obj = Object.create(proto);

console.log(Object.getPrototypeOf(obj) === proto); // true
console.log(Object.getPrototypeOf(proto) === Object.prototype); // true since proto is an object that inherits from Object.prototype
```

### Classes, inheritance, and private fields

- Classes are a syntactic sugar for constructor functions
- Classes have a `prototype` property
- Classes can be used as constructors
- Classes can be used to create objects

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
```

## Session 3 - Arrays, objects, immutability

### Map / Filter / Reduce

- Map - creates a new array with the results of calling a function on each element in the original array
- Filter - creates a new array with all elements that pass the test in the original array
- Reduce - reduces the array to a single value

#### Map

- pitfalls
  - does not mutate the original array
  - returns a new array
  - returns the same length as the original array

```js
const newArray = arr.map((element, index, array) => {
  // return transformed value
});
```

#### Filter

- pitfalls
  - retuning a non boolean value will cause the filter to return an array of truthy values

```js
const filtered = arr.filter((element, index, array) => {
  return condition; // truthy to keep, falsy to drop
});
```

#### Reduce

- pitfalls
  - retuning a non boolean value will cause the reduce to return an array of truthy values

```js
const result = arr.reduce((accumulator, currentValue, index, array) => {
  return updatedAccumulator;
}, initialValue);
```

combine:

```js
const nums = [1, 2, 3, 4, 5];
const result = nums
  .filter((n) => n % 2 === 0) // [2, 4]
  .map((n) => n * 10) // [20, 40]
  .reduce((sum, n) => sum + n, 0); // 60
```

#### Sort

- pitfalls
  - by default sorts as strings using UTF-16 code units
  - to sort numbers correctly, you need to provide a comparator function

```js
const sorted = arr.sort((a, b) => {
```

numbers:

```js
const nums = [10, 2, 5];
nums.sort((a, b) => a - b); // ascending
console.log(nums); // [2, 5, 10]

nums.sort((a, b) => b - a); // descending
console.log(nums); // [10, 5, 2]
```

objects by property:

```js
const users = [{ name: "A" }, { name: "B" }];
users.sort((a, b) => a.name.localeCompare(b.name));
console.log(users); // [{ name: "A" }, { name: "B" }]
```

#### Multi level sorting, by type then name:

```js
const items = [
  { name: "banana", type: "fruit" },
  { name: "carrot", type: "veg" },
  { name: "apple", type: "fruit" },
  { name: "beet", type: "veg" },
];

console.log(
  items.sort((a, b) => {
    if (a.type === b.type) {
      return b.name.localeCompare(a.name);
    }
    return b.type.localeCompare(a.type);
  })
);
```

#### Set - unique values

- methods
  - `add` - adds a value to the set
  - `has` - checks if a value is in the set
  - `delete` - removes a value from the set
  - `size` - returns the number of values in the set
  - `clear` - removes all values from the set

```js
const s = new Set([1, 2, 3, 3]);
```

iterating:

```js
for (const item of s) {
  console.log(item);
}
```

#### Map - key value pairs

- Allows non string keys
- Persists order of insertion

- methods
  - `set` - adds a key value pair to the map
  - `get` - gets a value by key
  - `has` - checks if a key is in the map
  - `delete` - removes a key value pair from the map
  - `size` - returns the number of key value pairs in the map
  - `clear` - removes all key value pairs from the map

```js
const m = new Map();
m.set("a", 1);
m.set({ x: 1 }, "obj");
```

iterating:

```js
for (const [key, value] of m) console.log(key, value);
[...m.keys()];
[...m.values()];
[...m.entries()];
```

### Shallow vs Deep Copy

- Shallow copy - copies the reference to the original object
- Deep copy - copies the value of the original object

```js
const original = { a: 1, b: { c: 2 } };
const shallow = { ...original }; // or Object.assign({}, original) - shallow.b.c === original.b.c
```

```js
const deep = structuredClone(original);
deep.b.c = 999;
console.log(original.b.c);
```

or

```js
const deep = JSON.parse(JSON.stringify(original)); // loses functions and symbols
deep.b.c = 999;
console.log(original.b.c);
```

or

```js
function deepClone(value) {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(deepClone);
  return Object.fromEntries(
    Object.entries(value).map(([k, v]) => [k, deepClone(v)])
  );
}
```

#### Circular References

- Circular references are references that point to the same object
- They can cause infinite loops when cloning

```js
const a = {};
const b = { a };
a.b = b;
```

### Drills

#### `groupBy(arr, keyOrFn)`

```js
const arr = [1, 2, 3, 4, 5];
const grouped = groupBy(arr, (item) => item % 2);
console.log(grouped);
```

#### `unique(arr)`

```js
const arr = [1, 2, 3, 4, 5];
const unique = unique(arr);
console.log(unique);
```

#### `flatten(arr)`

```js
const arr = [1, 2, [3, [4], 5], 6];

function flatten(arr) {
  let newArr = [];
  for (const a of arr) {
    if (Array.isArray(a)) {
      newArr = [...newArr, ...flatten(a)];
    } else {
      newArr.push(a);
    }
  }
  return newArr;
}
console.log(flatten(arr));
```

#### `deepClone(obj)`

```js
const obj = { a: 1, b: { c: 2 } };
const deep = deepClone(obj);

function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, deepClone(v)])
  );
}
console.log(deepClone(obj));
```

## Session 4 - Types, coercion, equality, errors

### Types

- Primitive types: `number`, `string`, `boolean`, `null`, `undefined`, `symbol`
  - Imutable, stored directly in memory (stack), compared by value
- Object types: `object`, `array`, `function`, `date`, `regexp`, `map`, `set`, `weakmap`, `weakset`

  - Mutable, stored by reference in heap, compared by reference

- Wrapper types: `Number`, `String`, `Boolean`, `Symbol`, `BigInt`

  - Mutable, stored by reference in heap, compared by reference

- Null vs undefined

  - `null` is an empty value
  - `undefined` is a value that is not defined

- NaN

  - `NaN` is a value that is not a number

- Infinity

  - `Infinity` is a value that is not a number

- Falsy values

  - `false`
  - `0` and `-0`
  - `0n`
  - `""`
  - `null`
  - `undefined`
  - `NaN`

- Truthy values - everything else

### Coercion

- Implicit coercion - automatic conversion of one type to another
- Explicit coercion - manual conversion of one type to another

### Equality

- `==` - compares values after converting both sides to a common type
- `===` - compares values without type conversion

```js
console.log(1 == "1"); // true
console.log(1 === "1"); // false
```

### Optional chaining and nullish coalescing

#### Optional chaining

- `?.` - returns `undefined` if the property does not exist

```js
console.log(obj?.prop);
```

#### Nullish coalescing

- `??` - returns the right hand side if the left hand side is `null` or `undefined`

```js
console.log(obj?.prop ?? "default");
```

### Errors

- `try/catch/finally` - handles errors

```js
try {
  // code that might throw an error
} catch (error) {
  // code to handle the error
} finally {
  // code that will always run
}
```

- `throw` - throws an error

```js
throw new Error("Error message");
```

#### Custom errors

```js
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new ValidationError("Name is required", "name");
  }
}

try {
  validateUser({});
} catch (err) {
  if (err instanceof ValidationError) {
    console.error(`Validation failed on ${err.field}: ${err.message}`);
  } else {
    throw err; // rethrow unknown errors
  }
}
```

#### Error Handling Patterns

- Guard + Rethrow

```js
try {
  riskyOperation();
} catch (err) {
  if (err instanceof KnownError) {
    handleKnownError(err);
  } else {
    throw err; // let it bubble up
  }
}
```

- Fallback defaults

```js
function safeParse(str, fallback = {}) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}
```

- Async/Await

```js
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err; // rethrow to handle in caller
  }
}
```
