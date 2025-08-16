function createPerson(name) {
  const person = Object.create(userFunctionStore);
  person.name = name;
  return person;
}
const userFunctionStore = {
  score: 0,
  getName: function () {
    return this.name;
  },
  getScore: function () {
    return this.score;
  },
  incr: function () {
    this.score++;
  },
};

function hasMethod(obj, methodName) {
  return typeof obj[methodName] === "function";
}

const user = createPerson("nate");
user.incr();
console.log(user.getScore());
