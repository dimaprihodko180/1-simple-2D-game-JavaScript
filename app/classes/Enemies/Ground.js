import { Enemie } from "../base/Enemie.js";
import { FileManager } from "../../links/FileManager.js";
export class Ground extends Enemie {
  constructor(game) {
    super();
    this.game = game;
    this.width = 60;
    this.height = 87;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.speedX = 0;
    this.speedY = 0;
    this.maxFrame = 1;
    this.image = new FileManager().images.enemyPlant;
  }
}
