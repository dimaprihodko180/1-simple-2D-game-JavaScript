import Layer from "./Layer.js"

import {
  backgroundLayer1,
  backgroundLayer2,
  backgroundLayer3,
  backgroundLayer4,
  backgroundLayer5,
} from "./srcImages.js"

export function initGameObject(ctx, kf, gameSpeed) {
  return [
    new Layer(ctx, backgroundLayer1, 1 * kf, gameSpeed),
    new Layer(ctx, backgroundLayer2, 2 * kf, gameSpeed),
    new Layer(ctx, backgroundLayer3, 3 * kf, gameSpeed),
    new Layer(ctx, backgroundLayer4, 4 * kf, gameSpeed),
    new Layer(ctx, backgroundLayer5, 5 * kf, gameSpeed),
  ]
}
