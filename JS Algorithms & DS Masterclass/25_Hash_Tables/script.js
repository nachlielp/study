//NOTICE - I did this in functions, the demo is with a class
//Non constant time hash function, Non random
function hash1(key, arrayLength) {
  let hash = 0;
  for (const char of key) {
    hash += char.charCodeAt(0);
  }
  return hash % arrayLength;
}
// console.log(hash1("hello", 10));

//Constant time hash function, random
//By working with prime numbers we reduce the chance of collisions
function hash2(key, arrayLength) {
  let hash = 0;
  const SOME_PRIME = 31;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let value = key[i].charCodeAt(0);
    hash = (hash * SOME_PRIME + value) % arrayLength;
  }
  return hash;
}
const PRIME_ARR_LEN = 13;
// console.log(hash2("hello", PRIME_ARR_LEN));

//Handel collisions with Linear probing
function hash3(key, arr) {
  let total = 0;
  const SOME_PRIME = 31;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let value = key[i].charCodeAt(0);
    total = (total * SOME_PRIME + value) % arr.length;
  }
  while (arr[total]) {
    total++;
  }
  arr[total] = key;
}

//Separate chaining
function hash4(key) {
  let total = 0;
  const SOME_PRIME = 31;
  const SOME_OTHER_PRIME = 5;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let value = key[i].charCodeAt(0);
    total = (total * SOME_PRIME + value) % SOME_OTHER_PRIME;
  }
  return total;
}
function hash4set(key, value, arr) {
  const total = hash4(key);
  if (!arr[total]) {
    arr[total] = [];
  }
  arr[total].push({ key: key, value: value });
}
function hash4get(key, arr) {
  const total = hash4(key);
  if (!arr[total]) {
    return null;
  }
  for (const t of arr[total]) {
    if (t.key === key) {
      return t.value;
    }
  }
  return null;
}
function hash4keys(arr) {
  let keys = [];
  //handel duplicates
  for (let t of arr) {
    if (t) {
      for (let st of t) {
        if (!keys.includes(st.key)) keys.push(st.key);
      }
    }
  }
  return keys;
}
function hash4values(arr) {
  let values = [];
  //handel duplicates
  for (let t of arr) {
    if (t) {
      for (let st of t) {
        if (!values.includes(st.value)) values.push(st.value);
      }
    }
  }
  return values;
}
let arr = [];
hash4set("mey", "bey", arr);
hash4set("jey", "fey", arr);
hash4set("hey", "gey", arr);
hash4set("xey", "zey", arr);
hash4set("key", "eey", arr);
hash4set("sey", "eey", arr);
hash4set("wey", "pey", arr);
// console.log(arr);
// console.log(hash4get("wey", arr));
console.log(hash4keys(arr));
