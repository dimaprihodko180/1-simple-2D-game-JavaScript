import { BASES_CONSTANTS } from "../../enums and constants/bases.js";

export class Particle {
  constructor(game) {
    this.game = game;
    this.markedForDeletion = false;
  }

  update() {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= BASES_CONSTANTS.PARTICLE.SIZE_DECREASE_RATE;
    if (this.size < BASES_CONSTANTS.PARTICLE.MIN_SIZE) {
      this.markedForDeletion = true;
    }
  }
}
