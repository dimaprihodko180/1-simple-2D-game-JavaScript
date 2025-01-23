import { Particle } from "../base/Particle.js";

export class Splash extends Particle {
  constructor(game, x, y) {
    super(game, x, y, 5, 0, 0);
    this.image = game.dustImage;
    this.frame = Math.floor(Math.random() * 3);
  }
}
