import { ctx, CANVAS_WIDTH, CANVAS_HEIGHT } from "./canvas.js"
import { kf } from "./constants.js"
import { Layer } from "./Layer.js"
import {
  backgroundLayer1,
  backgroundLayer2,
  backgroundLayer3,
  backgroundLayer4,
  backgroundLayer5,
} from "./images.js"

export function initializeGame() {
  let gameSpeed = 15

  const gameObject = [
    new Layer(ctx, backgroundLayer1, 1 * kf),
    new Layer(ctx, backgroundLayer2, 2 * kf),
    new Layer(ctx, backgroundLayer3, 3 * kf),
    new Layer(ctx, backgroundLayer4, 4 * kf),
    new Layer(ctx, backgroundLayer5, 5 * kf),
  ]

  const slider = document.getElementById("slider")
  slider.value = gameSpeed
  const showGameSpeed = document.querySelector(".show-game-speed")
  showGameSpeed.innerHTML = gameSpeed

  slider.addEventListener("change", (e) => {
    gameSpeed = parseInt(e.target.value, 10)
    showGameSpeed.innerHTML = gameSpeed
  })

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    gameObject.forEach((object) => {
      object.update(gameSpeed)
      object.draw()
    })
    requestAnimationFrame(animate)
  }

  animate()
}
