const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const empty = ".";

const ROW = 9;
const SECTION = 3;

function isValidSudoku(board) {
  return (
    isValidRows(board) &&
    isValidRows(columnsToRows(board)) &&
    isValidRows(getSectionsAsRows(board))
  );
}

function columnsToRows(matrix) {
  const newMatrix = Array.from({ length: ROW }, () => new Array(ROW));
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < ROW; j++) {
      newMatrix[i][j] = matrix[j][i];
    }
  }
  return newMatrix;
}

function isValidRows(matrix) {
  return matrix.every(isValidRow);
 }

function isValidRow(items) {
  items = items.filter((c) => c !== empty);
  const fq = {};
  for (const item of items) {
    fq[item] = fq[item] ? ++fq[item] : 1;
  }
  const isNotValidItems = Object.keys(fq).find((val) => !numbers.includes(val));
  const isNotRepeating = Object.values(fq).find((val) => val !== 1);

  return isNotRepeating || isNotValidItems ? false : true;
}

function getSectionsAsRows(matrix) {
  const newMatrix = [];

  for (let i = 0; i < SECTION; i++) {
    for (let j = 0; j < SECTION; j++) {
      const ix = i * SECTION;
      const jx = j * SECTION;

      const row = [];
      for (let k = 0; k < SECTION; k++) {
        for (let q = 0; q < SECTION; q++) {
          row.push(matrix[k + ix][q + jx]);
        }
      }
      newMatrix.push(row);
    }
  }
  return newMatrix;
}

const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

console.log(isValidSudoku(board));
