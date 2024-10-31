class EnemyFollowState {
  constructor(scene, entity) {
    this.scene = scene;
    this.animation = "walk";
    this.entity = entity;

    this.updateCounter = 30;
    this.updateInterval = 30;

    this.lerpSpeed = 0.2;
    this.maxScanDistance = 32;
  }

  update() {
    if (this.entity.isAttacking || this.entity.isDead) return;

    const dist = distance(
      this.scene.player.sprite.x,
      this.scene.player.sprite.y,
      this.entity.sprite.x,
      this.entity.sprite.y
    );

    if (dist > this.maxScanDistance * 16) {
      this.entity.idle();
      return;
    }

    const aligned =
      Math.abs(this.entity.sprite.x - this.scene.player.sprite.x) <= 8 ||
      Math.abs(this.entity.sprite.y - this.scene.player.sprite.y) <= 8;

    if (this.entity.baseClass == "Archer" && aligned) {
      this.scene.time.delayedCall(200, () => {
        if (!this.entity.isLocked) this.entity.attack(this.scene.player.body);
      });
    }

    if (dist <= 16) {
      this.scene.time.delayedCall(300, () => {
        if (!this.entity.isLocked) this.entity.attack(this.scene.player.body);
      });
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
      this.scene.player.body.y
    );
    this.entity.pathIndex = 0;
  }
}
