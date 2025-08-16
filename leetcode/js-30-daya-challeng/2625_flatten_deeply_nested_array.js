var flat = function (arr, n) {
  let res = [];
  for (let el of arr) {
    if (Array.isArray(el) && n > 0) {
      res.push(...flat(el, n - 1));
    } else {
      res.push(el);
    }
  }
  return res;
};

console.log(
  "res: ",
  flat([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 1)
);
