// SELECTION SORT: Finds the minimum element in each pass and places it at the beginning.
// Makes fewer swaps than bubble sort but always performs O(n²) comparisons regardless of input.
const swap = (arr, i1, i2) => {
  [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
};
function selectionSort(arr) {
  let minI;
  for (let i = 0; i < arr.length; i++) {
    minI = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minI]) minI = j;
    }
    if (minI !== i) swap(arr, minI, i);
  }
}
let arr1 = [3, 4, 1, 9, 2, 8, 0, 7, 6];
let arr2 = [0, 1, 2, 3, 4, 6, 7, 8, 9];
selectionSort(arr1);
// selectionSort(arr2);
console.log(arr1);
// console.log(arr2);
