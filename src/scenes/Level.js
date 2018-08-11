import { Player } from '../entities/Player';
import { Block } from '../entities/Block';
import { BlockIce } from '../entities/BlockIce';
import { Door } from '../entities/Door';
import { Exit } from '../entities/Exit';
import { Button } from '../entities/Button';
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
    this.gamepad = null;
    this.map = this.make.tilemap({ key: 'map' })
    var tiles = this.map.addTilesetImage('sprite@2x', 'tiles')
    var layerBackground = this.map.createStaticLayer(0, tiles, 0, 0)
    // var layerBlocks = this.map.createStaticLayer(3, tiles, 0, 0)
    this.blocks = []
    this.doors = []
    this.buttons = []
    this.exit = null
    this.initPlayer()
    this.initBlocks()
    this.initControls()
    this.input.gamepad.once('down', (pad, button, index) => {
      this.initControlsGamepad(pad, button, index)
    })
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
    this.cameras.main.setZoom(1.5)
    // this.cameras.main.setZoom(500)
    // this.cameras.main.zoomTo(1.5, 1000, 'Quint.easeOut')
  }
  initBlocks() {
    var playerLayer = this.map.layers.filter(layer => layer.name === "blocks")[0].data
    for (var i = 0; i < playerLayer.length; i++) {
      for (var j = 0; j < playerLayer[i].length; j++) {
        if (playerLayer[i][j].index !== -1) {

          if (playerLayer[i][j].index === 95) {
            this.exit = this.add.existing(new Exit(this, j, i))
          } else if (playerLayer[i][j].index === 41) {
            this.blocks.push(this.add.existing(new Block(this, j, i)))
          } else if (playerLayer[i][j].index === 63) {
            this.blocks.push(this.add.existing(new BlockIce(this, j, i)))
          } else if (playerLayer[i][j].index === 57) {
            this.doors.push(this.add.existing(new Door(this, j, i, 'brown')))
          } else if (playerLayer[i][j].index === 87) {
            this.doors.push(this.add.existing(new Door(this, j, i, 'blue')))
          } else if (playerLayer[i][j].index === 67) {
            this.buttons.push(this.add.existing(new Button(this, j, i, 'brown')))
          } else if (playerLayer[i][j].index === 78) {
            this.buttons.push(this.add.existing(new Button(this, j, i, 'blue')))
          }

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
  initControlsGamepad(gamepad, button, index) {
    this.gamepad = gamepad;
    console.log(gamepad);
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
    this.doors.forEach(door => {
      if (door.map.x === mapX && door.map.y === mapY && !door.open) {
        returnblock = door
      }
    })
    return returnblock;
  }
  canMove(entity, direction) {
    return this.canMoveCollider(entity, direction) && this.canMoveBlocks(entity, direction)
  }
  getOppositeDirection(direction) {
    if (direction === "left") {
      return "right";
    } else if (direction === "right") {
      return "left";
    } else if (direction === "down") {
      return "up";
    } else if (direction === "up") {
      return "down";
    }
  }
  checkCollision(entityA, entityB) {
    return entityA.map.x === entityB.map.x && entityA.map.y === entityB.map.y
  }
  update(){
    let direction = null
    if (this.keys.left.isDown || (this.gamepad && (this.gamepad.left || this.gamepad.axes[0].getValue() < -0.5))) {
      direction = 'left'
    } else if (this.keys.right.isDown || (this.gamepad && (this.gamepad.right || this.gamepad.axes[0].getValue() > 0.5))) {
      direction = 'right'
    } else if (this.keys.up.isDown || (this.gamepad && (this.gamepad.up || this.gamepad.axes[1].getValue() < -0.5))) {
      direction = 'up'
    } else if (this.keys.down.isDown || (this.gamepad && (this.gamepad.down || this.gamepad.axes[1].getValue() > 0.5))) {
      direction = 'down'
    }
    if (direction !== null) {
      if (this.player.catching) {
        let neighboor = this.getNeighboorBlocks(this.player, this.player.getDirection());
        if (neighboor.name === "blockice" && this.player.getDirection() === direction) {
          this.player.release()
          neighboor.slide(direction)
        } else if (neighboor.name === "block"){
            if ((this.canMove(this.player, direction) || this.player.getDirection() === direction)
                && this.canMoveCollider(this.player.catched, direction)
                && this.canMoveBlocks(this.player.catched, direction)
                && (this.player.getDirection() === direction || this.player.getDirection() === this.getOppositeDirection(direction))
              ) {
              this.player.catched.move(direction, true)
              this.player.move(direction, true)
            }
        }
      } else {
        this.player.move(direction, this.canMove(this.player, direction))
      }
    }
    if ((this.keys.space.isDown || (this.gamepad && this.gamepad.A)) && this.getNeighboorBlocks(this.player, this.player.getDirection()) !== null && this.getNeighboorBlocks(this.player, this.player.getDirection()).catchable) {
     this.player.catch(this.getNeighboorBlocks(this.player, this.player.getDirection()))
    } else {
     this.player.release()
    }
    this.blocks.forEach(block => {
      block.update();
      if (block.sliding !== null && this.canMoveCollider(block, block.sliding) && this.canMoveBlocks(block, block.sliding)) {
        block.move(block.sliding, true)
      } else {
        block.sliding = null;
        block.catchable = true;
      }
    })
    this.player.update()
    this.exit.update()

    //Buttons/doors
    this.doors.forEach(door => {
      let open = true;
      let forceClosed = false;
      this.buttons.forEach(button => {
        if (door.color === button.color) {
          if (!this.checkCollision(this.player, button)) {
            let on = false;
            this.blocks.forEach(block => {
              if (button.color === block.color) {
                if (this.checkCollision(block, button)){
                  on = true;
                }
              }
            })
            if (!on) open = false
          }
        }
        // if (!open) {
        //   this.blocks.forEach(block => {
        //     if (this.checkCollision(block, button)) {
        //       if (button.color === block.color && door.color === button.color) open = true;
        //     }
        //   })
        // }
      })
      door.setOpen(open)
    })
    this.doors.forEach(door => door.update())
  }
}
