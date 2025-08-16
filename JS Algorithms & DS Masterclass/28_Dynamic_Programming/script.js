//45 -> 2269806339
function fibonacci_memo(n, memo = []) {
  if (memo[n] !== undefined) return memo[n];
  if (n <= 2) return 1;
  const res = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo);
  memo[n] = res;
  return res;
}

function fibonacci_table(n) {
  if (n <= 2) return 1;
  var fibNumbs = [0, 1, 1];
  for (var i; i <= n; i++) {
    fibNumbs[i] = fibNumbs[i - 1] + fibNumbs[i - 2];
  }
  return fibNumbs[n];
}

// Coin Change - Greedy Algorithm
// returns the smallest array of coins needed to equal amount
function minCoinChange(coins, amount, limit = 0) {
  let sum = 0;
  let res = [];
  let i = coins.length - 1;
  while (sum < amount && i >= 0) {
    if (limit && i === coins.length - 1 && res.length >= limit) i--;
    if (amount - sum >= coins[i]) {
      sum += coins[i];
      res.push(coins[i]);
    } else {
      i--;
    }
  }
  if (sum === amount) return res;
  return [];
}

// Dynamic Programming - Coin Change
// Write a function called coinChange which accepts two parameters: an array of denominations and a value. The function should return the number of ways you can obtain the value from the given collection of denominations. You can think of this as figuring out the number of ways to make change for a given value from a supply of coins.

// Examples:

// const denominations = [1, 5, 10, 25]

// coinChange(denominations, 1) // 1
// coinChange(denominations, 2) // 1
// coinChange(denominations, 5) // 2
// coinChange(denominations, 10) // 4
// coinChange(denominations, 25) // 13
// coinChange(denominations, 45) // 39
// coinChange(denominations, 100) // 242
// coinChange(denominations, 145) // 622
// coinChange(denominations, 1451) // 425663
// coinChange(denominations, 14511) // 409222339

//25
//10,10,5
//10,10,1,1,1,1,1
//10,5,5,5
//10,5,5,1,1,1,1,1
//10,5,1,1,1,1,1,1,1,1,1,1
//10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
//5,5,5,5,5
//5,5,5,5,1,1,1,1,1
//5,5,5,1,1,1,1,1,1,1,1,1,1
//5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
//5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
//1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1

//10,10,10
console.log(coinChange([1, 5, 10, 25], 14511));
function coinChange(coins, amount) {
  // Create a DP array to store the number of ways to make each amount
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1; // Base case: there's one way to make amount 0

  // For each coin
  for (let coin of coins) {
    // For each amount from coin to target amount
    for (let i = coin; i <= amount; i++) {
      // Add the number of ways to make (current amount - coin)
      dp[i] += dp[i - coin];
    }
  }

  return dp[amount];
}
