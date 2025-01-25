import { State } from "../base/State.js";
import { Fire } from "../effects/Fire.js";
import { PLAYER_STATE_CONSTANTS } from "../../enums and constants/states.js";

export class StateRolling extends State {
  constructor(game) {
    super(game, 4);
  }

  enter() {
    const { FRAME_X, MAX_FRAME, FRAME_Y } =
      PLAYER_STATE_CONSTANTS.FRAME.ROLLING;
    this.game.player.frameX = FRAME_X;
    this.game.player.maxFrame = MAX_FRAME;
    this.game.player.frameY = FRAME_Y;
  }

  handlerInput(input) {
    const { FIRE } = PLAYER_STATE_CONSTANTS.PARTICLE_OFFSETS;
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * FIRE.X,
        this.game.player.y + this.game.player.height * FIRE.Y
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
      this.game.player.vy += PLAYER_STATE_CONSTANTS.JUMP_VELOCITY;
    } else if (
      this.keys.KEY_ARROW_DOWN.some((key) => input.includes(key)) &&
      !this.game.player.onGround()
    ) {
      this.game.player.setState(this.states.DIVING, 0);
    }
  }
}
