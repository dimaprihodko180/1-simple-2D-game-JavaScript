import { Particle } from "../Base/Particle.js";
import { PARTICLE_CONSTANTS } from "../../enums and constants/effects.js";

export class Dust extends Particle {
  constructor(game, x, y) {
    super(game);
    const {
      SIZE_MIN,
      SIZE_MAX,
      SPEED_X_MIN,
      SPEED_X_MAX,
      SPEED_Y_MIN,
      SPEED_Y_MAX,
      COLOR,
    } = PARTICLE_CONSTANTS.DUST;

    this.size = Math.random() * (SIZE_MAX - SIZE_MIN) + SIZE_MIN;
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * (SPEED_X_MAX - SPEED_X_MIN) + SPEED_X_MIN;
    this.speedY = Math.random() * (SPEED_Y_MAX - SPEED_Y_MIN) + SPEED_Y_MIN;
    this.color = COLOR;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}
