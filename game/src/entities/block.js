import Phaser from 'phaser';
import {gameOptions} from '../config';

class Block extends Phaser.Physics.Arcade.Sprite {

  constructor(x, y, scene) {
    super(scene, x, y, 'rblock');

    this.scene = scene;
    this.isTouched = false;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setImmovable(true);
  }

  handleCollide(box, hero) {
    // should the player stop?
    hero.shouldStop = false;

    let blockedLeft = hero.body.touching.left;
    let blockedRight = hero.body.touching.right;
    let blockedDown = hero.body.blocked.down;
    let boxBlockedUp = box.body.touching.up;

    if (boxBlockedUp) {
      hero.shouldStop = true;
      hero.onWall = true;

      if (!box.isTouched) {
        box.isTouched = true;
        box.body.gameObject.setTexture('yblock');

        box.scene.score++;

        if(box.scene.score === box.scene.maxScore) {
          console.log('ENDE')

          box.scene.sceneFade();
        }
      }
    }

    // hero on the ground and touching a wall on the right
    if (blockedRight) {

      // horizontal flipping hero sprite
      hero.flipX = true;
    }

    // hero on the ground and touching a wall on the right
    if (blockedLeft) {

      // default orientation of hero sprite
      hero.flipX = false;
    }

    // hero NOT on the ground and touching a wall
    if ((blockedRight || blockedLeft) && !blockedDown) {

      // hero on a wall
      // hero is physics object
      hero.onWall = true;

      // remove gravity
      hero.body.gravity.y = 0;

      // setting new y velocity
      hero.body.velocity.y = gameOptions.playerGrip;
    }

    // adjusting hero speed according to the direction it's moving
    hero.setPlayerXVelocity(!hero.onWall || blockedDown, hero.shouldStop);
  }

  update() {
    this.scene.physics.world.collide(this, this.scene.hero, this.handleCollide, null, false);
  }
}

export default Block;