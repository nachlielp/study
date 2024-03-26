# Merge Sort

O(n log n)

The Merge Sort algorithm is a sorting algorithm that uses the divide and conquer technique. It is a stable sorting algorithm. The algorithm divides the input into two halves, sorts them separately, and then merges them. The merge sort algorithm is efficient for large data sets.

The algorithm is as follows:

1. Divide the input into two halves.
2. Each half is divided recursively until it is a single element.
3. Recursively merge the two halves as a sorted array

The time complexity of the merge sort algorithm is O(n log n).

```
function merge(arr1, arr2) {
  let arr = [],
    i = 0,
    j = 0;
  while (i < arr1.length && j < arr2.length) {
    arr1[i] <= arr2[j] ? arr.push(arr1[i++]) : arr.push(arr2[j++]);
  }
  if (i < arr1.length) arr = [...arr, ...arr1.slice(i)];
  if (j < arr2.length) arr = [...arr, ...arr2.slice(j)];
  return arr;
}

function mergeSort(arr) {
  console.log(arr);
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}
```
