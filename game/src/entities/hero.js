import Phaser from 'phaser'
import {gameOptions, STOP_TILE, TRAMPOLINE_TILE} from '../config';

class Hero extends Phaser.Physics.Arcade.Sprite{

  constructor(x,y, scene){
    super(scene, x, y, "hero")
    // adding the hero sprite and enabling ARCADE physics for the hero

    this.scene = scene;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // setting hero horizontal speed
    this.body.velocity.x = gameOptions.playerSpeed;

    // the hero can jump
    this.canJump = true;

    // the hern cannot double jump
    this.canDoubleJump = false;

    // the hero is not on the wall
    this.onWall = false;
  }

  update(){
    // set some default gravity values. Look at the function for more information
    this.setDefaultValues();

    // handling collision between the hero and the tiles
    this.scene.physics.world.collide(this, this.scene.layer, this.handleCollide, null, this);

    // saving current vertical velocity
    this.previousYVelocity = this.body.velocity.y;
  }

  // default values to be set at the beginning of each update cycle,
  // which may be changed according to what happens into "collide" callback function
  // (if called)
  setDefaultValues(){
    this.body.gravity.y = gameOptions.playerGravity;
    this.onWall = false;
    this.setPlayerXVelocity(true);
  }

  // sets player velocity according to the direction it's facing, unless "defaultDirection"
  // is false, in this case multiplies the velocity by -1
  // if stopIt is true, just stop the player
  setPlayerXVelocity(defaultDirection, stopIt){
    if(stopIt){
      this.body.velocity.x = 0;
    }
    else{
      this.body.velocity.x = gameOptions.playerSpeed * (this.flipX ? -1 : 1) * (defaultDirection ? 1 : -1);
    }
  }

  handleJump(){
    // the hero can jump when:
    // canJump is true AND the hero is on the ground (blocked.down)
    // OR
    // the hero is on the wall
    if((this.canJump && this.body.blocked.down) || this.onWall){

      // applying jump force
      this.body.velocity.y = -gameOptions.playerJump;

      // is the hero on a wall?
      if(this.onWall){

        // change the horizontal velocity too. This way the hero will jump off the wall
        this.setPlayerXVelocity(true);
      }

      // hero can't jump anymore
      this.canJump = false;

      // hero is not on the wall anymore
      this.onWall = false;

      // the hero can now double jump
      this.canDoubleJump = true;
    }
    else{

      // cam the hero make the doubple jump?
      if(this.canDoubleJump){

        // the hero can't double jump anymore
        this.canDoubleJump = false;

        // applying double jump force
        this.body.velocity.y = -gameOptions.playerDoubleJump;
      }
    }
  }

  handleCollide(hero, layer) {

    // should the player stop?
    this.shouldStop = false;

    // some temporary variables to determine if the player is blocked only once
    let blockedDown = hero.body.blocked.down;
    let blockedLeft = hero.body.blocked.left
    let blockedRight = hero.body.blocked.right;

    // if the hero hits something, no double jump is allowed
    this.canDoubleJump = false;

    if(blockedDown){

      // hero can jump
      this.canJump = true;
    }

    // hero on the ground and touching a wall on the right
    if(blockedRight){

      // horizontal flipping hero sprite
      hero.flipX = true;
    }

    // hero on the ground and touching a wall on the right
    if(blockedLeft){

      // default orientation of hero sprite
      hero.flipX = false;
    }

    // hero NOT on the ground and touching a wall
    if((blockedRight || blockedLeft) && !blockedDown){

      // hero on a wall
      // hero is physics object
      hero.onWall = true;

      // remove gravity
      hero.body.gravity.y = 0;

      // setting new y velocity
      hero.body.velocity.y = gameOptions.playerGrip;
    }

    // adjusting hero speed according to the direction it's moving
    this.setPlayerXVelocity(!this.onWall || blockedDown, this.shouldStop);
  }

}

export default Hero