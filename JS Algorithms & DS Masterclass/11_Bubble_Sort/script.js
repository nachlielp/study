const swap = (arr, i1, i2) => {
  [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
};
function bubbleSort(arr) {
  let flag;
  for (let i = 0; i < arr.length; i++) {
    flag = true;
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        reconstruct(arr, j, j + 1);
        flag = false;
      }
    }
    if (flag) break;
  }
}

let arr1 = [3, 4, 1, 9, 2, 8, 0, 7, 6];
let arr2 = [0, 1, 2, 3, 4, 6, 7, 8, 9];
// bubbleSort(arr1);
// console.log(arr1);
