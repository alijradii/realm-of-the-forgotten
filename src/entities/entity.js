class Entity {
  constructor(scene, x, y, sprite) {
    this.scene = scene;
    this.sprite = sprite;
    this.health = 100;
    this.speed = 100;
    this.state = "idle";

    this.isAttacking = false;
    this.isLocked = false;
    this.isDead = false;
    this.isInvincible = false;
    this.damage = 5
  }

  getKnockback(attacker) {
    if (this.isDead) return;
    const target = self.sprite;

    const angle = Phaser.Math.Angle.Between(
      attacker.x,
      attacker.y,
      this.sprite.x,
      this.sprite.y
    );

    const knockbackX = Math.cos(angle) * 100;
    const knockbackY = Math.sin(angle) * 100;

    this.scene.time.delayedCall(100, () => {
      this.updateDirection(attacker.x, attacker.y);
      if (this.direction == "left") {
        this.sprite.setFlipX(true);
      } else this.sprite.setFlipX(false);

      this.sprite.setTint(0xff0000);
      this.sprite.body.setVelocity(knockbackX, knockbackY);

      this.scene.time.delayedCall(300, () => {
        this.sprite.body.setVelocity(0, 0);
        this.sprite.clearTint();
        this.isLocked = false;
      });
    });
  }

  updateDirection(x, y) {
    let directionX = x - this.sprite.x;
    let directionY = y - this.sprite.y;
    let direction = "left";

    if (Math.abs(directionX) > Math.abs(directionY)) directionY = 0;
    else directionX = 0;

    if (directionX < 0) direction = "left";
    else if (directionX > 0) direction = "right";
    else if (directionY > 0) direction = "down";
    else if (directionY < 0) direction = "up";

    this.direction = direction;
  }

  onTakeDamage() {}
}
