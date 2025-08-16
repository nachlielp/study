Promises are objects that represent the eventual completion (or failure) of an asynchronous operation and its resulting value - i.e. a Web API placeholder for a value that will be available in the future.

```js
const futureData = fetch("https://twitter.com/will/tweets/1");

futureData
  .then((response) => response.json())
  .then((json) => console.log(json));
```

calling fetch() creates a promise that will be stored in the global memory under the name futureData.
At the same time, a network request is created to handle the fetch operation.
When assigning the promise to the futureData variable, the promise hase a few properties:

- state: pending, fulfilled, rejected
- value: the value of the promise
- on fulfillment: a method to handle the promise fulfillment
- on rejection: a method to handle the promise rejection

When the promise is fulfilled, the fulfillment method is passed to the microtask queue.
When the call stack is empty, the fulfillment method is executed.

The are two queues in the event loop:

- microtask queue
- callback queue

the microtask queue is processed before the callback queue.

- Microtasks

  - Promise callbacks
  - process.nextTick()
  - queueMicrotask()

- Macrotasks
  - setTimeout()
  - setInterval()
  - setImmediate()
  - requestAnimationFrame()
