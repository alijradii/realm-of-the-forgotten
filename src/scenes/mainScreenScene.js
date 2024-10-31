class MainScreenScene extends Phaser.Scene {
  constructor() {
    super({ key: "mainScene" });
  }

  preload() {
    loadAssets(this);
  }

  create() {
    loadAnimations(this);
    const { width, height } = this.scale;
    const usernameInput = document.createElement("input");
    usernameInput.setAttribute("class", "username-input")
    document.querySelector(".container").appendChild(usernameInput);

    const characterPositions = [
      { x: width / 5, y: height / 3 },
      { x: (2 * width) / 5, y: height / 3 },
      { x: (3 * width) / 5, y: height / 3 },
      { x: (4 * width) / 5, y: height / 3 },

      { x: width / 5, y: (2 * height) / 3 },
      { x: (2 * width) / 5, y: (2 * height) / 3 },
      { x: (3 * width) / 5, y: (2 * height) / 3 },
      { x: (4 * width) / 5, y: (2 * height) / 3 },
    ];

    this.add
      .text(width / 2, height / 10, "Choose Your Character", {
        fontSize: "32px",
        color: "#000000",
      })
      .setOrigin(0.5);

    this.characters = [];
    for (let i = 0; i < 8; i++) {
      const { x, y } = characterPositions[i];
      const character = this.add
        .sprite(x, y, classes[i] + "_Blue")
        .setInteractive();
      character.setScale(3);
      this.characters.push(character);

      this.add
        .text(x, y + 40, classes[i], {
          fontSize: "16px",
          color: "#000000",
          align: "center",
        })
        .setOrigin(0.5);

      this.tweens.add({
        targets: character,
        scale: 1.2,
        duration: 500,
        yoyo: true,
        ease: "Bounce.easeOut",
      });

      character.on("pointerdown", () => {
        this.selectCharacter(classes[i]);
        this.tweens.add({
          targets: character,
          scale: 1.4,
          duration: 200,
          yoyo: true,
          ease: "Power2",
        });
      });

      character.on("pointerdown", () => {
        const username = usernameInput.value.trim();
        if (username) {
          this.registry.set("username", username);
          this.registry.set("selectedCharacter", classes[i]);

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

const mainScreenConfig = {
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
  scene: [MainScreenScene, MazeScene, WinScene, LoseScene],

  canvas: document.getElementById("gameCanvas"),
};
