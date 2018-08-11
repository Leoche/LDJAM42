import { Player } from '../entities/Player';
export class Level extends Phaser.Scene {
  constructor () {
      super('Menu')
  }
  preload() {
    this.load.image('cokecan', 'assets/cokecan.png')
    this.load.tilemapTiledJSON('map', 'assets/map.json')
    this.load.image('tiles', 'assets/sprite@2x.png')
    this.load.spritesheet('player', 'assets/sprite@2x.png', { frameWidth: 32, frameHeight: 32})

  }

  create() {
    window.e = this
    this.map = this.make.tilemap({ key: 'map' })
    var tiles = this.map.addTilesetImage('sprite@2x', 'tiles')
    var layer = this.map.createStaticLayer(0, tiles, 0, 0)
    this.initPlayer()
    this.initControls()
  }
  initPlayer() {
    var playerLayer = this.map.layers.filter(layer => layer.name === "player")[0].data
    for (var i = 0; i < playerLayer.length; i++) {
      for (var j = 0; j < playerLayer[i].length; j++) {
        if (playerLayer[i][j].index !== -1) {
          this.player = this.add.existing(new Player(this, j, i))
        }
      }
    }
    this.cameras.main.startFollow(this.player)
    this.cameras.main.zoomTo(2, 500, 'Circ.easeOut')
  }
  initControls() {
    var e = "";
  }
}
