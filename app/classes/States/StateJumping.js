import { State } from "../base/State.js";

export class StateJumping extends State {
  constructor(game) {
    super(game, 2);
  }

  enter() {
    if (this.game.player.onGround()) this.game.player.vy = -27;
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 1;
  }

  handlerInput(input) {
    if (this.game.player.vy > this.game.player.weight) {
      this.game.player.setState(this.states.FALLING, 1);
    } else if (this.keys.ANOTHERS_KEYS.some((key) => input.includes(key))) {
      this.game.player.setState(this.states.ROLLING, 2);
    }
  }
}
