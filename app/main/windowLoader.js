import { CANVAS } from "../enums and constants/canvans.js";
import { Game } from "../classes/Game.js";

export function windowLoader() {
  window.addEventListener("load", () => {
    const game = new Game(CANVAS.WIDTH, CANVAS.HEIGHT);
    let lastTime = 0;

    function animate(timeStamp) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      CANVAS.CTX.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
      game.update(deltaTime);
      game.draw(CANVAS.CTX);
      requestAnimationFrame(animate);
    }
    animate(0);
  });
}
