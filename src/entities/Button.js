export class Button extends Phaser.GameObjects.Sprite {

    constructor (scene, mapX, mapY, color)
    {
        super(scene, mapX * 32, mapY * 32)
        this.name = "button"
        this.color = color
        this.setTexture('player')
        this.setOrigin(0,0)
        let colors = {
          blue:69,
          brown:64
        }
        this.frameBase = colors[color]
        this.setFrame(this.frameBase)
        this.setPosition(mapX * 32, mapY * 32)
        this.map = {
          x: mapX,
          y: mapY
        }
    }
    update() {
    }
}
