import { State } from "../base/State.js";

export class StateJumping extends State {
  constructor(player) {
    super(2);
    this.player = player;
  }

  enter() {
    if (this.player.onGround()) this.player.vy = -27;
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 1;
  }

  handlerInput() {
    if (this.player.vy > this.player.weight) {
      this.player.setState(this.states.FALLING);
    }
  }
}
