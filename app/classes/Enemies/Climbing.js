import { Enemie } from "../Base/Enemie.js";
import { FileManager } from "../../links/FileManager.js";
import { ENEMIE_CONSTANTS } from "../../enums and constants/enemies.js";

export class Climbing extends Enemie {
  constructor(game) {
    super();
    this.game = game;
    const { WIDTH, HEIGHT, SPEED_Y_OPTIONS, MAX_FRAME, IMAGE } =
      ENEMIE_CONSTANTS.CLIMBING;

    this.width = WIDTH;
    this.height = HEIGHT;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = 0;
    this.speedY =
      SPEED_Y_OPTIONS[Math.floor(Math.random() * SPEED_Y_OPTIONS.length)];
    this.maxFrame = MAX_FRAME;
    this.image = new FileManager().images[IMAGE];
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
    context.lineTo(
      this.x + this.width / 2,
      this.y + ENEMIE_CONSTANTS.CLIMBING.DRAW_LINE_OFFSET
    );
    context.stroke();
  }
}
