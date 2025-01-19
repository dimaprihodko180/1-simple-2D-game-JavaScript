import { CANVAS_ENUMS } from "../enums/canvans.js";
import { Game } from "../classes/Game.js";

export function windowLoader() {
  window.addEventListener("DOMContentLoaded", () => {
    const game = new Game(CANVAS_ENUMS.WIDTH, CANVAS_ENUMS.HEIGHT);
    console.log(game);
    function animate() {
      CANVAS_ENUMS.CTX.clearRect(0, 0, CANVAS_ENUMS.WIDTH, CANVAS_ENUMS.HEIGHT);
      game.update();
      game.draw(CANVAS_ENUMS.CTX);
      requestAnimationFrame(animate);
    }
    animate();
  });
}
