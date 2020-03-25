import Phaser from 'phaser';
import Hero from '../entities/hero';
import Block from '../entities/block';
import {STOP_TILE} from '../config';

const textStyle = {
  fontSize: '48px',
  fill: '#0f0',
  align: 'center',
  lineSpacing: 44,
};

class PlayGameScene extends Phaser.Scene {
  constructor() {
    super('PlayGame');
  }

  create() {
    // creation of "level" tilemap
    this.map = this.make.tilemap({key: 'level'});

    // adding tiles to tilemap
    let tile = this.map.addTilesetImage('tileset01', 'tile');

    // which layers should we render? That's right, "layer01"
    this.layer = this.map.createStaticLayer('layer01', tile);

    // which tiles will collide? Tiles from 1 to 3
    this.layer.setCollisionBetween(1, 3);

    this.blocksLayer = this.map.createDynamicLayer('blocksLayer', tile);
    this.blocks = Array.isArray(this.blocks) ? this.blocks : [];
    this.blocksLayer.forEachTile(tile => {

      if (tile.index === STOP_TILE) {
        let block = new Block(tile.pixelX + tile.width / 2,
            tile.pixelY + tile.height / 2, this.map.scene);
        this.blocks.push(block);
        this.map.removeTileAt(tile.x, tile.y, this.blocksLayer);
      }
    });

    this.maxScore = this.blocks.length;
    this.score = 0;

    const spawnPoint = this.map.findObject('spawn',
        obj => obj.name === 'Spawn Point');
    // adding the hero sprite and enabling ARCADE physics for the hero
    this.hero = new Hero(spawnPoint.x, spawnPoint.y, this.map.scene);

    // set workd bounds to allow camera to follow the player
    this.cameras.main.setBounds(0, 0, this.layer.width, this.layer.height);

    this.cameras.main.centerOn(this.layer.width / 2, this.layer.height / 2);

    this.isCounting = true;
    this.time = 0;
    this.button = this.add.text(this.layer.width / 2, this.layer.height / 8,
        'SCORE', textStyle);

    this.registerInputEvents();
  }

  /*destroyScene() {
    this.hero.destroy();
    this.hero = null;

    this.blocks.forEach(b => b.destroy());
    this.blocks = null;

    this.physics.destroy();
  }*/

  update() {
    if (this.hero) {
      this.hero.update();
    }

    if (this.blocks) {
      this.blocks.map(block => block.update());
    }

    if (this.isCounting) {
      this.time = this.time + 0.1;
      this.button.setText(`${Math.round(this.time)}`);
    }

  }

  registerInputEvents() {

    // waiting for player inputs
    this.input.on('pointerdown', () => this.hero.handleJump(), this);

    this.cameras.main.on('camerafadeoutcomplete', function() {
      this.scene.start('EndGameScene', {score: Math.round(this.time), colors: this.colors});
    }, this);
  }

  sceneFade() {

    this.isCounting = false;

    //  Get a random color
    var red = Phaser.Math.Between(50, 255);
    var green = Phaser.Math.Between(50, 255);
    var blue = Phaser.Math.Between(50, 255);

    this.colors = {red, green, blue};

    this.cameras.main.fade(75, red, green, blue);
  }
}

export default PlayGameScene;