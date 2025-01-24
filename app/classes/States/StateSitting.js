import { State } from "../base/State.js";

export class StateSitting extends State {
  constructor(game) {
    super(game, 0);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 4;
    this.game.player.frameY = 5;
  }
  handlerInput(input) {
    if (
      this.keys.KEY_ARROW_LEFT.some((key) => input.includes(key)) ||
      this.keys.KEY_ARROW_RIGHT.some((key) => input.includes(key))
    ) {
      this.game.player.setState(this.states.RUNNING, 1);
    } else if (this.keys.ANOTHERS_KEYS.some((key) => input.includes(key))) {
      this.game.player.setState(this.states.ROLLING, 2);
    }
  }
}
