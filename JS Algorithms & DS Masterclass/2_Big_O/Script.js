//O(n)
function addUpTo_1(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
//O(1)
function addUpTo_2(n) {
  return (n * (n + 1)) / 2;
}
//(1+2+3...+n)+(n+(n-1)+(n-2)...+1) = n(n+1)
``;
//O(n^2)
function printAllPairs(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i, j);
    }
  }
}
