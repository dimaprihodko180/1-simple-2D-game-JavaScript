import { State } from "../base/State.js";
import { Dust } from "../effects/Dust.js";

export class StateRunning extends State {
  constructor(game) {
    super(game, 1);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 8;
    this.game.player.frameY = 3;
  }

  handlerInput(input) {
    this.game.particles.unshift(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.5 - 40,
        this.game.player.y + this.game.player.height - 10
      )
    );
    if (this.keys.KEY_ARROW_DOWN.some((key) => input.includes(key))) {
      this.game.player.setState(this.states.SITTING, 0);
    } else if (this.keys.KEY_ARROW_UP.some((key) => input.includes(key))) {
      this.game.player.setState(this.states.JUMPING, 1);
    } else if (this.keys.ANOTHERS_KEYS.some((key) => input.includes(key))) {
      this.game.player.setState(this.states.ROLLING, 2);
    }
  }
}
