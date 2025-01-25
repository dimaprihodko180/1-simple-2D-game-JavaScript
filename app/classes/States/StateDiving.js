import { State } from "../Base/State.js";
import { Fire } from "../effects/Fire.js";
import { Splash } from "../effects/Splash.js";
import { PLAYER_STATE_CONSTANTS } from "../../enums and constants/states.js";

export class StateDiving extends State {
  constructor(game) {
    super(game, 5);
  }

  enter() {
    const { FRAME_X, MAX_FRAME, FRAME_Y } = PLAYER_STATE_CONSTANTS.FRAME.DIVING;
    this.game.player.frameX = FRAME_X;
    this.game.player.maxFrame = MAX_FRAME;
    this.game.player.frameY = FRAME_Y;
    this.game.player.vy = PLAYER_STATE_CONSTANTS.DIVING_VELOCITY;
  }

  handlerInput(input) {
    const { FIRE, SPLASH } = PLAYER_STATE_CONSTANTS.PARTICLE_OFFSETS;

    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * FIRE.X,
        this.game.player.y + this.game.player.height * FIRE.Y
      )
    );

    if (this.game.player.onGround()) {
      this.game.player.setState(this.states.RUNNING, 1);

      for (let i = 0; i < PLAYER_STATE_CONSTANTS.SPLASH_COUNT; i++) {
        this.game.particles.unshift(
          new Splash(
            this.game,
            this.game.player.x + this.game.player.width * SPLASH.X,
            this.game.player.y + this.game.player.height * SPLASH.Y
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
