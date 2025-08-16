Array.prototype.groupBy = function (fn) {
  const result = {};
  for (const el of this) {
    const key = fn(el);
    (result[key] ??= []).push(el);
  }
  return result;
};
