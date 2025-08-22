// RADIX SORT: Non-comparison based sorting algorithm that sorts by individual digits.
// Works by distributing elements into buckets based on each digit. Time complexity: O(nk) where k is number of digits.
const getDigit = (el, d) => {
  return Math.floor((Math.abs(el) / Math.pow(10, d)) % 10);
};
function flatten(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      newArr = [...newArr, ...flatten(arr[i])];
    } else {
      newArr.push(arr[i]);
    }
    arr[i] = [];
  }
  return newArr;
}
const numLen = (num) => {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
};
const mostDigits = (arr) => {
  let maxD = 0;
  for (let t of arr) {
    maxD = Math.max(maxD, numLen(t));
  }
  return maxD;
};
const radixSort = (arr) => {
  let bucket = [];
  const rounds = mostDigits(arr);
  for (let d = 0; d < rounds; d++) {
    bucket = Array.from({ length: 10 }, () => []);
    for (let t of arr) {
      bucket[getDigit(t, d)].push(t);
    }
    arr = [].concat(...bucket);
  }
  return arr;
};

const arr = [349, 34, 234, 155, 23, 1111, 534, 231, 98, 3, 234, 0];
console.log(radixSort(arr));
