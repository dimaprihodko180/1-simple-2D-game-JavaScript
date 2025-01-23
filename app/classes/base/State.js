import { STATES } from "../../enums and constants/states.js";
import { KEYS } from "../../enums and constants/keys.js";
import { Dust } from "../effects/Dust.js";

export class State {
  constructor(game, index) {
    this.game = game;
    this.state = Array.from(Object.keys(STATES))[index];
  }

  initDust() {
    return new Dust(this.game, this.game.player.x, this.game.player.y);
  }

  get keys() {
    return KEYS;
  }

  get states() {
    return STATES;
  }
}
