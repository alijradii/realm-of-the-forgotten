class EnemyFollowState {
  constructor(scene, entity) {
    this.scene = scene;
    this.animation = "walk";
    this.entity = entity;

    this.updateCounter = 30;
    this.updateInterval = 30;

    this.lerpSpeed = 0.05;
    this.maxScanDistance = 32;
  }

  update() {
    if (this.isAttacking) return;

    const dist = distance(
      this.scene.player.sprite.x,
      this.scene.player.sprite.y,
      this.entity.sprite.x,
      this.entity.sprite.y,
    );

    if (dist > this.maxScanDistance * 16) {
      this.entity.idle();
      return;
    }

    if (dist <= 16) {
      this.scene.time.delayedCall(200, () => {
        this.entity.attack(this.scene.player.body);
      });
      return;
    }

    if (dist < 40) {
      this.entity.sprite.x = Phaser.Math.Linear(
        this.entity.sprite.x,
        this.scene.player.sprite.x,
        0.2,
      );

      this.entity.sprite.y = Phaser.Math.Linear(
        this.entity.sprite.y,
        this.scene.player.sprite.y,
        0.2,
      );
      return;
    }

    this.updateCounter++;
    if (this.updateCounter >= this.updateInterval) {
      this.updateCounter = 0;
      this.recalculatePath();
    }

    this.entity.moveAlongPath();
  }

  recalculatePath() {
    this.entity.path = astar(
      this.scene.maze,
      this.entity.sprite.x,
      this.entity.sprite.y,
      this.scene.player.body.x,
      this.scene.player.body.y,
    );
    this.entity.pathIndex = 0;
  }
}
