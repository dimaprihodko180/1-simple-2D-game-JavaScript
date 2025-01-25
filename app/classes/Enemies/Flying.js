import { Enemie } from "../Base/Enemie.js";
import { FileManager } from "../../links/FileManager.js";
import { ENEMIE_CONSTANTS } from "../../enums and constants/enemies.js";

export class Flying extends Enemie {
  constructor(game) {
    super();
    this.game = game;
    const {
      WIDTH,
      HEIGHT,
      SPEED_X,
      ANGLE_VA_MIN,
      ANGLE_VA_MAX,
      MAX_FRAME,
      IMAGE,
    } = ENEMIE_CONSTANTS.FLYING;

    this.width = WIDTH;
    this.height = HEIGHT;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = SPEED_X;
    this.speedY = 0;
    this.maxFrame = MAX_FRAME;
    this.image = new FileManager().images[IMAGE];
    this.angle = 0;
    this.va = Math.random() * (ANGLE_VA_MAX - ANGLE_VA_MIN) + ANGLE_VA_MIN;
  }

  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}
