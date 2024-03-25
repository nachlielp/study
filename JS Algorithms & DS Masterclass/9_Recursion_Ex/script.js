//reverse
//Write a recursive function called reverse which accepts a string and returns
//a new string in reverse.

function reverse(str) {
  if (str.length === 1) return str[0];
  return str[str.length - 1] + reverse(str.slice(0, -1));
}

// console.log(reverse("awesome")); // 'emosewa'
// console.log(reverse("rithmschool")); // 'loohcsmhtir'

//Write a recursive function called isPalindrome which returns true if the string passed
//to it is a palindrome (reads the same forward and backward). Otherwise it returns false.

function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}

// console.log(isPalindrome("awesome")); // false
// console.log(isPalindrome("foobar")); // false
// console.log(isPalindrome("tacocat")); // true
// console.log(isPalindrome("amanaplanacanalpanama")); // true
// console.log(isPalindrome("muamanaplanacanalpandemonium")); // false

//Write a recursive function called someRecursive which accepts an array and a callback.
//The function returns true if a single value in the array returns true when passed to the
//callback. Otherwise it returns false.
function someRecursive(arr, cb) {
  if (!arr.length) return false;
  const t = cb(arr.pop());
  if (t) return true;
  return someRecursive(arr, cb);
}
const isOdd = (val) => val % 2 !== 0;

// console.log(someRecursive([1, 2, 3, 4], isOdd)); // true
// console.log(someRecursive([4, 6, 8, 9], isOdd)); // true
// console.log(someRecursive([4, 6, 8], isOdd)); // false
// console.log(someRecursive([4, 6, 8], (val) => val > 10)); // false

//Write a recursive function called flatten which accepts an array of arrays and returns a
//new array with all values flattened.
function flatten1(arr) {
  let flatArr = [];
  function helper(arr) {
    if (arr.length === 0) return;
    if (Array.isArray(arr[0])) {
      helper(arr[0]);
      helper(arr.slice(1));
    } else {
      flatArr.push(arr[0]);
      helper(arr.slice(1));
    }
  }
  helper(arr);
  return flatArr;
}

function flatten(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      newArr = [...newArr, ...flatten(arr[i])];
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
// console.log(flatten([1, 2, 3, [4, 5]])); // [1, 2, 3, 4, 5]
// console.log(flatten([1, [2, [3, 4], [[5]]]])); // [1, 2, 3, 4, 5]
// console.log(flatten([[1], [2], [3]])); // [1,2,3]
// console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])); // [1,2,3]

//Write a recursive function called capitalizeFirst. Given an array of strings,
//capitalize the first letter of each string in the array.
function capitalizeFirst(arr) {
  if (arr.length === 0) {
    return [];
  }
  const el =
    arr[0].substring(0, 1).toUpperCase() + arr[0].substring(1, arr[0].length);
  return [el].concat(capitalizeFirst(arr.slice(1)));
}
// console.log(capitalizeFirst(["car", "taco", "banana"])); // ['Car','Taco','Banana']

//Write a recursive function called nestedEvenSum. Return the sum of all even numbers
//in an object which may contain nested objects.

function nestedEvenSum(obj) {
  let sum = 0;
  function helper(obj) {
    for (let value of Object.values(obj)) {
      if (typeof value === "object") {
        helper(value);
      } else if (typeof value === "number" && value % 2 === 0) {
        sum += value;
      }
    }
  }
  helper(obj);
  return sum;
}

var obj1 = {
  outer: 2,
  obj: {
    inner: 2,
    otherObj: {
      superInner: 2,
      notANumber: true,
      alsoNotANumber: "yup",
    },
  },
};

var obj2 = {
  a: 2,
  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
  c: { c: { c: 2 }, cc: "ball", ccc: 5 },
  d: 1,
  e: { e: { e: 2 }, ee: "car" },
};

// console.log(nestedEvenSum(obj1)); // 6
// console.log(nestedEvenSum(obj2)); // 10

//Write a recursive function called capitalizeWords. Given an array of words,
//return a new array containing each word capitalized.

function capitalizeWords(arr) {
  if (arr.length === 0) {
    return [];
  }
  return [arr[0].toUpperCase()].concat(capitalizeWords(arr.slice(1)));
}

let words = ["i", "am", "learning", "recursion"];
// console.log(capitalizeWords(words)); // ['I', 'AM', 'LEARNING', 'RECURSION']

//Write a function called stringifyNumbers which takes in an object and finds all of the values
//which are numbers and converts them to strings. Recursion would be a great way to solve this!
//The exercise intends for you to create a new object with the numbers converted to strings,
//and not modify the original. Keep the original object unchanged.
function flatten(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      newArr = [...newArr, ...flatten(arr[i])];
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
function stringifyNumbers(obj) {
  const newObj = Object.assign({}, obj);
  function helper() {
    for (let [key, value] of Object.entries(newObj)) {
      if (typeof value === "number") {
        newObj[key] = value.toString();
      } else if (typeof value === "object") {
        newObj[key] = stringifyNumbers(value);
      } else {
        newObj[key] = value;
      }
    }
  }
  helper();
  return newObj;
}

// let obj = {
//   num: 1,
//   test: [],
//   data: {
//     val: 4,
//     info: {
//       isRight: true,
//       random: 66,
//     },
//   },
// };
// console.log(stringifyNumbers(obj));

//Write a function called collectStrings which accepts an object and returns an array of all
//the values in the object that have a typeof string
function collectStrings(obj) {
  let arr = [];
  for (const value of Object.values(obj)) {
    if (typeof value === "string") {
      arr.push(value);
    } else if (typeof value === "object") {
      return arr.concat(collectStrings(value));
    }
  }
  return arr;
}
const obj = {
  stuff: "foo",
  data: {
    val: {
      thing: {
        info: "bar",
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: "baz",
          },
        },
      },
    },
  },
};

// console.log(collectStrings(obj)); // ["foo", "bar", "baz"])
