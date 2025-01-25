import { CANVAS } from "./canvans.js";
import { Game } from "../Classes/Game.js";

export function windowLoader() {
  window.addEventListener("DOMContentLoaded", () => {
    const game = new Game(CANVAS.WIDTH, CANVAS.HEIGHT);
    let lastTime = 0;

    function animate(timeStamp) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      CANVAS.CTX.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
      game.update(deltaTime);
      game.draw(CANVAS.CTX);
      if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
  });
}
