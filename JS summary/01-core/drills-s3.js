const arr = [1, 2, [3, [4], 5], 6];

function flatten(arr) {
  let newArr = [];
  for (const a of arr) {
    if (Array.isArray(a)) {
      newArr = [...newArr, ...flatten(a)];
    } else {
      newArr.push(a);
    }
  }
  return newArr;
}
console.log(flatten(arr));
