import { State } from "../base/State.js";

export class StateRolling extends State {
  constructor(game) {
    super(game, 4);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 6;
  }

  handlerInput(input) {
    if (
      !this.keys.ANOTHERS_KEYS.some((key) => input.includes(key)) &&
      this.game.player.onGround()
    ) {
      this.game.player.setState(this.states.RUNNING, 1);
    } else if (
      !this.keys.ANOTHERS_KEYS.some((key) => input.includes(key)) &&
      !this.game.player.onGround()
    ) {
      this.game.player.setState(this.states.FALLING, 1);
    } else if (
      this.keys.ANOTHERS_KEYS.some((key) => input.includes(key)) &&
      this.keys.KEY_ARROW_UP.some((key) => input.includes(key)) &&
      this.game.player.onGround()
    ) {
      this.game.player.vy -= 27;
    }
  }
}
