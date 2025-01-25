import { KEYS } from "../main/keys.js";

const INPUT_CONSTANTS = {
  DEBUG_KEY: "u",
  DEBUG_HOLD_TIME: 3000,
};

export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    this.uKeyHoldTimer = null;

    window.addEventListener("keydown", (e) => this.handleKeyEvent(e.key, true));
    window.addEventListener("keyup", (e) => this.handleKeyEvent(e.key, false));
  }

  initButtonCondition(event) {
    return (
      KEYS.KEY_ARROW_DOWN.includes(event) ||
      KEYS.KEY_ARROW_UP.includes(event) ||
      KEYS.KEY_ARROW_RIGHT.includes(event) ||
      KEYS.KEY_ARROW_LEFT.includes(event) ||
      KEYS.ANOTHERS_KEYS.includes(event) ||
      event === INPUT_CONSTANTS.DEBUG_KEY
    );
  }

  handleKeyEvent(eventKey, isKeyDown) {
    if (this.initButtonCondition(eventKey)) {
      if (eventKey === INPUT_CONSTANTS.DEBUG_KEY) {
        if (isKeyDown) {
          if (!this.uKeyHoldTimer) {
            this.uKeyHoldTimer = setTimeout(() => {
              this.game.debug = !this.game.debug;
            }, INPUT_CONSTANTS.DEBUG_HOLD_TIME);
          }
        } else {
          clearTimeout(this.uKeyHoldTimer);
          this.uKeyHoldTimer = null;
        }
      } else if (isKeyDown && this.keys.indexOf(eventKey) === -1) {
        this.keys.push(eventKey);
      } else if (!isKeyDown) {
        const index = this.keys.indexOf(eventKey);
        if (index !== -1) {
          this.keys.splice(index, 1);
        }
      }
    }
  }

  get arrayOfKeys() {
    return this.keys;
  }
}
