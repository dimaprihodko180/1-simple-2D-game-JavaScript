import { CANVAS } from "../enums and constants/canvans.js";
import { Game } from "../classes/Game.js";

export function windowLoader() {
  window.addEventListener("DOMContentLoaded", () => {
    const game = new Game(CANVAS.WIDTH, CANVAS.HEIGHT);
    console.log(game);
    function animate() {
      CANVAS.CTX.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
      game.update();
      game.draw(CANVAS.CTX);
      requestAnimationFrame(animate);
    }
    animate();
  });
}
