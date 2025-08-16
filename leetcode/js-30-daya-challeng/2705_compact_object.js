var compactObject = function (obj) {
  const isArray = Array.isArray(obj);
  let newObj = isArray ? [] : {};

  for (let k in obj) {
    if (!obj[k]) continue;
    if (typeof obj[k] === "object") {
      if (isArray) newObj.push(compactObject(obj[k]));
      else newObj[k] = compactObject(obj[k]);
    } else {
      if (isArray) newObj.push(obj[k]);
      else newObj[k] = obj[k];
    }
  }
  return newObj;
};
console.log(compactObject({ a: null, b: [false, 1] }));
