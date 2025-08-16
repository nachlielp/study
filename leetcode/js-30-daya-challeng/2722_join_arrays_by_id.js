/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */

//input: two arrays of elements, all with an id key
//merge into single
//overlapping keys - arr2 overifes arr1
const sortBy = (arr, fn) => [...arr].sort((a, b) => fn(a) - fn(b));

const join = (arr1, arr2) => {
  const sorted1 = sortBy(arr1, (el) => el.id);
  const sorted2 = sortBy(arr2, (el) => el.id);
  const result = [];

  let i = 0,
    j = 0;

  while (i < sorted1.length && j < sorted2.length) {
    const id1 = sorted1[i].id;
    const id2 = sorted2[j].id;

    if (id1 === id2) {
      result.push({ ...sorted1[i], ...sorted2[j] });
      i++;
      j++;
    } else if (id1 < id2) {
      result.push({ ...sorted1[i] });
      i++;
    } else {
      result.push({ ...sorted2[j] });
      j++;
    }
  }

  // Add remaining elements
  result.push(...sorted1.slice(i).map((obj) => ({ ...obj })));
  result.push(...sorted2.slice(j).map((obj) => ({ ...obj })));

  return result;
};

// const join = (arr1, arr2) => {
//     const map = new Map();

//     // Add all items from both arrays to map
//     [...arr1, ...arr2].forEach(item => {
//       const existing = map.get(item.id);
//       map.set(item.id, existing ? { ...existing, ...item } : { ...item });
//     });

//     // Return sorted by id
//     return Array.from(map.values()).sort((a, b) => a.id - b.id);
//   };
console.log(
  join(
    [
      { id: 1, x: 2, y: 3 },
      { id: 2, x: 3, y: 6 },
    ],
    [
      { id: 2, x: 10, y: 20 },
      { id: 3, x: 0, y: 0 },
    ]
  )
);
