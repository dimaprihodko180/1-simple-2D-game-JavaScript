import { State } from "../base/State.js";
import { Fire } from "../effects/Fire.js";

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
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );
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
    } else if (
      this.keys.KEY_ARROW_DOWN.some((key) => input.includes(key)) &&
      !this.game.player.onGround()
    ) {
      this.game.player.setState(this.states.DIVING, 0);
    }
  }
}
