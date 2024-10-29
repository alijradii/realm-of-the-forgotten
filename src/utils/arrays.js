function createGrid(rows, cols, value) {
  const grid = [];

  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push(value);
    }

    grid.push(row);
  }
  return grid;
}

function chooseRandomElement(array) {
  const n = array.length;

  return array[Math.floor(Math.random() * n)];
}
