class EnemyIdleState {
  constructor(scene, entity) {
    this.scene = scene;
    this.animation = "idle";
    this.entity = entity;

    this.randomPointRange = 200;
    this.updateCounter = 0;
    this.updateInterval = 120;
  }

  update() {
    if (this.entity.scanForPlayer()) return;

    this.updateCounter++;
    if (this.updateCounter >= this.updateInterval) this.chooseRandomPoint();
  }

  chooseRandomPoint() {
    const maze = this.scene.maze;
    const rows = maze.length;
    const cols = maze[0].length;

    let r = Math.floor(this.entity.sprite.y / 16);
    let c = Math.floor(this.entity.sprite.x / 16);
    let range = this.randomPointRange;

    let stack = [[r, c]];

    const visited = new Set();
    visited.add(`${r},${c}`);

    while (range && stack.length > 0) {
      range--;
      [r, c] = stack.pop();

      const availableDirections = [];

      directions.forEach((direction) => {
        const nr = r + direction[0];
        const nc = c + direction[1];

        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return;

        if (maze[nr][nc] == 1) return;

        if (!visited.has(`${nr},${nc}`)) {
          availableDirections.push(direction);
        }
      });

      if (availableDirections.length > 0) {
        const direction = chooseRandomElement(availableDirections);
        r = r + direction[0];
        c = c + direction[1];

        visited.add(`${r},${c}`);
        stack.push([r, c]);
      }
    }

    this.entity.moveTo(c * 16, r * 16);
  }
}
