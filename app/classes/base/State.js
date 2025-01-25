import { STATES } from "../../enums and constants/states.js";
import { KEYS } from "../../main/keys.js";
import { BASES_CONSTANTS } from "../../enums and constants/bases.js";

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
