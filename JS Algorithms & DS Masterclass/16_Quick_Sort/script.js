// QUICK SORT: In-place sorting algorithm using pivot partitioning. Average case O(n log n)
// but worst case O(n²). Widely used in practice due to its efficiency and cache-friendly nature.
const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};
const pivot = (arr, from = 0, to = arr.length - 1) => {
  const pp = arr[from];
  for (let i = from + 1; i <= to; i++) {
    if (arr[i] <= pp) swap(arr, i, from++);
  }
  return from;
};

const quickSort = (arr, from = 0, to = arr.length - 1) => {
  if (from >= to) return;
  const i = pivot(arr, from, to);
  quickSort(arr, from, i - 1);
  quickSort(arr, i + 1, to);
};
const arr = [5, 9, 0, 1, 7, 2, 3, 8, 6, 4];
quickSort(arr);
console.log(arr);
