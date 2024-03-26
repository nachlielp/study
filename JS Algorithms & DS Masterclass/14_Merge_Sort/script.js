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
console.log(mergeSort([5, 9, 0, 1, 7, 2, 3, 8, 6, 4]));
