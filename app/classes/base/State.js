import { STATES } from "../../enums and constants/states.js";
import { KEYS } from "../../enums and constants/keys.js";

export class State {
  constructor(game, index) {
    this.game = game;
    this.state = Array.from(Object.keys(STATES))[index];
  }

  get keys() {
    return KEYS;
  }

  get states() {
    return STATES;
  }
}
