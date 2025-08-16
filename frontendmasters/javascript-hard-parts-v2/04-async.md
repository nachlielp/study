Web API - asynchronous functions

- setTimeout
- fetch
- DOM events
- WebSockets
- console
- network
- storage
- etc

- Leaving the call stack

when we call setTimeout, we leave the call stack, and the web API takes over.
when the web API is done, it adds the callback to the callback queue.
the event loop then checks the call stack, when it's empty, it adds the first one in the callback queue to the call stack.
