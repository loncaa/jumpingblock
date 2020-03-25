import Phaser from 'phaser'

class PreloadGameScene extends Phaser.Scene{
  constructor(){
    super("PreloadGameScene");
  }
  preload(){
    this.load.tilemapTiledJSON("level", "assets/arena_1.json");
    this.load.image("tile", "assets/tile.png");
    this.load.image("hero", "assets/hero.png");

    this.load.image("rblock", "assets/block2.png");
    this.load.image("yblock", "assets/block1.png");
  }
  create(){
    this.scene.start('MenuScene')
  }
}

export default PreloadGameScene