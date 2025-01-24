import { Enemie } from "../base/Enemie.js";
import { FileManager } from "../../links/FileManager.js";

export class Flying extends Enemie {
  constructor(game) {
    super();
    this.game = game;
    this.width = 60;
    this.height = 44;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = 2;
    this.speedY = 0;
    this.maxFrame = 5;
    this.image = new FileManager().images.enemyFly;
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}
