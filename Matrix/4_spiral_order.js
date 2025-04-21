const EMPTY = "X";
function spiralOrder(matrix) {
  if (matrix.length === 0) return [];

  if (matrix.length === 1 || matrix[0].length === 1) {
    return matrix.flat(1);
  }

  const n = matrix.length - 1; //verticlly
  const m = matrix[0].length - 1; //horizontlly

  let i = 0,
    j = 0;
  const res = [matrix[i][j]];
  matrix[i][j] = EMPTY;
  let dir = 1;
  if (m === 1) dir = 2;
  while (dir !== -1) {
    switch (dir) {
      case 1:
        j++;
        res.push(matrix[i][j]);
        matrix[i][j] = EMPTY;
        break;
      case 2:
        i++;
        res.push(matrix[i][j]);
        matrix[i][j] = EMPTY;
        break;
      case 3:
        j--;
        res.push(matrix[i][j]);
        matrix[i][j] = EMPTY;
        break;
      case 4:
        i--;
        res.push(matrix[i][j]);
        matrix[i][j] = EMPTY;
        break;
    }

    dir = nextDir(matrix, dir, i, j, n, m);
  }
  return res;
}

function nextDir(matrix, dir, i, j, n, m) {
  switch (dir) {
    case 1:
      if (j < m && matrix[i][j + 1] !== EMPTY) return 1;
      if (i < n && matrix[i + 1][j] !== EMPTY) return 2;
      break;
    case 2:
      if (i < n && matrix[i + 1][j] !== EMPTY) return 2;
      if (j > 0 && matrix[i][j - 1] !== EMPTY) return 3;
      break;
    case 3:
      if (j > 0 && matrix[i][j - 1] !== EMPTY) return 3;
      if (i > 0 && matrix[i - 1][j] !== EMPTY) return 4;
      break;
    case 4:
      if (i > 0 && matrix[i - 1][j] !== EMPTY) return 4;
      if (j < m && matrix[i][j + 1] !== EMPTY) return 1;
      break;
  }
  return -1;
}

matrix = [[3, 2, 1]];
console.log(spiralOrder(matrix));
