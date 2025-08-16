// Write a class that allows getting and setting key-value pairs, however a time until expiration is associated with each key.

// The class has three public methods:

// set(key, value, duration): accepts an integer key, an integer value, and a duration in milliseconds. Once the duration has elapsed, the key should be inaccessible. The method should return true if the same un-expired key already exists and false otherwise. Both the value and duration should be overwritten if the key already exists.

// get(key): if an un-expired key exists, it should return the associated value. Otherwise it should return -1.

// count(): returns the count of un-expired keys.

class CacheLimiter {
  constructor() {
    this.store = new Map();
  }

  set(key, value, duration) {
    const now = Date.now();
    const existed = this.store.has(key) && this.store.get(key).expiresAt > now;
    this.store.set(key, { value, expiresAt: now + duration });
    return existed;
  }

  get(key) {
    const now = Date.now();
    const item = this.store.get(key);
    if (now < item.expiresAt) return item.value;
    return -1;
  }

  count() {
    const now = Date.now();
    return Array.from(this.store.values()).filter(
      (item) => item.expiresAt > now
    ).length;
  }
}

const cache = new CacheLimiter();

cache.set("k", "v", 150);
setTimeout(() => {
  console.log(cache.get("k"));
  console.log(cache.count());
}, 100);
