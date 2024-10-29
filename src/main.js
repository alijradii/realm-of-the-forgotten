const config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
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
