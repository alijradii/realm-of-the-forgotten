class MazeScene extends Phaser.Scene {
  constructor(key) {
    super({ key: "maze" });

    this.player;
    this.rows;
    this.cols;
    this.pathWidth;
    this.camera;
    this.cursors;
    this.maze;
    this.tiles;

    this.rows = 100;
    this.cols = 100;
    this.start = [20, 20];
    this.end = [this.rows - 1, this.cols - 1];
    this.pathWidth = 1 + Math.floor(Math.random() * 5)
  }

  preload() {
    this.load.image("tiles", "assets/images/tileset-extruded.png");
    loadAssets(this);
  }

  create() {
    loadAnimations(this);

    const r = this.start[0] - (this.start[0] % (this.pathWidth + 1)) + 1;
    const c = this.start[1] - (this.start[1] % (this.pathWidth + 1)) + 1;

    const endR = this.end[0] - 20 - (this.end[0] % (this.pathWidth + 1));
    const endC = this.end[1] - 20 - (this.end[1] % (this.pathWidth + 1));

    this.maze = generateMaze(
      this.rows,
      this.cols,
      this.pathWidth,
      [r, c],
      [endR, endC]
    );
    this.tiles = replaceWalls(this.maze);

    const tilemap = this.make.tilemap({
      data: this.tiles,
      tileWidth: 16,
      tileHeight: 16,
    });

    tilemap.addTilesetImage("tiles", "tiles", 16, 16, 1, 2);
    const layer = tilemap.createLayer(0, "tiles", 0, 0);
    initCursors(this);

    this.player = new Player(
      this,
      (c + 1) * 16,
      (r + 1) * 16,
      "Blue",
      "Archer"
    );

    console.log(`${this.player.sprite.x} ${this.player.sprite.y}`)
    this.enemies = [new Enemy(this, 64, 64, "Thief")];

    this.camera = this.cameras.main;
    this.camera.zoom = 1.6
    this.camera.startFollow(this.player.sprite);

    layer.setCollision([12, 13, 14, 32, 33, 34, 52, 72]);
    this.physics.add.collider(this.player, layer);

    this.arrows = this.physics.add.group({
      classType: Arrow,
      runChildUpdate: true,
    });

    this.physics.add.collider(
      this.arrows,
      layer,
      (arrow) => {
        arrow.destroy();
      },
      null,
      this
    );

    this.enemies.forEach((enemy) => {
      this.physics.add.collider(enemy, layer);
    });

    [...this.enemies, this.player].forEach((entity) => {
      this.physics.add.collider(this.arrows, entity, (target, arrow) => {
        if (target.body == arrow.thrower.body) return;

        arrow.destroy();
        this.time.delayedCall(100, () => {
          entity.body.setVelocity(0, 0);
          entity.idle();
          entity.getKnockback(arrow);
          entity.onTakeDamage(arrow);
        });
      });
    });
  }

  update(time, delta) {
    this.player.update();

    this.enemies.forEach((enemy) => {
      enemy.update();
    });
  }
}
