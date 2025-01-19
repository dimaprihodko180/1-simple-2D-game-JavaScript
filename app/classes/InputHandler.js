import { KEYS_ENUMS } from "../enums/keys.js";

export class InputHandler {
  #keys = [];

  constructor() {
    window.addEventListener("keydown", (e) =>
      this.#handleKeyEvent(e.key, true)
    );
    window.addEventListener("keyup", (e) => this.#handleKeyEvent(e.key, false));
  }

  #initButtonCondition(event) {
    return (
      KEYS_ENUMS.KEY_ARROW_DOWN.includes(event) ||
      KEYS_ENUMS.KEY_ARROW_UP.includes(event) ||
      KEYS_ENUMS.KEY_ARROW_RIGHT.includes(event) ||
      KEYS_ENUMS.KEY_ARROW_LEFT.includes(event) ||
      KEYS_ENUMS.ANOTHERS_KEYS.includes(event)
    );
  }

  #handleKeyEvent(eventKey, isKeyDown) {
    if (this.#initButtonCondition(eventKey)) {
      if (isKeyDown && this.#keys.indexOf(eventKey) === -1) {
        this.#keys.push(eventKey);
      } else if (!isKeyDown) {
        const index = this.#keys.indexOf(eventKey);
        if (index !== -1) {
          this.#keys.splice(index, 1);
        }
      }
      console.log(`Key event: ${eventKey}, Keys: ${this.#keys}`);
    }
  }

  get arrayOfKeys() {
    return this.#keys;
  }
}
