// ## predict `console.log` ordering puzzles

// console.log("A");
// setTimeout(() => {
//   console.log("B");
// }, 0);
// console.log("C");

// A C B

// console.log("A");
// setTimeout(() => {
//   console.log("B");
// }, 0); // Macro task - runs after fist task is done
// Promise.resolve().then(() => {
//   console.log("C");
// }); // Micro task - runs Immediately after main macro task is done
// console.log("D");

//A D C B

// console.log("A");
// Promise.resolve()
//   .then(() => {
//     console.log("B");
//   })
//   .then(() => {
//     console.log("C");
//   });
// console.log("D");

// A D B C

// setTimeout(() => {
//   console.log("A");
//   Promise.resolve().then(() => {
//     console.log("B");
//   });
// }, 0);

// setTimeout(() => {
//   console.log("C");
// }, 0);

// A B C

// document.body.addEventListener("click", () => {
//   console.log("A");
//   Promise.resolve().then(() => {
//     console.log("B");
//   });
// });
// console.log("C");

// Imagine the user clicks *after* this script finishes
// C A B

// fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then(() => {
//     console.log("A");
//   })
//   .then(() => {
//     console.log("B");
//   });

// console.log("C");

//C A B

// console.log("A");

// setTimeout(() => {
//   console.log("B");
//   Promise.resolve().then(() => {
//     console.log("C");
//   });
// }, 0);

// Promise.resolve().then(() => {
//   console.log("D");
// });

// setTimeout(() => {
//   console.log("E");
// }, 0);

// console.log("F");

// A F D B C E

// ## Implement `sleep(ms)`

// function sleep(ms) {
//   return new Promise((res) => setTimeout(res, ms));
// }

// ## Implement `timeoutPromise(promise, ms)`

// function timeoutPromise(promise, ms) {
//   let timeoutId;

//   const timeout = new Promise((_, rej) => {
//     timeoutId = setTimeout(() => {
//       reject(new Error(`Operation timed out after ${ms} ms`));
//     }, ms);
//   });

//   return Promise.reace([
//     promise.finally(() => clearTimeout(timeoutId)),
//     timeout,
//   ]);
// }

// ## Polyfill `promiseAll` and `promiseAllSettled`
// var promiseAll = function (functions) {
//   return new Promise((resolve, reject) => {
//     if (!functions || typeof functions[Symbol.iterator] !== "function") {
//       return reject(new TypeError("Argument is not iterable"));
//     }
//     const results = [];
//     let remaining = 0;
//     let index = 0;

//     for (const f of functions) {
//       const currIdx = index;
//       index++;
//       remaining++;

//       Promise.resolve()
//         .then(() => f())
//         .then((v) => {
//           results[currIdx] = v;
//           remaining--;
//           if (remaining === 0) resolve(results);
//         })
//         .catch(reject);
//     }
//     if (index === 0) {
//       resolve([]);
//     }
//   });
// };

// Promise.__proto__.myAll = myAll;

// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, "foo");
// });

// Promise.myAll([promise1, promise2, promise3]).then((values) => {
//   console.log(values);
// });

function myAllSettled(iterable) {
  return new Promise((resolve, reject) => {
    if (!iterable || typeof iterable[Symbol.iterator] !== "function") {
      return reject(new TypeError("Argument is not iterable"));
    }

    const results = [];
    let remaining = 0;
    let index = 0;

    for (const item of iterable) {
      const currentIndex = index;
      index++;
      remaining++;

      Promise.resolve(item)
        .then((value) => {
          results[currentIndex] = value;
          remaining--;
          if (remaining === 0) {
            resolve(results);
          }
        })
        .catch(() => {
          remaining--;
          if (remaining === 0) {
            resolve(results);
          }
        });
    }

    if (index === 0) {
      resolve([]);
    }
  });
}

Promise.__proto__.myAllSettled = myAllSettled;

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((_, reject) => {
  setTimeout(reject, 100, "foo");
});

// Promise.myAllSettled([promise1, promise2, promise3]).then((values) => {
//   console.log(values);
// });

// ## Concurrency limiter: `limit(fnArray, k)`
function limit(fnArray, k) {
  const results = new Array(fnArray.length);
  let nextIndex = 0;
  let activeCount = 0;

  return new Promise((resolve, reject) => {
    function runNext() {
      if (nextIndex >= fnArray.length && activeCount === 0) {
        resolve(results);
        return;
      }

      while (activeCount < k && nextIndex < fnArray.length) {
        const currentIndex = nextIndex++;
        activeCount++;

        fnArray[currentIndex]()
          .then((res) => {
            results[currentIndex] = res;
          })
          .catch(reject)
          .finally(() => {
            activeCount--;
            runNext();
          });
      }
    }

    runNext();
  });
}
