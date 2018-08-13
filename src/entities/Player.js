export class Player extends Phaser.GameObjects.Sprite {

    constructor (scene, mapX, mapY)
    {
        super(scene, mapX * 32, mapY * 32)
        this.name = "player"
        this.setTexture('player')
        this.setOrigin(0,0)
        this.setPosition(mapX * 32, mapY * 32)
        this.frameBase = 20;
        this.catching = 0;
        this.catched = null;
        this.depth = 1000;
        this.isWinning = false;
        this.willWinning = false;
        this.map = {
          x: mapX,
          y: mapY
        }
        this.nextPosition = {
          x: mapX * 32,
          y: mapY * 32
        }
        this.directionToFrame = {
          left: 10,
          right: 0,
          up: 30,
          down: 20
        }
        this.moving = false
    }
    move(direction, canMove){
      if (this.moving || this.isWinning) return;
      if (this.catching === 0) this.frameBase = this.directionToFrame[direction]
      if (!canMove) return;
      this.moving = true;
      if (direction === "left") {
        this.nextPosition.x -= 32;
        this.map.x--
        if (!this.catching) this.anims.play('left');
        else this.setFrame(this.frameBase + this.catching)
      } else if (direction === "right") {
        this.nextPosition.x += 32;
        this.map.x++
        if (!this.catching) this.anims.play('right');
        else this.setFrame(this.frameBase + this.catching)
      } else if (direction === "down") {
        this.nextPosition.y += 32;
        this.map.y++
        if (!this.catching) this.anims.play('down');
        else this.setFrame(this.frameBase + this.catching)
      } else if (direction === "up") {
        this.nextPosition.y -= 32;
        this.map.y--
        if (!this.catching) this.anims.play('up');
        else this.setFrame(this.frameBase + this.catching)
      }
    }
    catch(block) {
      this.catching = 6
      this.catched = block;
    }
    release() {
      this.catching = 0
      this.catched = null;
    }
    getDirection() {
      if (this.frameBase >= 30) return 'up';
      if (this.frameBase >= 20) return 'down';
      if (this.frameBase >= 10) return 'left';
      if (this.frameBase >= 0) return 'right';
    }
    update() {
      if (this.isWinning) {
        return;
      }
      if (!this.moving) {
        this.setFrame(this.frameBase + this.catching)
      }
      if (this.nextPosition.x !== this.x) {
        if (this.nextPosition.x > this.x) this.x += 2;
        else this.x -= 2;
      } else if (this.nextPosition.y !== this.y) {
        if (this.nextPosition.y > this.y) this.y += 2;
        else this.y -= 2;
      } else {
        this.moving = false;
        if (this.willWinning) this.isWinning = true;
        if (this.isWinning) this.anims.play('win')
      }
    }
}
