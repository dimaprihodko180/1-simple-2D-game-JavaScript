import { State } from "../base/State.js";
import { PLAYER_STATE_CONSTANTS } from "../../enums and constants/states.js";

export class StateSitting extends State {
  constructor(game) {
    super(game, 0);
  }

  enter() {
    const { FRAME_X, MAX_FRAME, FRAME_Y } =
      PLAYER_STATE_CONSTANTS.FRAME.SITTING;
    this.game.player.frameX = FRAME_X;
    this.game.player.maxFrame = MAX_FRAME;
    this.game.player.frameY = FRAME_Y;
  }

  handlerInput(input) {
    if (
      this.keys.KEY_ARROW_LEFT.some((key) => input.includes(key)) ||
      this.keys.KEY_ARROW_RIGHT.some((key) => input.includes(key))
    ) {
      this.game.player.setState(this.states.RUNNING, 1);
    } else if (this.keys.ANOTHERS_KEYS.some((key) => input.includes(key))) {
      this.game.player.setState(this.states.ROLLING, 2);
    }
  }
}
