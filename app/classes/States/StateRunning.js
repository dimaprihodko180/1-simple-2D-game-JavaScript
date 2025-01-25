import { State } from "../Base/State.js";
import { Dust } from "../effects/Dust.js";
import { PLAYER_STATE_CONSTANTS } from "../../enums and constants/states.js";

export class StateRunning extends State {
  constructor(game) {
    super(game, 1);
  }

  enter() {
    const { FRAME_X, MAX_FRAME, FRAME_Y } =
      PLAYER_STATE_CONSTANTS.FRAME.RUNNING;
    this.game.player.frameX = FRAME_X;
    this.game.player.maxFrame = MAX_FRAME;
    this.game.player.frameY = FRAME_Y;
  }

  handlerInput(input) {
    const { DUST } = PLAYER_STATE_CONSTANTS.PARTICLE_OFFSETS;
    this.game.particles.unshift(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.5 + DUST.X,
        this.game.player.y + this.game.player.height + DUST.Y
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
