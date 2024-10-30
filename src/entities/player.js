class Player extends Fighter {
  constructor(scene, x, y, color, baseClass, cursors) {
    super(scene, x, y, color, baseClass);
    this.cursors = cursors;

    this.scene.physics.add.existing(this.sprite);

    this.scene.input.on("pointerdown", this.onPointerDown, this);
    this.scene.input.on("pointerup", this.onPointerUp, this);

    this.speed = 200;
  }

  update() {
    if (this.isLocked) return;

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
    this.state = "idle";
  }

  attack() {
    if (this.state == "attack") return;

    this.state = "attack";

    this.body.setVelocity(0);
    this.play(`attack_${this.direction}`, true);

    this.sprite.on("animationcomplete", () => {
      this.idle();
    });

    const targets = [this.scene.enemy];

    this.scene.physics.overlap(this, targets, (attacker, target) => {
      this.scene.enemy.getKnockback(this.sprite);
    });
  }
}
