class Player extends Fighter {
  constructor(scene, x, y, color, baseClass, cursors) {
    super(scene, x, y, color, baseClass);
    this.cursors = cursors;

    this.scene.physics.add.existing(this.sprite);

    this.scene.input.on("pointerdown", this.onPointerDown, this);
    this.scene.input.on("pointerup", this.onPointerUp, this);

    this.speed = 200;
    this.damage = 5;
    this.hp = 5;
    this.isDead = false
  }

  update() {
    if (this.isLocked || this.isDead) return;

    let direction = this.direction;

    if (this.state === "idle" || this.state === "walk") {
      this.state = "idle";

      this.body.setVelocity(0);

      if (this.scene.cursors.left.isDown) {
        this.body.setVelocityX(-this.speed);
        direction = "left";
        this.state = "walk";
      } else if (this.scene.cursors.right.isDown) {
        this.body.setVelocityX(this.speed);
        direction = "right";
        this.state = "walk";
      }
      if (this.scene.cursors.up.isDown) {
        this.body.setVelocityY(-this.speed);
        direction = "up";
        this.state = "walk";
      } else if (this.scene.cursors.down.isDown) {
        this.body.setVelocityY(this.speed);
        direction = "down";
        this.state = "walk";
      }

      this.direction = direction;
    }

    this.body.velocity.normalize().scale(this.speed);
    this.play(`${this.state}_${this.direction}`, true);
  }

  onPointerDown(pointer) {
    switch (pointer.button) {
      case 0:
        console.log("left click");
        this.attack();
        break;
      case 1:
        console.log("middle click");
        break;
      case 2:
        console.log("right click");
        break;
    }
  }

  onPointerUp(pointer) {
    console.log(`mouse ${pointer.button} released`);
  }

  onTakeDamage() {
    this.scene.cameras.main.shake(100, 0.005);
  }

  idle() {
    if(this.isLocked)
      return;

    this.state = "idle";
  }

  attack() {
    if(this.isDead)
      return;

    if (this.state == "attack") return;

    this.state = "attack";

    this.body.setVelocity(0);
    this.play(`attack_${this.direction}`, true);

    this.sprite.on("animationcomplete", () => {
      this.idle();
    });

    if (this.baseClass != "Archer") {
      const targets = this.scene.enemies;

      this.scene.physics.overlap(this, targets, (attacker, target) => {
        if (target.isDead) return;

        target.onTakeDamage(this);
        target.getKnockback(this.sprite);
      });
    } else {
      const arrow = this.scene.arrows.get();
      if (arrow) {
        arrow.fire(this.sprite.x, this.sprite.y, this, 1);
      }
    }
  }

  onTakeDamage() {
    if (this.isInvincible) {
      return;
    }

    this.hp -= 1
    if (this.hp <= 0) this.die();

    this.isInvincible = true;

    this.scene.time.delayedCall(200, () => {
      this.isInvincible = false;
    });
  }

  die() {
    if(this.isDead) return;

    this.isDead = true
    this.play(`death_${this.direction}`)
  }
}
