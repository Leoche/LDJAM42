export class Exit extends Phaser.GameObjects.Sprite {

    constructor (scene, mapX, mapY, flipped)
    {
        super(scene, mapX * 32, mapY * 32)
        this.name = "exit"
        this.setTexture('player')
        this.setOrigin(0,0)
        this.setFrame(94)
        this.setFlip(flipped)
        this.setPosition(mapX * 32, mapY * 32)
        this.map = {
          x: mapX,
          y: mapY
        }
        this.counter = 0
        this.speed = 50
    }
    update() {
      this.counter++;
      if (this.counter > this.speed/2) this.setFrame(93)
      else this.setFrame(94)
      if(this.counter > this.speed) this.counter = 0;
    }
}
