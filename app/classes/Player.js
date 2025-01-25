import { KEYS } from "../enums and constants/keys.js";
import { StateSitting } from "./States/StateSitting.js";
import { StateRunning } from "./States/StateRunning.js";
import { StateJumping } from "./States/StateJumping.js";
import { StateFalling } from "./States/StateFalling.js";
import { StateRolling } from "./States/StateRolling.js";
import { StateDiving } from "./States/StateDiving.js";
import { StateHIT } from "./States/StateHIT.js";
import { CollisionAnimation } from "./CollisionAnimation.js";
import { FloatingMessage } from "./FloatingMessage.js";
import { FileManager } from "../links/FileManager.js";

const PLAYER_CONSTANTS = {
  SPEED: {
    INITIAL: 0,
    MAX: 10,
  },
  DIMENSIONS: {
    WIDTH: 100,
    HEIGHT: 91.3,
  },
  WEIGHT: 1,
  FPS: 60,
  SCORE_INCREMENT: 1,
  COLLISION_RADIUS: 0.5,
  LIVES_DECREMENT: 1,
};

export class Player {
  constructor(game) {
    this.game = game;
    this.speed = PLAYER_CONSTANTS.SPEED.INITIAL;
    this.maxSpeed = PLAYER_CONSTANTS.SPEED.MAX;
    this.width = PLAYER_CONSTANTS.DIMENSIONS.WIDTH;
    this.height = PLAYER_CONSTANTS.DIMENSIONS.HEIGHT;
    this.image = new FileManager().images.imageOfPlayer;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 0;
    this.vy = 0;
    this.weight = PLAYER_CONSTANTS.WEIGHT;
    this.fps = PLAYER_CONSTANTS.FPS;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.state = [
      new StateSitting(this.game),
      new StateRunning(this.game),
      new StateJumping(this.game),
      new StateFalling(this.game),
      new StateRolling(this.game),
      new StateDiving(this.game),
      new StateHIT(this.game),
    ];
    this.score = 0;
  }

  update(input, deltaTime) {
    this.checkCollision();
    this.currentState.handlerInput(input);
    this.horizontalMovement(input);
    this.verticalMovement(input);
    this.verticalBounds();
    this.spriteAnimation(deltaTime);
    this.handleCollisionSPrites(deltaTime);
  }

  draw(context) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  setState(state, speed) {
    this.currentState = this.state[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }

  horizontalMovement(input) {
    this.x += this.speed;
    if (
      KEYS.KEY_ARROW_RIGHT.some((key) => input.includes(key)) &&
      this.currentState !== this.state[6]
    )
      this.speed = this.maxSpeed;
    else if (
      KEYS.KEY_ARROW_LEFT.some((key) => input.includes(key)) &&
      this.currentState !== this.state[6]
    )
      this.speed = -this.maxSpeed;
    else this.speed = 0;
    this.restrictionHorizontalMovement();
  }

  restrictionHorizontalMovement() {
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
  }

  verticalMovement() {
    this.y += this.vy;
    if (!this.restrictionVerticalMovement()) this.vy += this.weight;
    else this.vy = 0;
  }

  restrictionVerticalMovement() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  spriteAnimation(deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else this.frameTimer += deltaTime;
  }

  onGround() {
    return this.restrictionVerticalMovement();
  }

  checkCollision() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markedForDeletion = true;
        this.game.collisions.push(
          new CollisionAnimation(
            this.game,
            enemy.x + enemy.width * PLAYER_CONSTANTS.COLLISION_RADIUS,
            enemy.y + enemy.height * PLAYER_CONSTANTS.COLLISION_RADIUS
          )
        );
        if (
          this.currentState === this.state[4] ||
          this.currentState === this.state[5]
        ) {
          this.game.score += PLAYER_CONSTANTS.SCORE_INCREMENT;
          this.game.floatingMessages.push(
            new FloatingMessage(
              `+${PLAYER_CONSTANTS.SCORE_INCREMENT}`,
              enemy.x,
              enemy.y,
              Math.floor(Math.random() * 360),
              50
            )
          );
        } else {
          this.setState(6, 0);
          this.game.lives -= PLAYER_CONSTANTS.LIVES_DECREMENT;
          if (this.game.lives <= 0) this.game.gameOver = true;
        }
      }
    });
  }

  verticalBounds() {
    if (this.y > this.game.height - this.height - this.game.groundMargin) {
      this.y = this.game.height - this.height - this.game.groundMargin;
    }
  }

  handleCollisionSPrites(deltaTime) {
    this.game.collisions.forEach((collision, index) => {
      collision.update(deltaTime);
      if (collision.markedForDeletion) this.game.collisions.splice(index, 1);
    });
  }
}
