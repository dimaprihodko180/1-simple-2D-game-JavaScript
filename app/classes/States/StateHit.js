import { State } from "../Base/State.js";
import { PLAYER_STATE_CONSTANTS } from "../../enums and constants/states.js";

export class StateHIT extends State {
  constructor(game) {
    super(game, 6);
  }

  enter() {
    const { FRAME_X, MAX_FRAME, FRAME_Y } = PLAYER_STATE_CONSTANTS.FRAME.HIT;
    this.game.player.frameX = FRAME_X;
    this.game.player.maxFrame = MAX_FRAME;
    this.game.player.frameY = FRAME_Y;
  }

  handlerInput() {
    if (
      this.game.player.frameX >= PLAYER_STATE_CONSTANTS.FRAME.HIT.MAX_FRAME &&
      this.game.player.onGround()
    ) {
      this.game.player.setState(this.states.RUNNING, 1);
    } else if (
      this.game.player.frameX >= PLAYER_STATE_CONSTANTS.FRAME.HIT.MAX_FRAME &&
      !this.game.player.onGround()
    ) {
      this.game.player.setState(this.states.FALLING, 1);
    }
  }
}
