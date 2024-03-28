//Given two positive integers, find out if the two numbers have the same frequency of digits.
//Your solution MUST have the following complexities:

const { copyStringIntoBuffer } = require("pdf-lib");

//Time: O(N)
function sameFrequency(x, y) {
  const fqX = {};
  while (x !== 0) {
    const t = x % 10;
    fqX[t] = (fqX[t] || 0) + 1;
    x = Math.floor(x / 10);
  }
  while (y !== 0) {
    const t = y % 10;
    if (!fqX[t] || --fqX[t] < 0) {
      return false;
    }
    y = Math.floor(y / 10);
  }
  return true;
}
// console.log(sameFrequency(182, 281)); // true
// console.log(sameFrequency(34, 14)); // false
// console.log(sameFrequency(3589578, 5879385)); // true
// console.log(sameFrequency(22, 222)); // false

//Implement a function called, areThereDuplicates which accepts a variable
//number of arguments, and checks whether there are any duplicates among the
//arguments passed in.  You can solve this using the frequency counter pattern
//OR the multiple pointers pattern.
//Time & Space of O(n) - frequency counter
function areThereDuplicates(...arr) {
  const fq = {};
  while (arr.length) {
    const t = arr[arr.length - 1];
    fq[t] = (fq[t] || 0) + 1;
    if (t && fq[t] > 1) {
      return true;
    }
    arr.pop();
  }
  return false;
}

// console.log(areThereDuplicates(1, 2, 3)); // false
// console.log(areThereDuplicates(1, 2, 2)); // true
// console.log(areThereDuplicates("a", "b", "c", "a")); // true

//Write a function called averagePair. Given a sorted array of integers
//and a target average, determine if there is a pair of values in the array
//where the average of the pair equals the target average. There may be more
//than one pair that matches the average target.
//Time O(n), Space O(1)
function averagePair(arr, avg) {
  // add whatever parameters you deem necessary - good luck!
  if (arr.length < 2) {
    return false;
  }

  let i = 0;
  let j = arr.length - 1;
  while (i < j) {
    if (arr[j] > avg * 2) {
      j--;
    } else if (arr[j] + arr[i] === avg * 2) {
      return true;
    } else if (arr[j] + arr[i] > avg * 2) {
      j--;
    } else if (arr[j] + arr[i] < avg * 2) {
      i++;
    } else {
      return false;
    }
  }
  return false;
}
// console.log(averagePair([1, 2, 3], 2.5)); // true
// console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)); // true
// console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)); // false
// console.log(averagePair([], 4)); //false

//Write a function called isSubsequence which takes in two strings and
//checks whether the characters in the first string form a subsequence of
//the characters in the second string. In other words, the function should
//check whether the characters in the first string appear somewhere in the
//second string, without their order changing.
//Time O(N+M), Space O(1)
function isSubsequence(sub, str) {
  let j = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === sub[j]) {
      j++;
    }
    if (j === sub.length) {
      return true;
    }
  }
  return false;
}
// console.log(isSubsequence("hello", "hell world")); // true
// console.log(isSubsequence("sing", "sting")); // true
// console.log(isSubsequence("abc", "abracadabra")); // true
// console.log(isSubsequence("abc", "acb")); // false (order matters)

//Given an array of integers and a number, write a function called maxSubarraySum, which finds the maximum sum
//of a subarray with the length of the number passed to the function.
//Note that a subarray must consist of consecutive elements from the original array.
//In the first example below, [100, 200, 300] is a subarray of the original array, but [100, 300] is not.
function maxSubarraySum(arr, n) {
  if (n > arr.length) {
    return null;
  }
  let max = 0;
  for (let i = 0; i < n; i++) {
    max += arr[i];
  }
  let temp = max;
  for (let i = 1; i < arr.length - n + 1; i++) {
    temp = temp - arr[i - 1] + arr[i + n - 1];
    max = Math.max(temp, max);
  }
  return max;
}
// console.log(maxSubarraySum([100, 200, 300, 400], 2)); // 700
// console.log(maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // 39
// console.log(maxSubarraySum([-3, 4, 0, -2, 6, -1], 2)); // 5
// console.log(maxSubarraySum([3, -2, 7, -4, 1, -1, 4, -2, 1], 2)); // 5
// console.log(maxSubarraySum([2, 3], 3)); // null

//Write a function called minSubArrayLen which accepts two parameters - an array of
//positive integers and a positive integer.
//This function should return the minimal length of a contiguous subarray of which
//the sum is greater than or equal to the integer passed to the function. If there
//isn't one, return 0 instead.
function minSubArrayLen(arr, n) {
  let start = 0;
  let end = 0;
  let window = arr[0];
  let len = Infinity;
  while (start < arr.length) {
    if (window >= n) {
      if (len > end - start + 1) {
        len = end - start + 1;
      }
    }
    if (window <= n && end < arr.length - 1) {
      window += arr[++end];
    } else {
      window -= arr[start++];
    }
  }
  return len !== Infinity ? len : 0;
}
// console.log(minSubArrayLen([2, 3, 2, 1, 4, 3], 7)); // 2 -> because [4,3] is the smallest subarray
// console.log(minSubArrayLen([2, 1, 6, 5, 4], 9)); // 2 -> because [5,4] is the smallest subarray
// console.log(minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52)); // 1 -> because [62] is greater than 52
// console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 39)); // 3
// console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 55)); // 5
// console.log(minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11)); // 2
// console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95)); // 0

//Write a function called findLongestSubstring, which accepts a string and returns
//the length of the longest substring with all distinct characters.

function findLongestSubstring(str) {
  if (!str.length) {
    return 0;
  }
  const fq = {};
  let max = 0;
  let start = 0;

  for (let end = 0; end < str.length; end++) {
    const c = str[end];
    if (!fq.hasOwnProperty(c)) {
      fq[c] = end;
    } else if (fq[c] >= start) {
      start = fq[c] + 1;
      fq[c] = end;
    } else if (fq[c] < start) {
      fq[c] = end;
    }
    const diff = end - start + 1;
    if (diff > max) {
      max = diff;
    }
  }
  return max;
}

// console.log(findLongestSubstring("")); // 0
// console.log(findLongestSubstring("abcbcba")); // 3
// console.log(findLongestSubstring("rithmschool")); // 7
// console.log(findLongestSubstring("thisisawesome")); // 6
// console.log(findLongestSubstring("thecatinthehat")); // 7
// console.log(findLongestSubstring("bbbbbb")); // 1
// console.log(findLongestSubstring("longestsubstring")); // 8
// console.log(findLongestSubstring("thisishowwedoit")); // 6
