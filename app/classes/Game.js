import { Player } from "./Player.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = this.#initPlayer(this);
  }

  update() {
    this.player.update();
  }

  draw(context) {
    this.player.draw(context);
  }

  #initPlayer(gameObject) {
    return new Player(gameObject);
  }
}
