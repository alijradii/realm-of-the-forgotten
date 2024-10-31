class MazeScene extends Phaser.Scene {
  constructor(key) {
    super({ key: "mazeScene" });

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

    this.rows = 100;
    this.cols = 100;
    this.start = [20, 20];
    this.end = [this.rows - 20, this.cols - 20];

    this.pathWidth = 2 + Math.floor(Math.random() * 2);
    this.startRow;
    this.startCol;
    this.endRow;
    this.endCol;

    this.username;
    this.selectedCharacter;

    this.enemyCount = 10;

    this.enemyCountText;
    this.playerHpText;
  }

  preload() {
    this.load.image("tiles", "assets/images/tileset-extruded.png");
    loadAssets(this);
  }

  create() {
    this.username = this.registry.get("username");
    this.selectedCharacter = this.registry
      .get("selectedCharacter")
      .split("_")[0];

    loadAnimations(this);
    this.generate();
    initCursors(this);
    this.initPooledObjects();
    this.initPlayer();
    this.initEnemies();
    this.initHitChecks();
    this.initGUI();
  }

  update(time, delta) {
    this.player.update();

    console.log(this.enemies.length);

    this.enemies.forEach((enemy) => {
      enemy.update();
    });

    this.enemies = this.enemies.filter((enemy) => !enemy.isDead);

    this.enemyCountText.setText(`Enemies: ${this.enemies.length}`);
    this.playerHpText.setText(`HP: ${this.player.hp}`);

    if (this.enemies.length == 0) {
      this.onWinGame();
      return;
    }
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
      [this.endRow, this.endCol],
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
      this.selectedCharacter,
    );

    this.camera = this.cameras.main;
    this.camera.zoom = 1.6;
    this.camera.startFollow(this.player.sprite);
    this.physics.add.collider(this.player, this.mainTilemapLayer, () => {
      if (this.player.state == "dash") {
        this.player.state = "idle";
        this.player.update();
      }
    });
  }

  initEnemies() {
    this.enemies = [];

    for (let i = 0; i < this.enemyCount; i++) {
      const baseClass = chooseRandomElement(classes);

      let r =
        Math.floor(Math.random() * (this.endRow - this.startRow - 10)) +
        this.startRow +
        5;
      let c =
        Math.floor(Math.random() * (this.endCol - this.startCol - 10)) +
        this.startCol +
        5;

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
      this,
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

  onWinGame() {
    this.registry.set("username", this.username);
    this.registry.set("selectedCharacter", this.selectedCharacter);
    this.scene.start("winScene");
  }

  onLoseGame() {
    this.registry.set("username", this.username);
    this.registry.set("selectedCharacter", this.selectedCharacter);
    this.scene.start("loseScene");
  }

  shutdown() {
    this.input.keyboard.clearCaptures();
    this.input.keyboard.removeAllListeners();
    this.cursors = null;
  }

  initGUI() {
    this.enemyCountText = this.add.text(520, 450, "Enemies: 0", {
      fontSize: "16px",
      color: "#000020",
    });
    this.enemyCountText.setScrollFactor(0, 0);

    this.playerHpText = this.add.text(170, 450, "HP: 100", {
      fontSize: "16px",
      color: "#000020",
    });
    this.playerHpText.setScrollFactor(0, 0);
  }
}
