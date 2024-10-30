 // class definition
 class MainScreenScene extends Phaser.Scene {
  constructor() {
    // naming used for reference
    super({ key: 'mainScreen' });
  }

  // loading my sprites
  preload() {
    this.load.spritesheet("player", "./assets/images/Archer/Archer_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("player", "./assets/images/Archer/AxeFighter_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("player", "./assets/images/Archer/AxeKnight_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("player", "./assets/images/Archer/LanceKnight_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("player", "./assets/images/Archer/SpearFighter_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("player", "./assets/images/Archer/SwordFighter_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("player", "./assets/images/Archer/Thief_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("player", "./assets/images/Archer/Wizard_Blue.png", {frameWidth: 32,frameHeight: 32,});

  }

  // creating my scene
  create() {
    const { width, height } = this.scale;

    // 0 for frame character number
    this.character = this.add.sprite(width / 2, height / 2, "player", 0); 
    this.character.setScale(4);

    this.add.text(width / 2, height / 6, 'Realm of the forgotten', {
      fontSize: '42px',
      color: '#000000'
    }).setOrigin(0.5);
    // for animation
    this.tweens.add({
      targets: this.character,
      y: height / 2 - 10,
      duration: 500,
      yoyo: true,
      repeat: -1
    });
  }
}

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

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [MainScreenScene],
  canvas: document.getElementById("mainScene"),
};

const game = new Phaser.Game(config);
