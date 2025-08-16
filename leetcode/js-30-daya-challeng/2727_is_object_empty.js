/**
 * @param {Object|Array} obj
 * @return {boolean}
 */
var isEmpty = function (obj) {
  if (obj.constructor !== Object) return false;
  for (const _ in obj) {
    return false;
  }
  return true;
};

const obj1 = { x: 5, y: 42 };
const obj2 = {};
const obj3 = [null, false, 0];

console.log(isEmpty(obj1));
console.log(isEmpty(obj2));
console.log(isEmpty(obj3));
