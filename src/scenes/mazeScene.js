class MazeScene extends Phaser.Scene {
  constructor(key) {
    super({ key: "maze" });

    this.player;
  }

  preload() {
    this.load.spritesheet("player", "./assets/images/Archer/Archer_Blue.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  create() {
    this.player = this.add.sprite(200, 200, "player", 1);
  }
  update(time, delta) {}
}
