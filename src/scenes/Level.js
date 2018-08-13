import { Player } from '../entities/Player';
import { Block } from '../entities/Block';
import { BlockIce } from '../entities/BlockIce';
import { Door } from '../entities/Door';
import { Exit } from '../entities/Exit';
import { Button } from '../entities/Button';
export class Level extends Phaser.Scene {
  constructor () {
      super({key: "level"})
  }
  init(data) {
    this.level = data.level;
  }
  preload() {
    this.load.image('cokecan', 'assets/cokecan.png')
    this.load.tilemapTiledJSON(this.level, 'assets/levels/' + this.level + '.json')
    this.load.image('tiles', 'assets/sprite@2x.png')
    this.load.spritesheet('player', 'assets/sprite@2x.png', { frameWidth: 32, frameHeight: 32})
    this.load.audio('door', ['assets/sounds/door.ogg']);
    this.load.audio('door2', ['assets/sounds/door2.ogg']);
    this.load.audio('victory', ['assets/sounds/victory.ogg']);
    this.load.audio('footstep00', ['assets/sounds/footstep00.ogg']);
    this.load.audio('footstep01', ['assets/sounds/footstep01.ogg']);
    this.load.audio('footstep02', ['assets/sounds/footstep02.ogg']);
    this.load.audio('whoosh00', ['assets/sounds/whoosh.mp3']);
    this.load.audio('whoosh01', ['assets/sounds/whoosh2.mp3']);
  }

  create() {
    this.gamepad = null;
    if (this.input.gamepad.gamepads.length != 0)
    this.gamepad = this.input.gamepad.gamepads[0];
    this.map = this.make.tilemap({ key: this.level })
    var tiles = this.map.addTilesetImage('sprite@2x', 'tiles')
    var layerBackground = this.map.createStaticLayer(0, tiles, 0, 0)
    this.nextLevel = this.map.layers[0].properties.nextLevel;
    var layerRoof = this.map.createStaticLayer(4, tiles, 0, 0)
    layerRoof.depth = 99999;
    // var layerBlocks = this.map.createStaticLayer(3, tiles, 0, 0)
    this.blocks = []
    this.doors = []
    this.buttons = []
    this.winTime = 0;
    this.restarting = false;
    this.exit = null
    if (!this.anims.anims.entries.right)
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: 1
    });
    if (!this.anims.anims.entries.left)
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 10, end: 13 }),
        frameRate: 15,
        repeat: 1
    });
    if (!this.anims.anims.entries.down)
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 20, end: 23 }),
        frameRate: 15,
        repeat: 1
    });
    if (!this.anims.anims.entries.up)
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 30, end: 33 }),
        frameRate: 15,
        repeat: 1
    });
    if (!this.anims.anims.entries.win)
    this.anims.create({
        key: 'win',
        frames: this.anims.generateFrameNumbers('player', { start: 37, end: 39 }),
        frameRate: 10,
        repeat: 3
    });
    this.sounds = {// + Math.floor(Math.random()*3)
      "footstep00": this.sound.add('footstep00'),
      "footstep01": this.sound.add('footstep01'),
      "footstep02": this.sound.add('footstep02'),
      "victory": this.sound.add('victory'),
      "door": this.sound.add('door'),
      "door2": this.sound.add('door2'),
      "whoosh00": this.sound.add('whoosh00'),
      "whoosh01": this.sound.add('whoosh01'),
    }
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
    this.cameras.main.startFollow(this.player, false, 1, 1, -16, -16)
    this.cameras.main.setZoom(5)
    this.cameras.main.fadeIn(1000, 0, 0, 0, (camera, progress) => {
      if (progress > .75) {
        this.cameras.main.zoomTo(1.5, 1000, 'Quint.easeOut')
      }
    })

  }
  initBlocks() {
    var playerLayer = this.map.layers.filter(layer => layer.name === "blocks")[0].data
    for (var i = 0; i < playerLayer.length; i++) {
      for (var j = 0; j < playerLayer[i].length; j++) {
        if (playerLayer[i][j].index !== -1) {

          if (playerLayer[i][j].index === 94) {
            this.exit = this.add.existing(new Exit(this, j, i, true))
          } else if (playerLayer[i][j].index === 95) {
            this.exit = this.add.existing(new Exit(this, j, i, false))
          } else if (playerLayer[i][j].index === 41) {
            this.blocks.push(this.add.existing(new Block(this, j, i)))
          } else if (playerLayer[i][j].index === 51) {
            this.blocks.push(this.add.existing(new BlockIce(this, j, i)))
          } else if (playerLayer[i][j].index === 61) {
            this.doors.push(this.add.existing(new Door(this, j, i, 'brown')))
          } else if (playerLayer[i][j].index === 66) {
            this.doors.push(this.add.existing(new Door(this, j, i, 'blue')))
          } else if (playerLayer[i][j].index === 65) {
            this.buttons.push(this.add.existing(new Button(this, j, i, 'brown')))
          } else if (playerLayer[i][j].index === 70) {
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
      restart: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
  }
  initControlsGamepad(gamepad, button, index) {
    this.gamepad = gamepad;
  }
  restart() {
    this.cameras.main.fadeOut(500, 0, 0, 0, (camera, progress) => {
      if (progress === 1) {
        this.scene.restart();
      }
    })
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
    if ((this.keys.restart.isDown || (this.gamepad && this.gamepad.Y) )&& !this.restarting ) {
      this.restarting = true;
      this.restart();
    }
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
              if (!this.player.moving){
                this.sounds['footstep0' + Math.floor(Math.random()*3)].play('',{volume: 0.2})
                this.sounds['whoosh0' + Math.floor(Math.random()*2)].play('',{volume: 0.2})
              }
              this.player.catched.move(direction, true)
              this.player.move(direction, true)
            }
        }
      } else {
        if (!this.player.moving && this.canMove(this.player, direction)) {
          let sound = this.sounds['footstep0' + Math.floor(Math.random()*3)].play({volume: 0.2})
        }
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
        this.sounds['whoosh0' + Math.floor(Math.random()*2)].play({volume: 0.2})
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
      })
      if(door.open !== open) {
        if(open) this.sounds['door'].play({volume: 0.2})
        else this.sounds['door2'].play({volume: 0.2})
      }
      door.setOpen(open)
    })
    this.doors.forEach(door => door.update())
    if (this.checkCollision(this.player, this.exit) && !this.player.willWinning) {
      this.player.willWinning = true;
      this.sounds['victory'].play({repeat: 3})
      this.cameras.main.zoomTo(5, 2000, 'Quint.easeOut')
    }
    if (this.player.isWinning) {
      if (this.winTime === 100) {
        this.winTime++
        this.cameras.main.fadeOut(2000, 0, 0, 0, (camera, progress) => {
          if (progress === 1) {
            if(this.nextLevel === "final") this.scene.start("menu")
            else this.scene.start("level", {level: this.nextLevel})
          }
        })
      } else this.winTime++;
    }
  }
}
