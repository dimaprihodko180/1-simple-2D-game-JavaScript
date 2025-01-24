import { KEYS } from "../enums and constants/keys.js";

export class InputHandler {
  #keys = [];
  #uKeyHoldTimer = null;

  constructor(game) {
    this.game = game;
    window.addEventListener("keydown", (e) =>
      this.#handleKeyEvent(e.key, true)
    );
    window.addEventListener("keyup", (e) => this.#handleKeyEvent(e.key, false));
  }

  #initButtonCondition(event) {
    return (
      KEYS.KEY_ARROW_DOWN.includes(event) ||
      KEYS.KEY_ARROW_UP.includes(event) ||
      KEYS.KEY_ARROW_RIGHT.includes(event) ||
      KEYS.KEY_ARROW_LEFT.includes(event) ||
      KEYS.ANOTHERS_KEYS.includes(event) ||
      event === "u"
    );
  }

  #handleKeyEvent(eventKey, isKeyDown) {
    if (this.#initButtonCondition(eventKey)) {
      if (eventKey === "u") {
        if (isKeyDown) {
          if (!this.#uKeyHoldTimer) {
            this.#uKeyHoldTimer = setTimeout(() => {
              this.game.debug = !this.game.debug;
            }, 3000);
          }
        } else {
          clearTimeout(this.#uKeyHoldTimer);
          this.#uKeyHoldTimer = null;
        }
      } else if (isKeyDown && this.#keys.indexOf(eventKey) === -1) {
        this.#keys.push(eventKey);
      } else if (!isKeyDown) {
        const index = this.#keys.indexOf(eventKey);
        if (index !== -1) {
          this.#keys.splice(index, 1);
        }
      }
    }
  }

  get arrayOfKeys() {
    return this.#keys;
  }
}
