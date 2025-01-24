import { State } from "../base/State.js";
import { Fire } from "../effects/Fire.js";
import { Splash } from "../effects/Splash.js";

export class StateDiving extends State {
  constructor(game) {
    super(game, 5);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 6;
    this.game.player.vy = 15;
  }

  handlerInput(input) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );
    if (this.game.player.onGround()) {
      this.game.player.setState(this.states.RUNNING, 1);
      for (let i = 0; i < 25; i++) {
        this.game.particles.unshift(
          new Splash(
            this.game,
            this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height
          )
        );
      }
    } else if (
      this.keys.ANOTHERS_KEYS.some((key) => input.includes(key)) &&
      this.game.player.onGround()
    ) {
      this.game.player.setState(this.states.ROLLING, 2);
    }
  }
}
