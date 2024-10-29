class MazeScene extends Phaser.Scene {
  constructor(key) {
    super({ key: "maze" });

    this.player;
    this.rows;
    this.cols;
    this.pathWidth;
  }

  preload() {
    this.load.spritesheet("player", "./assets/images/Archer/Archer_Blue.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  create() {
    this.player = this.add.sprite(200, 200, "player", 1);

    this.rows = 200;
    this.cols = 200;
    this.pathWidth = 5;
  }
  update(time, delta) {}
}
