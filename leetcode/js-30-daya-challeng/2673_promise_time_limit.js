// Given an asynchronous function fn and a time t in milliseconds, return a new time limited version of the input function. fn takes arguments provided to the time limited function.

// The time limited function should follow these rules:

// If the fn completes within the time limit of t milliseconds, the time limited function should resolve with the result.
// If the execution of the fn exceeds the time limit, the time limited function should reject with the string "Time Limit Exceeded".

var timeLimit = function (fn, t) {
  const failTimer = () =>
    new Promise((_, reject) =>
      setTimeout(() => {
        reject(`Time Limit Exceeded`);
      }, t)
    );

  return async function (...args) {
    return Promise.race([fn(...args), failTimer()]);
  };
};

const fn = async (n) => {
  await new Promise((res) => setTimeout(res, 100));
  return n * n;
};

const limited = timeLimit(fn, 150);

limited(20)
  .then((res) => console.log("res: ", res))
  .catch((e) => console.log(`e: ${e}`));
/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */
