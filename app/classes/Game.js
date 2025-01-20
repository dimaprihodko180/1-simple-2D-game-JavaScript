import { Player } from "./Player.js";
import { InputHandler } from "./InputHandler.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.groundMargin = 50;
    this.player = this.#initPlayer(this);
    this.input = this.#initInputHandller();
  }

  update(deltaTime) {
    this.player.update(this.input.arrayOfKeys, deltaTime);
  }

  draw(context) {
    this.player.draw(context);
  }

  #initPlayer(gameObject) {
    return new Player(gameObject);
  }

  #initInputHandller() {
    return new InputHandler();
  }
}
