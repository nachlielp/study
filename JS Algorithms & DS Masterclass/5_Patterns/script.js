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
// const res = arrSquaredCheck2([5, 1, 3, 5], [9, 25, 25, 1]);
// console.log("res: ", res);

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
// console.log(isAnagram("texttwisttime", "timetwisttext"));//true

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
// console.log(sumZeroPare([-3, -2, 0, 1, 1, 4, 5]));

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
// console.log(countUniqueValues([1, 1, 2, 3, 4, 4, 4, 5, 5, 5, 6, 12, 12, 14])); //8
//[4,3,2,7],2
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
    sum = Math.max(temp, sum);
  }
  return sum;
}
// console.log(maxSubArrSum([4, 3, 2, 7, 5, 1], 3));

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
// console.log(search([-1, 0, 1, 3, 5, 7, 23, 34, 55], -1));
