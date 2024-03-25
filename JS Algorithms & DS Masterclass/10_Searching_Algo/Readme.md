### Linear Search

complexity of O(n)

```
function linearSearch(arr, v) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === v) return i;
  }
  return -1;
}
```

### Binary Search

complexity of O(log n)

```
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

In the worst case senario the complexity is O(log n), for example if we have 64 ([1,2,...,64] and looking for 65) elements in the array we need 6 comparisons to find the element.
loop 1: its 32 up
loop 2: its 48 up
loop 3: its 56 up
loop 4: its 60 up
loop 5: its 62 up
loop 6: its 63 up - not in the array
log 64 = 6

```
