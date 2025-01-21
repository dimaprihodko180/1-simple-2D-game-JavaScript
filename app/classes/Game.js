import { Player } from "./Player.js";
import { InputHandler } from "./InputHandler.js";
import { Background } from "../background/Background.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.groundMargin = 80;
    this.speed = 3;
    this.background = this.#initBackground(this);
    this.player = this.#initPlayer(this);
    this.input = this.#initInputHandller();
  }

  update(deltaTime) {
    this.background.update();
    this.player.update(this.input.arrayOfKeys, deltaTime);
  }

  draw(context) {
    this.background.draw(context);
    this.player.draw(context);
  }

  #initPlayer(playerObject) {
    return new Player(playerObject);
  }

  #initInputHandller() {
    return new InputHandler();
  }

  #initBackground(backgroundObject) {
    return new Background(backgroundObject);
  }
}
