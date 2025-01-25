import { BASES_CONSTANTS } from "../../enums and constants/bases.js";

export class Enemie {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = BASES_CONSTANTS.ENEMY.FPS;
    this.frameInterval = BASES_CONSTANTS.ENEMY.FRAME_INTERVAL;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }

  update(deltaTime) {
    this.movement(deltaTime);
    this.checkEnemyInScreen();
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  movement(deltaTime) {
    this.x -=
      this.speedX + this.game.speed * BASES_CONSTANTS.ENEMY.MOVEMENT_SPEED;
    this.y += this.speedY;

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    } else {
      this.frameTimer += deltaTime;
    }
  }

  checkEnemyInScreen() {
    if (this.x < -this.width) {
      this.markedForDeletion = true;
    }
  }
}
