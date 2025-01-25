import { State } from "../Base/State.js";
import { PLAYER_STATE_CONSTANTS } from "../../enums and constants/states.js";

export class StateFalling extends State {
  constructor(game) {
    super(game, 3);
  }

  enter() {
    const { FRAME_X, MAX_FRAME, FRAME_Y } =
      PLAYER_STATE_CONSTANTS.FRAME.FALLING;
    this.game.player.frameX = FRAME_X;
    this.game.player.maxFrame = MAX_FRAME;
    this.game.player.frameY = FRAME_Y;
  }

  handlerInput(input) {
    if (this.game.player.onGround(input)) {
      this.game.player.setState(this.states.RUNNING, 1);
    } else if (this.keys.KEY_ARROW_DOWN.some((key) => input.includes(key))) {
      this.game.player.setState(this.states.DIVING, 0);
    }
  }
}
