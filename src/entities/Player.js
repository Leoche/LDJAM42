export class Player extends Phaser.GameObjects.Sprite {

    constructor (scene, mapX, mapY)
    {
        super(scene, mapX * 32, mapY * 32);
        this.setTexture('player');
        this.setPosition(mapX * 32, mapY * 32);
        this.mapX = mapX;
        this.mapY = mapY;
    }

}
