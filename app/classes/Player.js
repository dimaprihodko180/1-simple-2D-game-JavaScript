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
  MAX_SPEED: 10,
  WIDTH: 100,
  HEIGHT: 91.3,
  FPS: 60,
  WEIGHT: 1,
  SCORE_INCREMENT: 1,
};

export class Player {
  constructor(game) {
    this.game = game;
    this.speed = 0;
    this.maxSpeed = PLAYER_CONSTANTS.MAX_SPEED;
    this.width = PLAYER_CONSTANTS.WIDTH;
    this.height = PLAYER_CONSTANTS.HEIGHT;
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
    this.state = this.initStates();
    this.score = 0;
  }

  update(input, deltaTime) {
    this.checkCollision();
    this.currentState.handlerInput(input);
    this.updateHorizontalMovement(input);
    this.updateVerticalMovement();
    this.applyVerticalBounds();
    this.animateSprite(deltaTime);
    this.updateCollisions(deltaTime);
  }

  updateHorizontalMovement(input) {
    this.x += this.speed;

    if (this.isMovingRight(input)) {
      this.speed = this.maxSpeed;
    } else if (this.isMovingLeft(input)) {
      this.speed = -this.maxSpeed;
    } else {
      this.speed = 0;
    }

    this.applyHorizontalBounds();
  }

  isMovingRight(input) {
    return (
      KEYS.KEY_ARROW_RIGHT.some((key) => input.includes(key)) &&
      this.currentState !== this.state[6]
    );
  }

  isMovingLeft(input) {
    return (
      KEYS.KEY_ARROW_LEFT.some((key) => input.includes(key)) &&
      this.currentState !== this.state[6]
    );
  }

  applyHorizontalBounds() {
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
  }

  updateVerticalMovement() {
    this.y += this.vy;
    if (!this.isOnGround()) {
      this.vy += this.weight;
    } else {
      this.vy = 0;
    }
  }

  isOnGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  applyVerticalBounds() {
    if (this.y > this.game.height - this.height - this.game.groundMargin) {
      this.y = this.game.height - this.height - this.game.groundMargin;
    }
  }

  animateSprite(deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      this.frameX = this.frameX < this.maxFrame ? this.frameX + 1 : 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  updateCollisions(deltaTime) {
    this.game.collisions.forEach((collision, index) => {
      collision.update(deltaTime);
      if (collision.markedForDeletion) {
        this.game.collisions.splice(index, 1);
      }
    });
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
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

  initStates() {
    return [
      new StateSitting(this.game),
      new StateRunning(this.game),
      new StateJumping(this.game),
      new StateFalling(this.game),
      new StateRolling(this.game),
      new StateDiving(this.game),
      new StateHIT(this.game),
    ];
  }

  checkCollision() {
    this.game.enemies.forEach((enemy) => {
      if (this.isCollidingWith(enemy)) {
        this.handleCollision(enemy);
      }
    });
  }

  isCollidingWith(enemy) {
    return (
      enemy.x < this.x + this.width &&
      enemy.x + enemy.width > this.x &&
      enemy.y < this.y + this.height &&
      enemy.y + enemy.height > this.y
    );
  }

  handleCollision(enemy) {
    enemy.markedForDeletion = true;
    this.game.collisions.push(
      new CollisionAnimation(
        this.game,
        enemy.x + enemy.width * 0.5,
        enemy.y + enemy.height * 0.5
      )
    );

    if (this.isAttackingState()) {
      this.game.score += PLAYER_CONSTANTS.SCORE_INCREMENT;
      this.game.floatingMessages.push(
        new FloatingMessage(
          "+1",
          enemy.x,
          enemy.y,
          Math.floor(Math.random() * 360),
          50
        )
      );
    } else {
      this.setState(6, 0);
      this.game.lives--;
      if (this.game.lives <= 0) {
        this.game.gameOver = true;
      }
    }
  }

  isAttackingState() {
    return (
      this.currentState === this.state[4] || this.currentState === this.state[5]
    );
  }
}
