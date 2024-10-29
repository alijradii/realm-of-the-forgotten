class Entity {
  constructor(scene, x, y, sprite) {
    this.scene = scene;
    this.sprite = sprite;
    this.health = 100;
    this.speed = 100;
    this.state = "idle";
  }
}
