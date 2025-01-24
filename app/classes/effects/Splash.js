import { Particle } from "../base/Particle.js";
import { FileManager } from "../../links/FileManager.js";

export class Splash extends Particle {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 100 + 100;
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.5;
    this.speedX = Math.random() * 6 - 4;
    this.speedY = Math.random() * 2 + 2;
    this.gravity = 0;
    this.image = new FileManager().images.fire;
  }
  update() {
    super.update();
    this.gravity += 0.1;
    this.y += this.gravity;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}
