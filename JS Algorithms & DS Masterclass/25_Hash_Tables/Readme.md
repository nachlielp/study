## Hash Table

- What is a Hash Table
- Define a hashing algorithm
- What makes a good hashing algorithm
- How collisions occur in hash tables
- How to handel collisions with
  - Linear Probing
  - Separate Chaining

* Hash tables are a key-value data store, in JS we call them objects and Map's.
  A Hash algorithm is a function that takes an input (key) and returns a hash code.
* A hash code is a number that represents the key, and it's used to index the hash table. The same key will always produce the same hash code, therefore, if two keys produce the same hash code, they are said to have collided. This is useful because it allows us to convert a key into an index, and then use that index to access the corresponding value in the hash table.
* Hash algorithm needs to be fast, distribute uniformly, deterministic, and be able to handle collisions.

* Separate chaining is a method of handling collisions where each key has its own linked list of values.
* Linear probing is a method of handling collisions where we try to find the next empty slot in the hash table.
