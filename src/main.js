const config = {
  type: Phaser.WEBGL,
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: "#f5f5f5",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: MazeScene,
  canvas: document.getElementById("gameCanvas"),
};

const game = new Phaser.Game(config);
