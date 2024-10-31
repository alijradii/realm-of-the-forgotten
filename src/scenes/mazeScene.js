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
    }

    preload() {
        this.load.image("tiles", "assets/images/tileset-extruded.png");
        loadAssets(this);
    }

    create() {
        loadAnimations(this);
        this.rows = 200;
        this.cols = 200;
        this.pathWidth = 5;

        this.maze = generateMaze(this.rows, this.cols, this.pathWidth);
        this.tiles = replaceWalls(this.maze);

        const tilemap = this.make.tilemap({
            data: this.tiles,
            tileWidth: 16,
            tileHeight: 16,
        });

        tilemap.addTilesetImage("tiles", "tiles", 16, 16, 1, 2);
        const layer = tilemap.createLayer(0, "tiles", 0, 0);
        layer.setCollisionBetween(11, 14);

        initCursors(this);

        this.player = new Player(this, 32, 32, "Blue", "Archer");
        this.enemies = [new Enemy(this, 64, 64, "Archer")];

        this.camera = this.cameras.main;
        this.camera.zoom = 1.6;
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
                    entity.onTakeDamage();
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
