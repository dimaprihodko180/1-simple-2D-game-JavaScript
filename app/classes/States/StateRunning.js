import { State } from "../base/State.js";

export class StateRunning extends State {
  constructor(player) {
    super(1);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 3;
  }

  handlerInput(input) {
    if (this.keys.KEY_ARROW_DOWN.some((key) => input.includes(key))) {
      this.player.setState(this.states.SITTING, 0);
    } else if (this.keys.KEY_ARROW_UP.some((key) => input.includes(key))) {
      this.player.setState(this.states.JUMPING, 1);
    }
  }
}
