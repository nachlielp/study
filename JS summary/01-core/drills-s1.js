//# Counter
// function counter() {
//   this.count = 0;

//   setInterval(() => {
//     this.count++;
//     console.log(this.count);
//   }, 1000);
// }

// const counter = () => {
//   this.count = 0;
//   const that = this;
//   setInterval(() => {
//     that.count++;
//     console.log(that.count);
//   }, 1000);
// };

// const counter = () => {
//   this.count = 0;

//   const tick = function () {
//     this.count++;
//     console.log(this.count);
//   }.bind(this);
//   setInterval(tick, 1000);
// };

// counter();

//# Once

// const once = (func) => {
//   let called = false;
//   let result;
//   return function (...args) {
//     if (!called) {
//       result = func.apply(this, args);
//       called = true;
//     }
//     return result;
//   };
// };

// const init = () => Math.random();
// const initOnce = once(init);
// console.log(initOnce() === initOnce());

//# myBind

if (!Function.prototype.myBind) {
  Function.prototype.myBind = function (thisArg, ...bindArgs) {
    const originalFn = this;

    return function (...callArgs) {
      return originalFn.apply(thisArg, [...bindArgs, ...callArgs]);
    };
  };
}

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "Bob" };

const boundGreet = greet.myBind(person, "Hi");
boundGreet("!");
