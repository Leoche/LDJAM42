import { Player } from '../entities/Player';
import { Block } from '../entities/Block';
import { Exit } from '../entities/Exit';
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
    var layerBackground = this.map.createStaticLayer(0, tiles, 0, 0)
    //var layerBlocks = this.map.createStaticLayer(3, tiles, 0, 0)
    this.blocks = []
    this.exit = null
    this.initPlayer()
    this.initBlocks()
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
    this.cameras.main.setZoom(500)
    this.cameras.main.zoomTo(1.5, 1000, 'Quint.easeOut')
  }
  initBlocks() {
    var playerLayer = this.map.layers.filter(layer => layer.name === "blocks")[0].data
    for (var i = 0; i < playerLayer.length; i++) {
      for (var j = 0; j < playerLayer[i].length; j++) {
        if (playerLayer[i][j].index !== -1) {
          if (playerLayer[i][j].index === 95) this.exit = this.add.existing(new Exit(this, j, i))
          else this.blocks.push(this.add.existing(new Block(this, j, i)))
        }
      }
    }
  }
  initControls() {
    this.keys = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
  }
  canMoveCollider(entity, direction){
    if (entity.name === "player" && entity.moving) return false;
    var nextX = 0;
    var nextY = 0;
    if (direction === "left") {
      nextX--
    } else if (direction === "right") {
      nextX++
    } else if (direction === "down") {
      nextY++
    } else if (direction === "up") {
      nextY--
    }
    return this.map.layers.filter(layer => layer.name === "colliders")[0].data[entity.map.y + nextY][entity.map.x + nextX].index === -1
  }
  canMoveBlocks(entity, direction) {
    if (entity.name === "player" && entity.moving) return false;
    var nextX = 0;
    var nextY = 0;
    if (direction === "left") {
      nextX--
    } else if (direction === "right") {
      nextX++
    } else if (direction === "down") {
      nextY++
    } else if (direction === "up") {
      nextY--
    }
    return this.getBlockAt(entity.map.x + nextX, entity.map.y + nextY) === null
  }
  getNeighboorBlocks(entity, direction) {
    var nextX = 0;
    var nextY = 0;
    if (direction === "left") {
      nextX--
    } else if (direction === "right") {
      nextX++
    } else if (direction === "down") {
      nextY++
    } else if (direction === "up") {
      nextY--
    }
    return this.getBlockAt(entity.map.x + nextX, entity.map.y + nextY)
  }
  getBlockAt(mapX, mapY) {
    let returnblock = null
    this.blocks.forEach(block => {
      if (block.map.x === mapX && block.map.y === mapY) {
        returnblock = block
      }
    })
    console.log(returnblock );
    return returnblock;
  }
  canMove(entity, direction) {
    return this.canMoveCollider(entity, direction) && this.canMoveBlocks(entity, direction)
  }
  update(){
    let direction = null
    if (this.keys.left.isDown) {
      direction = 'left'
    } else if (this.keys.right.isDown) {
      direction = 'right'
    } else if (this.keys.up.isDown) {
      direction = 'up'
    } else if (this.keys.down.isDown) {
      direction = 'down'
    }
    if (direction !== null) {
      this.player.move(direction, this.canMove(this.player, direction))
      if (this.player.catching) {
        if (this.canMoveCollider(this.player.catched, direction)) {
          this.player.catched.move(direction, true)
        }
      }
    }
    if (this.keys.space.isDown && this.getNeighboorBlocks(this.player, this.player.getDirection()) !== null) {
     this.player.catch(this.getNeighboorBlocks(this.player, this.player.getDirection()))
    } else {
     this.player.release()
    }
    this.blocks.forEach(block => block.update())
    this.player.update()
    this.exit.update()
  }
}
