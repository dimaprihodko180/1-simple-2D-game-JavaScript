import { State } from "../base/State.js";

export class StateSitting extends State {
  constructor(player) {
    super(0);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 4;
    this.player.frameY = 5;
  }
  handlerInput(input) {
    if (
      this.keys.KEY_ARROW_LEFT.some((key) => input.includes(key)) ||
      this.keys.KEY_ARROW_RIGHT.some((key) => input.includes(key))
    ) {
      this.player.setState(this.states.RUNNING);
    }
  }
}
