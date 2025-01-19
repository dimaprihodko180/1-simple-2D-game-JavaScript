/**@type {HTMLCanvasElement} */
import { KEYS } from "../enums and constants/keys.js";
import { imageOfPlayer } from "../enums and constants/images.js";
import { StateSitting } from "./StateSitting.js";
import { StateRunning } from "./StateRunning.js";

export class Player {
  #game;

  #x;
  #speed = 0;
  #maxSpeed = 10;

  #y;
  #vy = 0;
  #weight = 1;

  #width = 100;
  #height = 91.3;
  #image = imageOfPlayer;

  #state = [new StateSitting(this), new StateRunning(this)];
  #currentState = this.#state[0];

  constructor(game) {
    this.#game = game;
    this.#x = 0;
    this.#y = this.#game.height - this.#height;
    this.#currentState.enter();
    this.frameX = 0;
    this.frameY = 0;
  }

  update(input) {
    this.#currentState.handlerInput(input);
    this.#horizontalMovement(input);
    this.#verticalMovement(input);
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
    this.#currentState = this.#state[state];
    this.#currentState.enter();
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

  #verticalMovement(input) {
    if (
      KEYS.KEY_ARROW_UP.some((key) => input.includes(key)) &&
      this.#restrictionVerticalMovemen()
    )
      this.#vy -= 30;
    this.#y += this.#vy;
    if (!this.#restrictionVerticalMovemen()) this.#vy += this.#weight;
    else this.#vy = 0;
  }

  #restrictionVerticalMovemen() {
    return this.#y >= this.#game.height - this.#height;
  }
}
