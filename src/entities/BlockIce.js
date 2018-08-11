import { Block } from '../entities/Block';
export class BlockIce extends Block {

    constructor (scene, mapX, mapY)
    {
        super(scene, mapX, mapY)
        this.setFrame(62)
        this.color = "blue"
        this.name = "blockice"
    }
    slide(direction) {
      this.catchable = false;
      this.sliding = direction;
    }
    update() {
      super.update()
    }
}
