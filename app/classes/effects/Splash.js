import { Particle } from "../Base/Particle.js";
import { FileManager } from "../../links/FileManager.js";
import { EFFECT_CONSTANTS } from "../../enums and constants/effects.js";

export class Splash extends Particle {
  constructor(game, x, y) {
    super(game);
    const {
      SIZE_MIN,
      SIZE_MAX,
      SPEED_X_MIN,
      SPEED_X_MAX,
      SPEED_Y_MIN,
      SPEED_Y_MAX,
      GRAVITY_INCREMENT,
      IMAGE,
    } = EFFECT_CONSTANTS.SPLASH;

    this.size = Math.random() * (SIZE_MAX - SIZE_MIN) + SIZE_MIN;
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.5;
    this.speedX = Math.random() * (SPEED_X_MAX - SPEED_X_MIN) + SPEED_X_MIN;
    this.speedY = Math.random() * (SPEED_Y_MAX - SPEED_Y_MIN) + SPEED_Y_MIN;
    this.gravity = 0;
    this.gravityIncrement = GRAVITY_INCREMENT;
    this.image = new FileManager().images[IMAGE];
  }

  update() {
    super.update();
    this.gravity += this.gravityIncrement;
    this.y += this.gravity;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}
