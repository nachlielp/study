const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const EMPTY = ".";

const ROW = 9;
const SECTION = 3;

function solveSudoku(board) {
  let flag = false;

  while (!isSolved(board) && !flag) {
    flag = true;
    for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < ROW; j++) {
        if (board[i][j] !== EMPTY) continue;
        const res = solveCell(board, i, j);
        if (res) {
          flag = false;
          board[i][j] = res;
        }
      }
    }
  }

  console.log("Post run: \n");
  console.table(board);
  return board;
}

function isSolved(board) {
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < ROW; j++) {
      if (board[i][j] === EMPTY) return false;
    }
  }
  return true;
}

function solveCell(board, i, j) {
  const row = getRowValues(board, i);
  const col = getColValues(board, j);
  const sec = getSectionValues(board, i, j);
  const options = NUMBERS.filter((n) => {
    return !row.includes(n) && !col.includes(n) && !sec.includes(n);
  });

  if (options.length === 1) {
    return options[0];
  }
  return null;
}

function getRowValues(board, row) {
  return board[row].filter((v) => v !== EMPTY);
}

function getColValues(board, col) {
  return filpMatrix(board)[col].filter((v) => v !== EMPTY);
}

function getSectionValues(board, i, j) {
  const section = Math.floor(j / 3) * SECTION + Math.floor(i / 3);
  return getSectionsAsRows(board)[section].filter((v) => v !== EMPTY);
}

function filpMatrix(matrix) {
  const newMatrix = Array.from({ length: ROW }, () => new Array(ROW));
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < ROW; j++) {
      newMatrix[i][j] = matrix[j][i];
    }
  }
  return newMatrix;
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
          row.push(matrix[k + jx][q + ix]);
        }
      }
      newMatrix.push(row);
    }
  }
  return newMatrix;
}

const board = [
  [".", ".", "9", "7", "4", "8", ".", ".", "."],
  ["7", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", "2", ".", "1", ".", "9", ".", ".", "."],
  [".", ".", "7", ".", ".", ".", "2", "4", "."],
  [".", "6", "4", ".", "1", ".", "5", "9", "."],
  [".", "9", "8", ".", ".", ".", "3", ".", "."],
  [".", ".", ".", "8", ".", "3", ".", "2", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "6"],
  [".", ".", ".", "2", "7", "5", "9", ".", "."],
];

console.table(board);
const res = solveSudoku(board);
console.table(res);
