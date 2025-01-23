import { State } from "../base/State.js";

export class StateRolling extends State {
  constructor(player) {
    super(4);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 6;
  }

  handlerInput(input) {
    if (
      !this.keys.ANOTHERS_KEYS.some((key) => input.includes(key)) &&
      this.player.onGround()
    ) {
      this.player.setState(this.states.RUNNING, 1);
    } else if (
      !this.keys.ANOTHERS_KEYS.some((key) => input.includes(key)) &&
      !this.player.onGround()
    ) {
      this.player.setState(this.states.FALLING, 1);
    } else if (
      this.keys.ANOTHERS_KEYS.some((key) => input.includes(key)) &&
      this.keys.KEY_ARROW_UP.some((key) => input.includes(key)) &&
      this.player.onGround()
    ) {
      this.player.vy -= 27;
      // this.player.setState(this.states.FALLING, 1);
    }
  }
}
