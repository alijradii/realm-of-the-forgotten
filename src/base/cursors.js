function initCursors(scene) {
  cursors = scene.input.keyboard.addKeys({
    w: Phaser.Input.Keyboard.KeyCodes.W,
    a: Phaser.Input.Keyboard.KeyCodes.A,
    s: Phaser.Input.Keyboard.KeyCodes.S,
    d: Phaser.Input.Keyboard.KeyCodes.D,
  });

  scene.input.on("pointerdown", this.onPointerDown, this);
  scene.input.on("pointerup", this.onPointerUp, this);
}
