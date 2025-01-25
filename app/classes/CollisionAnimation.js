import { FileManager } from "../links/FileManager.js";

const COLLISION_ANIMATION_CONSTANTS = {
  SPRITE_WIDTH: 100,
  SPRITE_HEIGHT: 90,
  MIN_SIZE_MODIFIER: 0.5,
  MAX_SIZE_MODIFIER: 1.5,
  MAX_FRAME: 4,
  MIN_FPS: 5,
  MAX_FPS: 15,
};

export class CollisionAnimation {
  constructor(game, x, y) {
    this.game = game;
    this.image = new FileManager().images.boom;
    this.spriteWidth = COLLISION_ANIMATION_CONSTANTS.SPRITE_WIDTH;
    this.spriteHeight = COLLISION_ANIMATION_CONSTANTS.SPRITE_HEIGHT;
    this.sizeModifier =
      Math.random() *
        (COLLISION_ANIMATION_CONSTANTS.MAX_SIZE_MODIFIER -
          COLLISION_ANIMATION_CONSTANTS.MIN_SIZE_MODIFIER) +
      COLLISION_ANIMATION_CONSTANTS.MIN_SIZE_MODIFIER;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.frameX = 0;
    this.maxFrame = COLLISION_ANIMATION_CONSTANTS.MAX_FRAME;
    this.markedForDeletion = false;
    this.fps =
      Math.random() *
        (COLLISION_ANIMATION_CONSTANTS.MAX_FPS -
          COLLISION_ANIMATION_CONSTANTS.MIN_FPS) +
      COLLISION_ANIMATION_CONSTANTS.MIN_FPS;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    this.x -= this.game.speed;
    if (this.frameTimer > this.frameInterval) {
      this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if (this.frameX >= this.maxFrame) {
      this.markedForDeletion = true;
    }
  }
}
