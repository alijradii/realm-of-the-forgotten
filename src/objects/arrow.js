class Arrow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame = 0, thrower) {
        super(scene, x, y, "arrow", frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setActive(true);
        this.setVisible(true);
        this.speed = 300;
        this.thrower = thrower;
        this.direction = { x: 0, y: 0 };
        this.lifespan = 100;
    }

    fire(x, y, thrower, frame = 0) {
        this.thrower = thrower;
        this.setPosition(x, y);
        this.setFrame(frame);

        if (this.thrower.direction === "up") {
            this.setFrame(0);
            this.setFlipY(true);
            this.direction = { x: 0, y: -1 };
            this.body.setSize(4, 16);
        } else if (this.thrower.direction === "down") {
            this.setFrame(0);
            this.setFlipY(false);
            this.direction = { x: 0, y: 1 };
            this.body.setSize(4, 16);
        } else if (this.thrower.direction === "left") {
            this.setFrame(2);
            this.setFlipX(true);
            this.direction = { x: -1, y: 0 };
            this.body.setSize(16, 4);
        } else {
            this.setFrame(2);
            this.setFlipX(false);
            this.direction = { x: 1, y: 0 };
            this.body.setSize(16, 4);
        }

        this.setVelocity(
            this.direction.x * this.speed,
            this.direction.y * this.speed
        );
    }

    update() {
        this.lifespan--;
        if (this.lifespan <= 0) {
            this.destroy();
        }
    }
}
