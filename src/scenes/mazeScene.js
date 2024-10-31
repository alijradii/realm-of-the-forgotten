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
    this.tilemap;
    this.mainTilemapLayer;

    this.rows = 140;
    this.cols = 140;
    this.start = [20, 20];
    this.end = [this.rows - 20, this.cols - 20];

    this.pathWidth = 1 + Math.floor(Math.random() * 4);
    this.startRow;
    this.startCol;
    this.endRow;
    this.endCol;
  }

  preload() {
    this.load.image("tiles", "assets/images/tileset-extruded.png");
    loadAssets(this);
  }

  create() {
    loadAnimations(this);
    this.generate();
    initCursors(this);
    this.initPooledObjects();
    this.initPlayer();
    this.initEnemies();
    this.initHitChecks();
  }

  update(time, delta) {
    this.player.update();

    this.enemies.forEach((enemy) => {
      enemy.update();
    });
  }

  generate() {
    this.startRow = this.start[0] - (this.start[0] % (this.pathWidth + 1)) + 1;
    this.startCol = this.start[1] - (this.start[1] % (this.pathWidth + 1)) + 1;

    this.endRow = this.end[0] - 20 - (this.end[0] % (this.pathWidth + 1));
    this.endCol = this.end[1] - 20 - (this.end[1] % (this.pathWidth + 1));

    this.maze = generateMaze(
      this.rows,
      this.cols,
      this.pathWidth,
      [this.startRow, this.startCol],
      [this.endRow, this.endCol]
    );

    this.tiles = replaceWalls(this.maze);

    this.tilemap = this.make.tilemap({
      data: this.tiles,
      tileWidth: 16,
      tileHeight: 16,
    });

    this.tilemap.addTilesetImage("tiles", "tiles", 16, 16, 1, 2);

    this.mainTilemapLayer = this.tilemap.createLayer(0, "tiles", 0, 0);
    this.mainTilemapLayer.setCollision([12, 13, 14, 32, 33, 34, 52, 72]);
  }

  initPlayer() {
    this.player = new Player(
      this,
      (this.startCol + 1) * 16,
      (this.startRow + 1) * 16,
      "Blue",
      "LanceKnight"
    );

    this.camera = this.cameras.main;
    this.camera.zoom = 1.6
    this.camera.startFollow(this.player.sprite);
    this.physics.add.collider(this.player, this.mainTilemapLayer);
  }

  initEnemies() {
    this.enemies = [];

    for (let i = 0; i < 30; i++) {
      const baseClass = chooseRandomElement(classes);

      let r =
        Math.floor(Math.random() * (this.endRow - this.startRow)) + this.startRow;
      let c =
        Math.floor(Math.random() * (this.endCol - this.startCol)) + this.startCol;

      r = r - (r % (this.pathWidth + 1)) + 1;
      c = r - (c % (this.pathWidth + 1)) + 1;

      const enemy = new Enemy(this, r * 16, c * 16, baseClass);
      this.physics.add.collider(enemy, this.mainTilemapLayer);
      this.enemies.push(enemy);
    }
  }

  initPooledObjects() {
    this.arrows = this.physics.add.group({
      classType: Arrow,
      runChildUpdate: true,
    });

    this.physics.add.collider(
      this.arrows,
      this.mainTilemapLayer,
      (arrow) => {
        arrow.destroy();
      },
      null,
      this
    );
  }

  initHitChecks() {
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
}
