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

  handlerInput(input) {
    if (this.game.player.onGround(input)) {
      this.game.player.setState(this.states.RUNNING, 1);
    } else if (this.keys.KEY_ARROW_DOWN.some((key) => input.includes(key))) {
      this.game.player.setState(this.states.DIVING, 0);
    }
  }
}
