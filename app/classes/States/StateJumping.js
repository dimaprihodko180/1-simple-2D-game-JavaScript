import { State } from "../base/State.js";
import { PLAYER_STATE_CONSTANTS } from "../../enums and constants/states.js";

export class StateJumping extends State {
  constructor(game) {
    super(game, 2);
  }

  enter() {
    if (this.game.player.onGround()) {
      this.game.player.vy = PLAYER_STATE_CONSTANTS.JUMP_VELOCITY;
    }
    const { FRAME_X, MAX_FRAME, FRAME_Y } =
      PLAYER_STATE_CONSTANTS.FRAME.JUMPING;
    this.game.player.frameX = FRAME_X;
    this.game.player.maxFrame = MAX_FRAME;
    this.game.player.frameY = FRAME_Y;
  }

  handlerInput(input) {
    if (this.game.player.vy > this.game.player.weight) {
      this.game.player.setState(this.states.FALLING, 1);
    } else if (this.keys.ANOTHERS_KEYS.some((key) => input.includes(key))) {
      this.game.player.setState(this.states.ROLLING, 2);
    } else if (this.keys.KEY_ARROW_DOWN.some((key) => input.includes(key))) {
      this.game.player.setState(this.states.DIVING, 0);
    }
  }
}
