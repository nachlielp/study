//### Prototype Chain and Method Lookup
// const animal = {
//   eats: true,
//   walk() {
//     console.log("Animal walks");
//   },
// };

// const rabbit = {
//   jumps: true,
// };

// rabbit.__proto__ = animal; // set prototype

// console.log(rabbit.eats); // true (found in animal)
// rabbit.walk();

//#### Consturctor Functions and Prototypes
//john --> Person.prototype --> Object.prototype --> null
// function Person(name) {
//   this.name = name;
// }

// Person.prototype.sayHello = function () {
//   console.log(`Hello, I'm ${this.name}`);
// };

// const john = new Person("John");
// john.sayHello();

//### NOT VALID - since arrow functions dont have access to this
// function Person(name) {
//   this.name = name;
// }

// Person.prototype.sayHello = () => {
//   console.log(`Hello, I'm ${this.name}`); // ❌ this is not the instance
// };
// const alice = new Person("Alice");

//## Object.create Object.getPrototypeOf

// const animal = {
//   eats: true,
//   walk() {
//     console.log("Animal walks");
//   },
// };

// const rabbit = Object.create(animal); // rabbit.__proto__ = animal
// rabbit.jumps = true;

// console.log(rabbit.eats); // true (inherited from animal)
// rabbit.walk(); // "Animal walks"
// console.log(Object.getPrototypeOf(rabbit) === animal); // true

//#Drills
//## Polyfill `instanceof` as `myInstanceOf(obj, Ctor)`
// class Car {
//   constructor(make, model, year) {
//     this.make = make;
//     this.model = model;
//     this.year = year;
//   }
// }

// const auto = new Car("Honda", "Accord", 1998);

// function myInstanceOf(obj, Ctor) {
//   const constructorPrototype = Ctor.prototype;

//   let currentPrototype = Object.getPrototypeOf(obj);

//   while (currentPrototype !== null) {
//     if (currentPrototype === constructorPrototype) {
//       return true;
//     }
//     currentPrototype = Object.getPrototypeOf(currentPrototype);
//   }

//   return false;
// }

// console.log(myInstanceOf(auto, Car));
// console.log(myInstanceOf(auto, Object));

//## Implement a class hierarchy with override and `super`
// class Animal {
//   constructor(name) {
//     this.name = name;
//   }
//   speak() {
//     console.log(`${this.name} makes a noise`);
//   }
// }

// class Dog extends Animal {
//   constructor(name, breed) {
//     super(name);
//     this.breed = breed;
//   }

//   speak() {
//     console.log(`${this.name} barks`);
//   }
// }

// const dog = new Dog("Rex", "Labrador");
// dog.speak();

//## Implement `myNew(Ctor, ...args)` operator behavior

// function myNew(Ctor, ...args) {
//   const obj = Object.create(Ctor);
//   const result = Ctor.apply(obj, args);
//   return result !== null &&
//     (typeof result === "object" || typeof result === "function")
//     ? result
//     : obj;
// }
