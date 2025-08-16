# Day 2 — Async, event loop, DOM, browser APIs

## Session 1 (Event loop, microtasks vs macrotasks, Promises)

### Event loop

- Call stack:

  - Synchronous execution context
  - Single thread
  - First in, last out

- LIBUV API:

  - libuv is a cross-platform library that provides an event loop and asynchronous I/O.
  - It is used by Node.js to handle asynchronous I/O operations.
  - It is multi-threaded.

- Event loop queue:

  - Asynchronous execution context
  - First in, first out - back into the call stack

- Event loop:
  - Tasks/macrotasks: setTimeout/setInterval, UI events, network events, message events.
  - Microtasks: Promise.then/catch/finally, queueMicrotask, MutationObserver.
- Ordering:
  - JS runs a task to completion, then flushes the entire microtask queue, then possibly renders, then picks the next task.
  - Microtasks always run before the next macrotask.
  - A .then handler always runs asynchronously as a microtask, even if the promise is already fulfilled.
  - async/await: code before the first await runs synchronously; after await resumes in a microtask.
- Promise states: pending → fulfilled | rejected; once settled, it’s immutable.
- Error flow: throw inside async function or in a .then handler → rejected promise; catch with .catch or try/catch around awai

## Session 2 (Fetch, HTTP, CORS, AbortController)

### Fetch

- Always resolves to Response for HTTP requests, rejects only for network errors, CORS errors, and abort.
- Response:
  - status: 200, 404, 500, etc.
  - statusText: "OK", "Not Found", "Internal Server Error", etc.
  - headers: Headers object
  - body: ReadableStream
- Request:
  - method: "GET", "POST", "PUT", "DELETE", etc.
  - url: URL object

### AbortController

- Create one per request (or per attempt); pass controller.signal to fetch; call controller.abort() to cancel.

### Timeout

- fetch has no built-in timeout; implement by aborting via a timer.

### CORS

- CORS is a security feature that prevents websites from making requests to other websites.
- It is a security feature that prevents websites from making requests to other websites.
- It is a security feature that prevents websites from making requests to other websites.
