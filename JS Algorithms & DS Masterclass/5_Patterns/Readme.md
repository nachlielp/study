# List of patterns in this section:

1. Frequency Counter
2. Multiple Pointer
3. Sliding Window
4. Divide and Conquer
5. Dynamic Programming
6. Greedy Algorithms
7. Backtracking

### Frequency Counter

Example, arrSquaredCheck() checks if two arrays have the same frequency of elements and arr2 has the elements squared for each element in arr1, i.e. arrSquaredCheck([1, 2, 3], [4, 1, 9]) returns true.

my solution:

```
function arrSquaredCheck1(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const frequencyCounter1 = {};
  const frequencyCounter2 = {};
  for (const val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (const val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }
  for (const [key, value] of Object.entries(frequencyCounter1)) {
    const keySquared = key * key;
    if (frequencyCounter2[keySquared] !== value) {
      return false;
    }
  }
  return true;
}
```

refactored solution:

```
function arrSquaredCheck2(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const frequencyCounter = {};
  arr1.forEach((val) => {
    const valSq = val * val;
    frequencyCounter[valSq] = (frequencyCounter[valSq] || 0) + 1;
  });

  for (const val of arr2) {
    if (!frequencyCounter[val] || --frequencyCounter[val] < 0) {
      return false;
    }
  }

  return true;
}
```

### Frequency Counter: Anagram

```
function isAnagram(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const frequencyCounter = {};

  for (const val of str1) {
    frequencyCounter[val] = (frequencyCounter[val] || 0) + 1;
  }
  for (const val of str2) {
    if (!frequencyCounter[val] || --frequencyCounter[val] < 0) {
      return false;
    }
  }

  return true;
}
```

### Multiple Pointer

```
//find first pare where sum is 0 in sorted arr of integers
function sumZeroPare(arr) {
  let i = 0;
  let j = arr.length - 1;
  while (i < j) {
    const sum = arr[i] + arr[j];
    if (sum === 0) {
      return [arr[i], arr[j]];
    } else if (sum > 0) {
      j--;
    } else if (sum < 0) {
      i++;
    }
  }
}
```

```
//receives sorted array of integers
function countUniqueValues(arr) {
  if (!arr.length) {
    return 0;
  }
  let i = 0;
  let j = 1;
  let counter = 1;
  while (j < arr.length) {
    if (arr[i] === arr[j]) {
      j++;
    } else if (arr[j] > arr[i]) {
      i = j;
      j++;
      counter++;
    }
    console.log(`i: ${i}, j: ${j}, counter: ${counter}`);
  }
  return counter;
}
```

### Sliding Window

maxSubArrSum(arr:number[],n:number)//find n near elements with the hights sum

```
function maxSubArrSum(arr, n) {
  if (n > arr.length) {
    return;
  }
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += arr[i];
  }
  for (let i = 1; i < arr.length - n + 1; i++) {
    const temp = sum - arr[i - 1] + arr[i + n - 1];
    sum=Math.max(temp,sum)
  }
  return sum;
}
```

### Divide and Conquer

```
function search(arr, n) {
  let i = -1;
  let min = 0;
  let max = arr.length - 1;
  while (min <= max) {
    i = Math.floor((max + min) / 2);
    const current = arr[i];
    if (current > n) {
      max = i - 1;
    } else if (current < n) {
      min = i + 1;
    } else if (current === n) {
      return i;
    }
  }
  return i;
}
```
