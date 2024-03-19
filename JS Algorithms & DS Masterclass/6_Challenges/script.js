//Given two positive integers, find out if the two numbers have the same frequency of digits.
//Your solution MUST have the following complexities:

const { copyStringIntoBuffer } = require("pdf-lib");

//Time: O(N)
function sameFrequency(x, y) {
  const fqX = {};
  while (x !== 0) {
    const t = x % 10;
    fqX[t] = (fqX[t] || 0) + 1;
    x = Math.floor(x / 10);
  }
  while (y !== 0) {
    const t = y % 10;
    if (!fqX[t] || --fqX[t] < 0) {
      return false;
    }
    y = Math.floor(y / 10);
  }
  return true;
}
// console.log(sameFrequency(182, 281)); // true
// console.log(sameFrequency(34, 14)); // false
// console.log(sameFrequency(3589578, 5879385)); // true
// console.log(sameFrequency(22, 222)); // false

//Implement a function called, areThereDuplicates which accepts a variable
//number of arguments, and checks whether there are any duplicates among the
//arguments passed in.  You can solve this using the frequency counter pattern
//OR the multiple pointers pattern.
//Time & Space of O(n) - frequency counter
function areThereDuplicates1(...arr) {
  const fq = {};
  while (arr.length) {
    const t = arr[arr.length - 1];
    fq[t] = (fq[t] || 0) + 1;
    if (t && fq[t] > 1) {
      return true;
    }
    arr.pop();
  }
  return false;
}
//Time O(n log n), Space O(1)
function areThereDuplicates2(...arr) {}
console.log(areThereDuplicates2(1, 2, 3)); // false
console.log(areThereDuplicates2(1, 2, 2)); // true
console.log(areThereDuplicates2("a", "b", "c", "a")); // true
