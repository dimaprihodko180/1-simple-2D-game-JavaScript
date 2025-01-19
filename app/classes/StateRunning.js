import { State } from "./base/State.js";

export class StateRunning extends State {
  #player;
  constructor(player) {
    super(1);
    this.#player = player;
  }

  enter() {
    this.#player.frameY = 5;
  }

  handlerInput(input) {
    if (this.keys.KEY_ARROW_DOWN.some((key) => input.includes(key))) {
      this.#player.setState(this.states.SITTING);
    }
  }
}
