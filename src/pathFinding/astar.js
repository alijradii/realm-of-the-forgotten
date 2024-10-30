function heuristic(r1, c1, r2, c2) {
  return distance(r1, c1, r2, c2);
}

function getKeyFromCoordinates(r, c) {
  return `${r},${c}`;
}

function getCoordinatesFromKey(key) {
  console.log(key);
  const [r, c] = key.split(",").map(Number);

  return r, c;
}

function reconstructPath(cameFrom, r, c) {
  const path = [[r, c]];

  while (cameFrom.get(getKeyFromCoordinates(r, c))) {
    [r, c] = cameFrom.get(getKeyFromCoordinates(r, c));

    path.push([r, c]);
    console.log(`${r} ${c}`);
  }

  path.reverse();
  return path;
}

function astar(maze, startX, startY, endX, endY) {
  const rows = maze.length;
  const cols = maze[0].length;

  const startColumn = Math.floor(startX / 16);
  const startRow = Math.floor(startY / 16);
  const endColumn = Math.floor(endX / 16);
  const endRow = Math.floor(endY / 16);

  const queue = new PriorityQueue((a, b) => a[0] - b[0]);
  const openSet = new Set();
  const score = new Map();
  const cameFrom = new Map();

  queue.add([0, startRow, startColumn]);
  score.set(getKeyFromCoordinates(startRow, startColumn), 0);

  while (!queue.isEmpty()) {
    const [_, r, c] = queue.remove();
    const key = getKeyFromCoordinates(r, c);
    openSet.delete(key);

    if (r == endRow && c == endColumn) {
      return reconstructPath(cameFrom, r, c);
    }

    directions.forEach((direction) => {
      const nr = r + direction[0];
      const nc = c + direction[1];

      const newKey = getKeyFromCoordinates(nr, nc);

      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return;

      if (maze[nr][nc]) return;

      const tenativeScore = score.get(key) + 1;

      if (!score.has(newKey)) {
        score.set(newKey, 1e9);
      }

      if (tenativeScore < score.get(newKey)) {
        cameFrom.set(newKey, [r, c]);
        score.set(newKey, tenativeScore);

        if (!openSet.has(newKey)) {
          const f_score = tenativeScore + heuristic(nr, nc, endRow, endColumn);
          queue.add([f_score, nr, nc]);
          openSet.add(newKey);
        }
      }
    });
  }

  return null;
}
