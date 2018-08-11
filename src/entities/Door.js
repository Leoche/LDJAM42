export class Door extends Phaser.GameObjects.Sprite {

    constructor (scene, mapX, mapY, color)
    {
        super(scene, mapX * 32, mapY * 32)
        this.name = "door"
        this.color = color
        this.setTexture('player')
        this.setOrigin(0,0)
        this.colors = {
          blue:86,
          brown:56
        }
        this.frameBase = this.colors[color]
        this.setFrame(this.frameBase)
        this.setPosition(mapX * 32, mapY * 32)
        this.map = {
          x: mapX,
          y: mapY
        }
        this.open = false;
        this.counter = 0
    }
    setOpen(opened) {
      this.open = opened;
    }
    update() {
      if (this.open && this.frameBase !== this.colors[this.color] + 3) {
        this.counter+=.1;
      } else if (!this.open && this.counter>0){
        this.counter-=.1;
      }
      if(this.counter < 0) this.counter = 0
      if(this.counter > 3) this.counter = 3
      this.setFrame(this.colors[this.color] + Math.floor(this.counter))
    }
}
