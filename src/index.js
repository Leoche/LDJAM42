import 'phaser';

import { Level } from './scenes/Level';
import { Menu } from './scenes/Menu';

const gameConfig = {
  width: 600,
  height: 600,
  input: {
      gamepad: true
  },
  pixelArt: true
};

var game = new Phaser.Game(gameConfig);
game.scene.add('menu', Menu);
game.scene.add('level', Level);
game.scene.start('menu')
