function replaceWalls(maze) {
  const rows = maze.length;
  const cols = maze[0].length;
  const normal = [13, 14, 33, 34];
  const down = [12, 32, 52, 72];

  const grid = createGrid(rows, cols, 0);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (maze[r][c] == 0) {
        // handle tile
      } else {
        if (r < rows - 1 && maze[r + 1][c] == 1) {
          grid[r][c] = chooseRandomElement(down);
        } else {
          grid[r][c] = chooseRandomElement(normal);
        }
      }
    }
  }

  return grid;
}
