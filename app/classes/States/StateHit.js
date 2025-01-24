import { State } from "../base/State.js";

export class StateHIT extends State {
  constructor(game) {
    super(game, 6);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 10;
    this.game.player.frameY = 4;
  }

  handlerInput() {
    if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
      this.game.player.setState(this.states.RUNNING, 1);
    } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
      this.game.player.setState(this.states.FALLING, 1);
    }
  }
}
