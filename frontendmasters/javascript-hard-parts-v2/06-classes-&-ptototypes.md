## Function factory

in this example, every instance of the createPerson function will have its own name property and getName method.

```js
function createPerson(name) {
  return {
    name,
    getName() {
      return this.name;
    },
  };
}
```

## Prototypes

in this example, the createPerson function is a function factory that creates a new object with the userFunctionStore prototype, meaning all instances of the createPerson function will have the same getName method.

```js
function createPerson(name) {
  const person = Object.create(userFunctionStore);
  person.name = name;
  return person;
}
const userFunctionStore = {
  getName: function () {
    return this.name;
  },
};
```

This is achived with an implicit parameter called `this` that is passed to the function.

#### Object.prototype

- hasOwnProperty - checks if the object has a property with the given name
- toString - returns a string representation of the object
- valueOf - returns the primitive value of the object
- isPrototypeOf - checks if the object is a prototype of the given object
- propertyIsEnumerable - checks if the object has a property with the given name that is enumerable
- toLocaleString - returns a string representation of the object in the local language
- toJSON - returns a JSON representation of the object
- getPrototypeOf - returns the prototype of the object
- setPrototypeOf - sets the prototype of the object

## new keyword

```js
function Person(name) {
  this.name = name;
}
const user = new Person("nate");
```

The new keyword creates a new object and sets the prototype of the object to the prototype of the constructor function.
