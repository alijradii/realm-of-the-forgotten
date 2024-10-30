 // class definition
 class MainScreenScene extends Phaser.Scene {
  constructor() {
    // naming used for reference
    super({ key: 'mainScreen' });
  }

  // loading my sprites
  preload() {
    this.load.spritesheet("Archer", "./assets/images/Archer/Archer_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("Axe Fighter", "./assets/images/AxeFighter/AxeFighter_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("Axe Knight", "./assets/images/AxeKnight/AxeKnight_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("Lance Knight", "./assets/images/LanceKnight/LanceKnight_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("Spear Fighter", "./assets/images/SpearFighter/SpearFighter_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("Sword Fighter", "./assets/images/SwordFighter/SwordFighter_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("Thief", "./assets/images/Thief/Thief_Blue.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet("Wizard", "./assets/images/Wizard/Wizard_Blue.png", {frameWidth: 32,frameHeight: 32,});

  }

  // creating my scene

  create() {
    const { width, height } = this.scale;

    // creating input section for username
    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.placeholder = "Enter your username";
    usernameInput.style.position = "absolute";
    usernameInput.style.top = "50%";
    usernameInput.style.left = "50%";
    usernameInput.style.transform = "translate(-50%, -50%)";
    usernameInput.style.fontSize = "20px";
    usernameInput.style.padding = "5px";
    document.querySelector(".container").appendChild(usernameInput);


    // width and height generated using chatgpt
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
      const character = this.add.sprite(x, y, characterNames[i]).setInteractive();
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

      // on click eventListener
      character.on("pointerdown", () => {
        this.selectCharacter(characterNames[i]);
        this.tweens.add({
          targets: character,
          scale: 1.4,
          duration: 200,
          yoyo: true,
          ease: 'Power2',
        });
      });

      character.on("pointerdown", () => {
        const username = usernameInput.value.trim();
        if (username) {
          // save username and character for later scenes
          this.registry.set("username", username);
          this.registry.set("selectedCharacter", characterNames[i]);
          
          usernameInput.remove();
          this.scene.start("mazeScene"); 
        } else {
          alert("Please enter a username before selecting a character.");
        }
      });
    }
  }

  selectCharacter(characterKey) {
    console.log(`Selected character: ${characterKey}`);

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
