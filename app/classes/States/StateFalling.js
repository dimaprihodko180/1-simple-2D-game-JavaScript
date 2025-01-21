import { State } from "../base/State.js";

export class StateFalling extends State {
  constructor(player) {
    super(3);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 2;
  }

  handlerInput() {
    if (this.player.onGround()) {
      this.player.setState(this.states.RUNNING);
    }
  }
}
