import 'phaser';

import { SimpleScene } from './scenes/simple-scene';
import { Level } from './scenes/Level';
import { Menu } from './scenes/Menu';

const gameConfig = {
  width: 600,
  height: 600,
  scene: Level,
  input: {
      gamepad: true
  },
  pixelArt: true
};

new Phaser.Game(gameConfig);
