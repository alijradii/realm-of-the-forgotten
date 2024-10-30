function generateMaze(rows, cols, pathWidth) {
  const stack = [[1, 1]];
  const maze = createGrid(rows, cols, 1);
  const visited = createGrid(rows, cols, 0);

  while (stack.length != 0) {
    const [r, c] = stack.pop();

    const availableDirs = [];

    directions.forEach((dir) => {
      const nr = r + dir[0] * (pathWidth + 1);
      const nc = c + dir[1] * (pathWidth + 1);

      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        visited[nr][nc] === 0
      ) {
        availableDirs.push(dir);
      }
    });

    const size = availableDirs.length;
    if (size === 0) continue;

    const index = Math.floor(Math.random() * size);
    const [dr, dc] = availableDirs[index];
    const nr = r + dr * (1 + pathWidth);
    const nc = c + dc * (1 + pathWidth);

    for (let i = 0; i < pathWidth; i++) {
      let wr, wc;

      if (dr > 0 || dc > 0) {
        wr = dr == 0 ? r + i : pathWidth * dr + r;
        wc = dc == 0 ? c + i : pathWidth * dc + c;
      } else {
        wr = dr == 0 ? r + i : dr + r;
        wc = dc == 0 ? c + i : dc + c;
      }

      if (wr >= 0 && wr < rows && wc >= 0 && wc < cols) maze[wr][wc] = 0;
    }

    visited[nr][nc] = 1;

    stack.push([r, c]);
    stack.push([nr, nc]);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r % (pathWidth + 1) != 0 && c % (pathWidth + 1) != 0) {
        maze[r][c] = 0;
      }
    }
  }

  return maze;
}
