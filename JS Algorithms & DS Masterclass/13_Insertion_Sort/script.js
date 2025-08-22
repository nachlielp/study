// INSERTION SORT: Builds the sorted array one element at a time by inserting each element
// into its correct position. Very efficient for small datasets and nearly sorted arrays.
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let minI = -1;
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[i]) {
        minI = j;
      }
    }
    if (minI !== -1) move(arr, i, minI);
  }
  return arr;
}
const move = (arr, from, to) => {
  //remove 1 element form
  const [el] = arr.splice(from, 1);
  //add el at to, replace 0
  arr.splice(to, 0, el);
};
const arr = [5, 2, 3, 1, 4];
// console.log(insertionSort(arr));
//go over from i back to 0 and find where arr[i] belongs
//create new array with new placement for arr[i]

//implement slice
//arr.slice([start[, end]]), notice it is up to end, not included

const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
const citrus = fruits.slice(0, 3);
// console.log(citrus);

//implement splice
//array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
const months = ["Jan", "March", "April", "June"];
months.splice(1, 0, "Feb");
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, "May");
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
months.splice(2, 1);
console.log(months);
