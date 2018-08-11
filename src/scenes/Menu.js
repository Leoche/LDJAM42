export class Menu extends Phaser.Scene {
  constructor () {
      super('Menu');
  }
  preload() {
    this.load.image('cokecan', 'assets/cokecan.png');
  }

  create() {
    this.add.text(100, 100, 'Menu', { fill: '#0f0' });
    var sprite = this.add.sprite(100, 200, 'cokecan').setInteractive();
    sprite.on('pointerdown', function (pointer) {
        this.setTint(0x00ffff);
    });
    sprite.on('pointerup', function (pointer) {
        this.clearTint();
    });
    var sprite2 = this.add.sprite(200, 200, 'cokecan').setInteractive();
    sprite2.on('pointerdown', function (pointer) {
        this.setTintFill(0xffffff);
    });
    sprite2.on('pointerup', function (pointer) {
        this.clearTint();
    });
  }
}
