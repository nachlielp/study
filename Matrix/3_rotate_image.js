function rotate(matrix) {
  for (let i = 0; i < Math.floor(matrix.length / 2); i++) {
    for (let j = i; j < matrix.length - i - 1; j++) {
      const temp = matrix[i][j];
      const n = matrix.length - 1;

      matrix[i][j] = matrix[n - j][i];
      matrix[n - j][i] = matrix[n - i][n - j];
      matrix[n - i][n - j] = matrix[j][n - i];
      matrix[j][n - i] = temp;
    }
  }
  return matrix;
}

const matrix = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
];

console.table(matrix);
console.table(rotate(matrix));
