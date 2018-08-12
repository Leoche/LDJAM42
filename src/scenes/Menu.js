import { Level } from './Level';
export class Menu extends Phaser.Scene {
  constructor () {
      super({key: 'menu'});
  }
  preload() {
    this.load.image('bg', 'assets/bg.png');
  }

  create() {
    var sprite = this.add.sprite(300, 300, 'bg');
    sprite.setScale(4)
    this.gamepad =null;
    this.input.gamepad.once('down', (pad, button, index) => {
      this.initControlsGamepad(pad, button, index)
    })
    if (this.input.gamepad.gamepads.length != 0)
    this.gamepad = this.input.gamepad.gamepads[0];
  }
  initControlsGamepad(gamepad, button, index) {
    this.gamepad = gamepad;
  }
  update() {
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown || (this.gamepad && this.gamepad.A)) {
      this.cameras.main.fadeOut(100, 0, 0, 0, (camera, progress) => {
        if (progress === 1) {
          this.scene.start("level", {level: "tutorial"});
        }
      })
    }
  }
}
