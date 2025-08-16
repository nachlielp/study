class EventEmitter {
  constructor() {
    this.subscriptions = new Map();
    this.id = 0;
  }
  subscribe(eventName, callback) {
    const currId = this.id++;

    if (!this.subscriptions.has(eventName)) {
      this.subscriptions.set(eventName, new Map());
    }

    this.subscriptions.get(eventName).set(currId, callback);

    return {
      unsubscribe: () => {
        const callbacks = this.subscriptions.get(eventName);
        if (callbacks) {
          callbacks.delete(currId);
        }
      },
    };
  }

  emit(eventName, args = []) {
    const callbacks = this.subscriptions.get(eventName);
    if (!callbacks || callbacks.size === 0) return [];

    const results = [];
    for (const callback of callbacks.values()) {
      results.push(callback(...args));
    }
    return results;
  }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */
const emitter = new EventEmitter();
emitter.subscribe("firstEvent", function cb1(x) {
  return x + 1;
});
emitter.subscribe("firstEvent", function cb2(x) {
  return x + 2;
});
console.log(emitter.emit("firstEvent", [5])); // [5, 6], returns the output of cb1 and cb2
