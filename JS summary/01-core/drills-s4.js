// const user = {};
// if (user.name) {
//   console.log(true);
// } else {
//   console.log(false);
// }

// ## Custome error
// class ValidationError extends Error {
//   constructor(message, field) {
//     super(message);
//     this.name = "ValidationError";
//     this.field = field;
//   }
// }

// function validateUser(user) {
//   if (!user.name) {
//     throw new ValidationError("Name is required", "name");
//   }
// }

// try {
//   validateUser({});
// } catch (err) {
//   if (err instanceof ValidationError) {
//     console.error(`Validation failed on ${err.field}: ${err.message}`);
//   } else {
//     throw err; // rethrow unknown errors
//   }
// }

// ## Error propergration
// ### Sync
// function c() {
//   throw new Error("Boom!");
// }

// function b() {
//   c(); // no try/catch here
// }

// function a() {
//   b(); // no try/catch here
// }

// try {
//   a();
// } catch (err) {
//   console.log("Caught:", err.message);
// }

// ### async

// Promise.resolve()
//   .then(() => {
//     throw new Error("Async boom!");
//   })
//   .catch((err) => {
//     console.log("Caught:", err.message);
//   });

// Promise.reject(new Error("Oops"));

//## deepClone
// function deepClone(obj) {
//   if (obj === null || typeof obj !== "object") return obj;
//   if (Array.isArray(obj)) return obj.map(deepClone);
//   return Object.fromEntries(
//     Object.entries(obj).map(([k, v]) => [k, deepClone(v)])
//   );
// }
// ## deepMergh(objA,objB)

// const objA = { a: 1, b: { x: 1, y: 2 }, c: 3 };
// const objB = { b: { y: 20, z: 30 }, d: 4 };

// console.log(deepMerge(objA, objB));

// function deepMerge(objA, objB) {
//   for (const k of Object.keys(objB)) {
//     if (objA[k] && typeof objA[k] === "object" && typeof objB[k] === "object")
//       deepMerge(objA[k], objB[k]);
//     else objA[k] = objB[k];
//   }
//   return objA;
// }
