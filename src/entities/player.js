class Player extends Fighter {
  constructor(scene, x, y, color, baseClass, cursors) {
    super(scene, x, y, color, baseClass);
    this.cursors = cursors;

    this.scene.input.on("pointerdown", this.onPointerDown, this);
    this.scene.input.on("pointerup", this.onPointerUp, this);
  }

  update() {
    const speed = 100;
    let direction = this.direction;

    if (this.state === "idle" || this.state === "walk") {
      this.state = "idle";
      this.body.setVelocity(0);

      if (this.scene.cursors.left.isDown) {
        this.body.setVelocityX(-speed);
        direction = "left";
        this.state = "walk";
        console.log("down");
      } else if (this.scene.cursors.right.isDown) {
        this.body.setVelocityX(speed);
        direction = "right";
        this.state = "walk";
      }
      if (this.scene.cursors.up.isDown) {
        this.body.setVelocityY(-speed);
        direction = "up";
        this.state = "walk";
      } else if (this.scene.cursors.down.isDown) {
        this.body.setVelocityY(speed);
        direction = "down";
        this.state = "walk";
      }

      this.direction = direction;
    }

    this.body.velocity.normalize().scale(speed);
    this.play(`${this.state}_${this.direction}`, true);
  }

  onPointerDown(pointer) {
    switch (pointer.button) {
      case 0:
        console.log("left click");
        this.state = "attack";
        this.body.setVelocity(0);
        this.play(`${this.state}_${this.direction}`, true);
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
}
