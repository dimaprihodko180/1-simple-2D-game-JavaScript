import { State } from "../base/State.js";

export class StateFalling extends State {
  constructor(game) {
    super(game, 3);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 2;
  }

  handlerInput() {
    if (this.game.player.onGround()) {
      this.game.player.setState(this.states.RUNNING, 1);
    }
  }
}
