const arrowGreet = (greeting, punctuation) => {
  console.log(`${greeting}, ${this.name}${punctuation}`);
};

const person2 = { name: "Bob" };

arrowGreet.call(person2, "Hello", "!"); // Hello, undefined!
arrowGreet.apply(person2, ["Hi", "!!"]); // Hi, undefined!!
const boundArrow = arrowGreet.bind(person2, "Hey");
boundArrow("?");
