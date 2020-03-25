import Phaser from 'phaser'
import MenuScene from './src/scenes/menu-scene';
import PreloadGameScene from './src/scenes/preload-game-scene';
import PlayGameScene from './src/scenes/play-game-scene';
import EndGameScene from './src/scenes/end-game-scene'

const preloadGame = new PreloadGameScene()
const menuScene = new MenuScene()
const endGame = new EndGameScene()
const playGame = new PlayGameScene()

const gameConfig = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    backgroundColor: 0x444444,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            }
        }
    },
   scene: [preloadGame, playGame, menuScene, endGame]
}

const index = new Phaser.Game(gameConfig);

