import Phaser from 'phaser';

const textStyle = {
  fontSize: '48px',
  fill: '#0f0',
  align: 'center',
  lineSpacing: 44,
}

class EndGameScene extends Phaser.Scene{

  constructor() {
    super('EndGameScene')
  }


  init(data){
    this.score = data.score
    this.colors = data.colors
  }

  create(){
    this.cameras.main.setBackgroundColor(`rgba(${this.colors.red}, ${this.colors.green}, ${this.colors.blue}, 0.7)`)
    this.add.text(100, 100, `Your score is ${this.score}`, textStyle);

    this.input.on('pointerdown', () => {
      this.scene.remove('PlayGame')

      this.scene.start('MenuScene')
    }, this);
  }
}

export default EndGameScene