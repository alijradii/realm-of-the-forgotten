 // class definition
 class MainScreenScene extends Phaser.Scene {
  constructor() {
    // naming used for reference
    super({ key: 'mainScreen' });
  }

  // loading my sprites
  preload() {
    this.load.spritesheet("character0", "./assets/images/Archer/Archer_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("character1", "./assets/images/AxeFighter/AxeFighter_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("character2", "./assets/images/AxeKnight/AxeKnight_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("character3", "./assets/images/LanceKnight/LanceKnight_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("character4", "./assets/images/SpearFighter/SpearFighter_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("character5", "./assets/images/SwordFighter/SwordFighter_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("character6", "./assets/images/Thief/Thief_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("character7", "./assets/images/Wizard/Wizard_Blue.png", {frameWidth: 32,frameHeight: 32,});

  }

  // creating my scene

  create() {
    const { width, height } = this.scale;

    const characterPositions = [
      { x: width / 5, y: height / 3 },          // Left-most character in top row
      { x: (2 * width) / 5, y: height / 3 },    // 2nd character from left in top row
      { x: (3 * width) / 5, y: height / 3 },    // Center character in top row
      { x: (4 * width) / 5, y: height / 3 },    // 2nd from right in top row
    
      { x: width / 5, y: (2 * height) / 3 },    // Left-most character in bottom row
      { x: (2 * width) / 5, y: (2 * height) / 3 }, // 2nd character from left in bottom row
      { x: (3 * width) / 5, y: (2 * height) / 3 }, // Center character in bottom row
      { x: (4 * width) / 5, y: (2 * height) / 3 }, // 2nd from right in bottom row
    ];
    
    const characterNames = [
      "Archer", "Axe Fighter", "Axe Knight", "Lance Knight",
      "Spear Fighter", "Sword Fighter", "Thief", "Wizard"
    ];

    this.add.text(width / 2, height / 10, 'Choose Your Character', {
      fontSize: '32px',
      color: '#000000'
    }).setOrigin(0.5);

    this.characters = [];
    for (let i = 0; i < 8; i++) {
      const { x, y } = characterPositions[i];
      const character = this.add.sprite(x, y, `character${i}`).setInteractive();
      character.setScale(3);
      this.characters.push(character);

      this.add.text(x, y + 40, characterNames[i], {
        fontSize: '16px',
        color: '#000000',
        align: 'center'
      }).setOrigin(0.5);


      this.tweens.add({
        targets: character,
        scale: 1.2,
        duration: 500,
        yoyo: true,
        ease: 'Bounce.easeOut',
      });

      character.on("pointerdown", () => {
        this.selectCharacter(`character${i}`);
        this.tweens.add({
          targets: character,
          scale: 1.4,
          duration: 200,
          yoyo: true,
          ease: 'Power2',
        });
      });
    }
  }

  selectCharacter(characterKey) {
    console.log(`Selected character: ${characterKey}`);
    // i can jump to the next scene
    // this.scene.start("GameScene", { character: characterKey });
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
};

const game = new Phaser.Game(config);
