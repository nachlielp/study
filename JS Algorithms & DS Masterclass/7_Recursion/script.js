function isOdd(arr, i = 0) {
  if (!arr.length) {
    return;
  }
  if (arr[i] % 2 === 1) {
    console.log(arr[i]);
  } else {
    console.log(arr[i]);
    isOdd(arr, ++i);
  }
}
// console.log(isOdd([6, 8, 2, 1, 4, 2]));
function sumRange(n) {
  if (n === 1) return 1;
  return n + sumRange(n - 1);
}
// console.log(sumRange(5));

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
// console.log(factorial(4));

function collectOddsHelper(arr) {
  const odds = [];
  function helper(helperArr, i = 0) {
    if (i === helperArr.length) {
      return;
    }
    if (helperArr[i] % 2 === 1) {
      odds.push(helperArr[i]);
    }
    helper(helperArr, ++i);
  }
  helper(arr);
  console.log(odds);
}
// collectOddsHelper([1, 2, 3, 4, 5, 6, 7, 8, 9]);

function collectOddsPure(arr) {
  if (arr.length === 0) {
    return [];
  }
  if (arr[0] % 2 === 1) {
    return [arr[0], ...collectOddsPure(arr.slice(1))];
  } else {
    return [...collectOddsPure(arr.slice(1))];
  }
}
console.log("res: ", collectOddsPure([1, 2, 3, 4, 5, 6, 7, 8, 9]));
