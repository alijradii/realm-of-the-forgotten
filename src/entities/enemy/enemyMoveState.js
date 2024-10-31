class EnemyMoveState {
  constructor(scene, entity, x, y) {
    this.scene = scene;
    this.animation = "walk";
    this.entity = entity;
    this.target = { x: x, y: y };

    const path = astar(
      this.scene.maze,
      this.entity.sprite.x,
      this.entity.sprite.y,
      x,
      y
    );

    if (!path) {
      this.entity.idle();
      return;
    } else {
      this.entity.path = path;
      this.entity.pathIndex = 0;
    }
  }

  update() {
    if (this.entity.scanForPlayer()) return;
    if (this.entity.isDead) return;

    if (!this.entity.path) {
      this.entity.idle();
    }

    if (this.entity.moveAlongPath()) {
      this.entity.idle();
    }
  }
}
