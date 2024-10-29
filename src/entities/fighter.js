class Fighter extends Entity {
  constructor(scene, x, y, color, baseClass) {
    super(scene, x, y, null);
    this.color = color;
    this.baseClass = baseClass;
    this.name = `${this.baseClass}_${this.color}`;

    this.sprite = scene.add.sprite(x, y, this.name, 1);
    this.scene.physics.add.existing(this.sprite);
    this.sprite.body.setSize(16, 16);
    this.body = this.sprite.body;

    this.state = "idle";
    this.direction = "left";
  }

  play() {}
}
