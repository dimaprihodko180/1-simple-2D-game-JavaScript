/**@type {HTMLCanvasElement} */
import { imageOfPlayer } from "../constants/images.js";

export class Player {
  #game;
  #x;
  #y;
  #width = 100;
  #height = 91.3;
  #image = imageOfPlayer;

  constructor(game) {
    this.#game = game;
    this.#x = 0;
    this.#y = this.#game.height - this.#height;
  }

  update() {
    this.#x++;
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
}
