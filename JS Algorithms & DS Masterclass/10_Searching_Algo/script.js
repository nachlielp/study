function linearSearch(arr, v) {
  for (let i in arr) {
    if (arr[i] === v) return i;
  }
  return -1;
}
// console.log(linearSearch([10, 15, 20, 25, 30], 15)); // 1
// console.log(linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 4)); // 5
// console.log(linearSearch([100], 100)); // 0
// console.log(linearSearch([1, 2, 3, 4, 5], 6)); // -1
// console.log(linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10)); // -1
// console.log(linearSearch([100], 200)); // -1

function binarySearch(arr, v) {
  let start = 0;
  let end = arr.length - 1;
  let mid = Math.floor((start + end) / 2);
  while (arr[mid] != v && start <= end) {
    arr[mid] > v ? (end = mid - 1) : (start = mid + 1);
    mid = Math.floor((start + end) / 2);
  }
  return arr[mid] === v ? mid : -1;
}

// console.log(binarySearch([1, 2, 3, 4, 5], 2)); // 1
// console.log(binarySearch([1, 2, 3, 4, 5], 3)); // 2
// console.log(binarySearch([1, 2, 3, 4, 5], 5)); // 4
// console.log(binarySearch([1, 2, 3, 4, 5], 6)); // -1
// console.log(
//   binarySearch(
//     [
//       5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98,
//       99,
//     ],

//     10
//   )
// ); // 2
// console.log(
//   binarySearch(
//     [
//       5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98,
//       99,
//     ],
//     95
//   )
// ); // 16
// console.log(
//   binarySearch(
//     [
//       5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98,
//       99,
//     ],
//     100
//   )
// ); // -1

function naiveStringSearch(str1, str2) {
  if (!str1.length || !str2.length) {
    return -1;
  }
  let counter = 0;
  for (let i = 0; i < str1.length - str2.length + 1; i++) {
    if (str1[i] != str2[0]) continue;
    for (let j = 1; j < str2.length; j++) {
      if (str1[i + j] !== str2[j]) break;
      if (j === str2.length - 1) {
        counter++;
        i += str2.length;
      }
    }
  }
  return counter;
}
// console.log(naiveStringSearch("omgwowomgzomg", "omg"));
