class WinScene extends Phaser.Scene { constructor() {
    super({ key: 'winScene' });
  }

  create() {
    const username = this.registry.get("username");
    const selectedCharacter = this.registry.get("selectedCharacter") + "_Blue";

    this.add.rectangle(400, 300, 800, 600, 0x1a1a2e).setOrigin(0.5);

    this.add.text(400, 200, 'The Champion!', {
      fontFamily: 'sans-serif',
      fontSize: '72px',
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
      strokeThickness: 4,
      shadow: {
        offsetX: 3,
        offsetY: 3,
        color: '#333',
        blur: 5,
        fill: true,
      }
    }).setOrigin(0.5);

    this.add.text(400, 120, `${username}, You Are`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '36px',
      color: '#fff',
      align: 'center',
    }).setOrigin(0.5);

    this.add.text(400, 300, `You conquered the dungeon!`, {
      fontFamily: 'Courier, monospace',
      fontSize: '30px',
      color: '#ffffcc',
      align: 'center',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    const characterSprite = this.add.sprite(400, 400, selectedCharacter).setScale(4).setOrigin(0.5);

    const playAgainButton = this.add.text(400, 500, 'Play Again', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '28px',
      color: '#ffcc00',
      backgroundColor: '#1a1a2e',
      padding: { x: 10, y: 5 },
      borderRadius: 10,
    }).setOrigin(0.5).setInteractive();

    playAgainButton.on('pointerover', () => playAgainButton.setStyle({ color: '#fff' }));
    playAgainButton.on('pointerout', () => playAgainButton.setStyle({ color: '#ffcc00' }));
    playAgainButton.on('pointerdown', () => {
      this.scene.start('mainScene');
    });

    this.tweens.add({
      targets: [characterSprite],
      scale: { from: 3, to: 4 },
      duration: 800,
      yoyo: true,
      repeat: -1,
    });
  }
}