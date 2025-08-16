// 1. Two Sum (O(n))
// Problem:
// Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.
// Assume exactly one solution exists.
// Constraints:
// - Use a single pass with a Map for (O(n)) time.
// - Don’t use nested loops

// console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]

function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }
  return null;
}

//2. Longest Substring Without Repeating Characters (O(n))
// Problem:
// Given a string s, find the length of the longest substring without repeating characters.

// Example:
// lengthOfLongestSubstring("abcabcbb"); // 3 ("abc")
// lengthOfLongestSubstring("bbbbb"); // 1 ("b")
console.log(lengthOfLongestSubstring("abba")); // 2 ("ab")

// Constraints:
// - Use a sliding window with a Set or Map.
// - Aim for (O(n)) time.

function lengthOfLongestSubstring(str) {
  let maxLen = 0;
  let currLen = 0;
  let set = new Set();
  for (const s of str) {
    if (!set.has(s)) {
      currLen++;
      set.add(s);
      maxLen = currLen > maxLen ? currLen : maxLen;
    } else {
      //TODO
      //go back to last instance of s
      set = new Set([...set].slice([...set].indexOf(s) + 1));
      set.add(s);
      currLen = set.size;
    }
  }
  return maxLen;
}

//3. Valid Anagram (O(n))
// Problem:
// Given two strings s and t, return true if t is an anagram of s, otherwise false.

// Example:
// console.log(isAnagram("anagram", "nagaram")); // true
// console.log(isAnagram("rat", "car")); // false

// Constraints:
// - Use a frequency counter (Map or object).
// - Ignore case and assume only lowercase letters for now.

function isAnagram(s, t) {
  const sMap = getWordCountMap(s);
  const tMap = getWordCountMap(t);

  if (sMap.size !== tMap.size) return false;

  for (const k of sMap.keys()) {
    if (sMap.get(k) !== tMap.get(k)) return false;
  }

  return true;
}

function getWordCountMap(word) {
  const map = new Map();
  for (const c of word) {
    if (map.has(c)) {
      map.set(c, map.get(c) + 1);
    } else {
      map.set(c, 1);
    }
  }
  return map;
}

//4. Merge Intervals (O(n log n))
// Problem:
// Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals.

// Example:
// console.log(
//   mergeIntervals([
//     [2, 6],
//     [1, 3],
//     [15, 18],
//     [8, 10],
//   ])
// );
// [[1,6],[8,10],[15,18]]

// Constraints:
// - Sort by start time first.
// - Merge in a single pass after sorting.

function mergeIntervals(intervals) {
  if (intervals.length < 2) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= merged.at(-1)[1]) {
      merged[merged.length - 1][1] = intervals[i][1];
    } else {
      merged.push(intervals[i]);
    }
  }

  return merged;
}

// 5. Binary Search (O(log n))
// Problem:
// Implement binary search on a sorted array. Return the index of the target if found, else -1.

// Example:
// console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9)); // 4
// console.log(binarySearch([-1, 0, 3, 5, 9, 12], 2)); // -1
// console.log(binarySearch([-1, 0, 3, 5, 9, 12], 12)); // 5

// Constraints:
// - Iterative or recursive is fine.
// - Must be \(O(\log n)\).

function binarySearch(nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
