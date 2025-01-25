import { Enemie } from "../Base/Enemie.js";
import { FileManager } from "../../links/FileManager.js";
import { ENEMIE_CONSTANTS } from "../../enums and constants/enemies.js";

export class Ground extends Enemie {
  constructor(game) {
    super();
    this.game = game;
    const { WIDTH, HEIGHT, SPEED_X, SPEED_Y, MAX_FRAME, IMAGE } =
      ENEMIE_CONSTANTS.GROUND;

    this.width = WIDTH;
    this.height = HEIGHT;
    this.x = this.game.width;
    this.y = this.game.height - HEIGHT - this.game.groundMargin;
    this.speedX = SPEED_X;
    this.speedY = SPEED_Y;
    this.maxFrame = MAX_FRAME;
    this.image = new FileManager().images[IMAGE];
  }
}
