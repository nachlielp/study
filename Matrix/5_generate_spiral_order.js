const EMPTY = "X";

function generateMatrix(n) {
  const matrix = Array.from({ length: n }, () => Array(n).fill(EMPTY));

  let i = 0,
    j = 0;
  const res = [matrix[i][j]];

  let dir = 1;

  let counter = 1;
  matrix[i][j] = counter;

  if (n === 1) return matrix;

  while (dir !== -1) {
    counter++;
    switch (dir) {
      case 1:
        j++;
        matrix[i][j] = counter;
        break;
      case 2:
        i++;
        matrix[i][j] = counter;
        break;
      case 3:
        j--;
        matrix[i][j] = counter;
        break;
      case 4:
        i--;
        matrix[i][j] = counter;
        break;
    }

    dir = nextDir(matrix, dir, i, j, n - 1);
  }

  return matrix;
}

function nextDir(matrix, dir, i, j, n) {
  switch (dir) {
    case 1:
      if (j < n && matrix[i][j + 1] === EMPTY) return 1;
      if (i < n && matrix[i + 1][j] === EMPTY) return 2;
      break;
    case 2:
      if (i < n && matrix[i + 1][j] === EMPTY) return 2;
      if (j > 0 && matrix[i][j - 1] === EMPTY) return 3;
      break;
    case 3:
      if (j > 0 && matrix[i][j - 1] === EMPTY) return 3;
      if (i > 0 && matrix[i - 1][j] === EMPTY) return 4;
      break;
    case 4:
      if (i > 0 && matrix[i - 1][j] === EMPTY) return 4;
      if (j < n && matrix[i][j + 1] === EMPTY) return 1;
      break;
  }
  return -1;
}

const res = generateMatrix(5);

console.table(res);
