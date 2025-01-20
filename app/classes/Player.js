/**@type {HTMLCanvasElement} */
import { KEYS } from "../enums and constants/keys.js";
import { imageOfPlayer } from "../enums and constants/images.js";
import { StateSitting } from "./StateSitting.js";
import { StateRunning } from "./StateRunning.js";
import { StateJumping } from "./StateJumping.js";
import { StateFalling } from "./StateFalling.js";

export class Player {
  #game;

  #x;
  #speed = 0;
  #maxSpeed = 10;

  #y;

  #width = 100;
  #height = 91.3;
  #image = imageOfPlayer;

  #state;

  constructor(game) {
    this.#game = game;
    this.#x = 0;
    this.#y = this.#game.height - this.#height - this.#game.groundMargin;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame;
    this.vy = 0;
    this.weight = 1;
    this.fps = 60;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.#state = [
      new StateSitting(this),
      new StateRunning(this),
      new StateJumping(this),
      new StateFalling(this),
    ];
    this.currentState = this.#state[0];
    this.currentState.enter();
  }

  update(input, deltaTime) {
    this.currentState.handlerInput(input);
    this.#horizontalMovement(input);
    this.#verticalMovement(input);
    this.#spriteAnimation(deltaTime);
  }

  draw(context) {
    context.drawImage(
      this.#image,
      this.frameX * this.#width,
      this.frameY * this.#height,
      this.#width,
      this.#height,
      this.#x,
      this.#y,
      this.#width,
      this.#height
    );
  }

  setState(state) {
    this.currentState = this.#state[state];
    this.currentState.enter();
  }

  #horizontalMovement(input) {
    this.#x += this.#speed;
    if (KEYS.KEY_ARROW_RIGHT.some((key) => input.includes(key)))
      this.#speed = this.#maxSpeed;
    else if (KEYS.KEY_ARROW_LEFT.some((key) => input.includes(key)))
      this.#speed = -this.#maxSpeed;
    else this.#speed = 0;
    this.#restrictionHorizontalMovemen();
  }

  #restrictionHorizontalMovemen() {
    if (this.#x < 0) this.#x = 0;
    if (this.#x > this.#game.width - this.#width)
      this.#x = this.#game.width - this.#width;
  }

  #verticalMovement() {
    this.#y += this.vy;
    if (!this.#restrictionVerticalMovemen()) this.vy += this.weight;
    else this.vy = 0;
  }

  #restrictionVerticalMovemen() {
    return (
      this.#y >= this.#game.height - this.#height - this.#game.groundMargin
    );
  }

  #spriteAnimation(deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else this.frameTimer += deltaTime;
  }

  onGround() {
    return this.#restrictionVerticalMovemen();
  }
}
