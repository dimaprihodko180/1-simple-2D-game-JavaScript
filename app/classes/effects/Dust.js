import { Particle } from "../base/Particle.js";

export class Dust extends Particle {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 10 + 15;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();

    setInterval(() => {
      this.color = `rgba(0, 0, 0, 0.2)`;
    });
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}
