/**@type {HTMLCanvasElement} */
import { imageOfPlayer } from "../enums and constants/images.js";
import { KEYS } from "../enums and constants/keys.js";

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

  constructor(game) {
    this.#game = game;
    this.#x = 0;
    this.#y = this.#game.height - this.#height;
  }

  update(input) {
    this.#horizontalMovement(input);
    this.#verticalMovement(input);
  }

  draw(context) {
    context.drawImage(
      this.#image,
      0,
      0,
      this.#width,
      this.#height,
      this.#x,
      this.#y,
      this.#width,
      this.#height
    );
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
