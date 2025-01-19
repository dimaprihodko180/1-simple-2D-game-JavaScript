/**@type {HTMLCanvasElement} */
import { imageOfPlayer } from "../enums/images.js";
import { KEYS_ENUMS } from "../enums/keys.js";

export class Player {
  #game;
  #x;
  #y;
  #width = 100;
  #height = 91.3;
  #image = imageOfPlayer;
  #speed = 0;
  #maxSpeed = 10;

  constructor(game) {
    this.#game = game;
    this.#x = 0;
    this.#y = this.#game.height - this.#height;
  }

  update(input) {
    this.#horizontalMovement(input);
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
    if (KEYS_ENUMS.KEY_ARROW_RIGHT.some((key) => input.includes(key)))
      this.#speed = this.#maxSpeed;
    else if (KEYS_ENUMS.KEY_ARROW_LEFT.some((key) => input.includes(key)))
      this.#speed = -this.#maxSpeed;
    else this.#speed = 0;
    this.#restrictionHorizontalMovemen();
  }

  #restrictionHorizontalMovemen() {
    if (this.#x < 0) this.#x = 0;
    if (this.#x > this.#game.width - this.#width)
      this.#x = this.#game.width - this.#width;
  }
}
