class MazeScene extends Phaser.Scene {
  constructor(key) {
    super({ key: "maze" });

    this.player;
    this.rows;
    this.cols;
    this.pathWidth;
    this.camera;
  }

  preload() {
    this.load.spritesheet("player", "./assets/images/Archer/Archer_Blue.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.image("tiles", "assets/images/tileset-extruded.png");
  }

  create() {
    this.rows = 200;
    this.cols = 200;
    this.pathWidth = 5;

    const maze = generateMaze(this.rows, this.cols, this.pathWidth);
    const tiles = replaceWalls(maze);

    const tilemap = this.make.tilemap({
      data: tiles,
      tileWidth: 16,
      tileHeight: 16,
    });

    tilemap.addTilesetImage("tiles", "tiles", 16, 16, 1, 2);
    const layer = tilemap.createLayer(0, "tiles", 0, 0);

    this.player = this.add.sprite(32, 32, "player", 1);
    this.camera = this.cameras.main;
  }

  update(time, delta) {}
}
