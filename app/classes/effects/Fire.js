import { Particle } from "../Base/Particle.js";
import { FileManager } from "../../links/FileManager.js";
import { EFFECT_CONSTANTS } from "../../enums and constants/effects.js";

export class Fire extends Particle {
  constructor(game, x, y) {
    super(game);
    const { SIZE_MIN, SIZE_MAX, SPEED_X, SPEED_Y, VA_MIN, VA_MAX, IMAGE } =
      EFFECT_CONSTANTS.FIRE;

    this.image = new FileManager().images[IMAGE];
    this.size = Math.random() * (SIZE_MAX - SIZE_MIN) + SIZE_MIN;
    this.x = x;
    this.y = y;
    this.speedX = SPEED_X;
    this.speedY = SPEED_Y;
    this.angle = 0;
    this.va = Math.random() * (VA_MAX - VA_MIN) + VA_MIN;
  }

  update() {
    super.update();
    this.angle += this.va;
    this.x += Math.sin(this.angle * 5);
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(
      this.image,
      -this.size * 0.5,
      -this.size * 0.5,
      this.size,
      this.size
    );
    context.restore();
  }
}
