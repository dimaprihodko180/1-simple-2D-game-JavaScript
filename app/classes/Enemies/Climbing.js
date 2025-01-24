import { Enemie } from "../base/Enemie.js";
import { FileManager } from "../../links/FileManager.js";

export class Climbing extends Enemie {
  constructor(game) {
    super();
    this.game = game;
    this.width = 120;
    this.height = 144;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.maxFrame = 5;
    this.image = new FileManager().images.enemyBigSpider;
    this.markedForDeletion = false;
  }

  update(deltaTime) {
    super.update(deltaTime);
    if (this.y > this.game.height - this.height - this.game.groundMargin) {
      this.y = this.game.height - this.height - this.game.groundMargin;
      this.speedY *= -1;
    }

    if (this.y < -this.height) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    super.draw(context);
    context.beginPath();
    context.moveTo(this.x + this.width / 2, 0);
    context.lineTo(this.x + this.width / 2, this.y + 50);
    context.stroke();
  }
}
