const MAX_NUMBER = ROWS_COUNT = COLUMNS_COUNT = 9;
const GROUP_LENGTH = 3;

module.exports = function solveSudoku(matrix) {
  let solvedMatrix = matrix;
  let emptyCells = [];

  // save empty cells coordinates
  for (let row = 0; row < ROWS_COUNT; row++) {
    for (column = 0; column < COLUMNS_COUNT; column++) {
      if (matrix[row][column] === 0) {
        emptyCells.push({row, column});
      }
    }
  }

  let emptyCell = 0;
  const emptyCellsCount = emptyCells.length;
  while (emptyCell < emptyCellsCount) {
    const {row, column} = emptyCells[emptyCell];
    let matrixNumber = solvedMatrix[row][column];
    let isCorrectNumber = false;
    if (matrixNumber < MAX_NUMBER) {
      do {
        matrixNumber++;
        solvedMatrix[row][column]++;
        isCorrectNumber = checkNumberIsCorrect(row, column, matrixNumber, solvedMatrix);
      } while (!isCorrectNumber && (matrixNumber < MAX_NUMBER))
    }

    if (isCorrectNumber) {
      emptyCell++;
    } else {
      solvedMatrix[row][column] = 0;
      emptyCell--;
    }
  }
  return solvedMatrix;
}

function checkNumberIsCorrect(row, column, number, matrix) {
  let isCorrect = true;

  // check in row
  for (let i = 0; i < COLUMNS_COUNT; i++) {
    if (i === column) continue;
    const rowNumber = matrix[row][i];
    if (rowNumber === number) {
      return isCorrect = false;
    }
  }

  //check in column 
  for (let i = 0; i < ROWS_COUNT; i++) {
    if (i === row) continue;
    const columnNumber = matrix[i][column];
    if (columnNumber === number) {
      return isCorrect = false;
    }
  }

  //check in subgroup
  const rowCell = row - (row % GROUP_LENGTH);
  const columnCell = column - (column % GROUP_LENGTH);

  for (let i = rowCell; i < rowCell + GROUP_LENGTH; i++) {
    for (let j = columnCell; j < columnCell + GROUP_LENGTH; j++) {
      if (i == row && j == column) continue;
      if (matrix[i][j] == number) {
        return isCorrect = false;
      }
    }
  }
  return isCorrect;
}