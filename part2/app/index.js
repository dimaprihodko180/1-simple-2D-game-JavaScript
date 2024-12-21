import { initGameObject } from "./utils/storageLayer.js"
import {
  canvas,
  ctx,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  gameSpeed,
  kf,
} from "./utils/root/property.js"
const gameObject = initGameObject(ctx, kf, gameSpeed)
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  gameObject.forEach((object) => {
    object.update()
    object.draw()
  })
  requestAnimationFrame(animate)
}
animate()
