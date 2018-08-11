export class Block extends Phaser.GameObjects.Sprite {

    constructor (scene, mapX, mapY)
    {
        super(scene, mapX * 32, mapY * 32)
        this.name = "block"
        this.setTexture('player')
        this.setOrigin(0,0)
        this.setFrame(40)
        this.setPosition(mapX * 32, mapY * 32)
        this.map = {
          x: mapX,
          y: mapY
        }
        this.nextPosition = {
          x: mapX * 32,
          y: mapY * 32
        }
        this.moving = false
    }
    move(direction){
      console.log(direction);
      if (this.moving) return;
      this.moving = true;
      if (direction === "left") {
        this.nextPosition.x -= 32;
        this.map.x--
      } else if (direction === "right") {
        this.nextPosition.x += 32;
        this.map.x++
      } else if (direction === "down") {
        this.nextPosition.y += 32;
        this.map.y++
      } else if (direction === "up") {
        this.nextPosition.y -= 32;
        this.map.y--
      }
    }
    update() {
      if (this.nextPosition.x !== this.x) {
        if (this.nextPosition.x > this.x) this.x += 2;
        else this.x -= 2;
      } else if (this.nextPosition.y !== this.y) {
        if (this.nextPosition.y > this.y) this.y += 2;
        else this.y -= 2;
      } else {
        this.moving = false;
      }
    }
}
