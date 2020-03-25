import Phaser from 'phaser';
import PlayGameScene from './play-game-scene';

const playGame = new PlayGameScene()

class MenuScene extends Phaser.Scene {

  constructor() {
    super('MenuScene');
  }

  create() {
    this.button = this.add.text(100, 100, 'Click to start!', {fill: '#0f0'});
    this.button.setInteractive({useHandCursor: true});

    this.button.on('pointerdown', () => {
      this.button.setStyle({fill: '#0ff'});
      this.cameras.main.fadeFrom(750, Phaser.Math.Between(50, 255),
          Phaser.Math.Between(50, 255), Phaser.Math.Between(50, 255));
    }).on('pointerover', () => {
      this.button.setStyle({fill: '#0ff'});
    }).on('pointerout', () => {
      this.button.setStyle({fill: '#0f0'});
    });

    this.cameras.main.on('camerafadeincomplete', function() {

      this.scene.start('PlayGame')

    }, this);
  }

  update() {

  }
}

export default MenuScene;