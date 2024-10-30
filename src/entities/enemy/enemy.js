class Enemy extends Fighter {
  constructor(scene, x, y, baseClass) {
    super(scene, x, y, "Red", baseClass);

    this.state = new EnemyIdleState(this.scene, this);
    this.path = [];
    this.pathIndex = 0;
    this.lerpSpeed = 0.2;
    this.sightRange = 8;
  }

  update() {
    if (this.isAttacking) return;
    this.state.update();
    this.updateAnimation();
  }

  moveAlongPath() {
    if (!this.path || this.pathIndex > this.path.length) {
      this.pathIndex = 0;
      this.path = [];
      this.idle();
      return;
    }

    const node = this.path[this.pathIndex];
    const target = { x: node[1] * 16 + 8, y: node[0] * 16 + 8 };

    if (
      Phaser.Math.Distance.Between(
        this.sprite.x,
        this.sprite.y,
        target.x,
        target.y,
      ) < 5
    ) {
      this.pathIndex++;
      if (this.pathIndex >= this.path.length) {
        this.path = [];
        return true;
      }
      return;
    }

    this.updateDirection(target.x, target.y);

    this.sprite.x = Phaser.Math.Linear(this.sprite.x, target.x, this.lerpSpeed);
    this.sprite.y = Phaser.Math.Linear(this.sprite.y, target.y, this.lerpSpeed);
  }

  updateAnimation() {
    if (!this.isAttacking)
      this.play(`${this.state.animation}_${this.direction}`, true);
  }

  scanForPlayer() {
    const dist = distance(
      this.sprite.x,
      this.sprite.y,
      this.scene.player.sprite.x,
      this.scene.player.sprite.y,
    );

    if (this.sightRange * 16 > dist) {
      console.log(dist);
      this.changeState(new EnemyFollowState(this.scene, this));
    }
  }
  changeState(newState) {
    this.state = newState;
  }

  idle() {
    this.path = [];
    this.pathIndex = 0;
    this.changeState(new EnemyIdleState(this.scene, this));
  }

  moveTo(x, y) {
    console.log(`current: ${this.sprite.x} ${this.sprite.y}, new: ${x} ${y}`);
    this.changeState(new EnemyMoveState(this.scene, this, x, y));
  }

  attack(targets) {
    if (this.isAttacking) return;
    this.isAttacking = true;

    this.play(`attack_${this.direction}`, true);

    this.sprite.on("animationcomplete", () => {
      this.idle();
      this.isAttacking = false;
    });

    const player = this.scene.player.sprite;
    this.updateDirection(player.x, player.y);

    this.scene.physics.overlap(this, targets, (attacker, target) => {
      this.scene.player.getKnockback(this.sprite);
    });
  }
}
