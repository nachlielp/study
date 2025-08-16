var promiseAll = function (functions) {
  return new Promise((resolve, reject) => {
    if (!functions || typeof functions[Symbol.iterator] !== "function") {
      return reject(new TypeError("Argument is not iterable"));
    }

    const results = [];
    let remaining = 0;
    let index = 0;

    for (const f of functions) {
      const currIdx = index;
      remaining++;
      index++;

      //The promise.resolve().then(()=>f()) - creates a new promise
      // and immediately schedules the execution of f() (which itself
      // returns a promise) to happen in the microtask queue.
      //meaning they are not procced untill the the call stack is cleared
      //and starts accepting tasks from the micorqueue
      Promise.resolve()
        .then(() => f())
        .then((v) => {
          results[currIdx] = v;
          remaining--;
          if (remaining === 0) resolve(results);
        })
        .catch(reject);
    }

    if (index === 0) resolve([]);
  });
};

const promise = promiseAll([
  () => new Promise((res) => res(42)),
  () => new Promise((res) => res(42)),
]);
promise.then(console.log);
