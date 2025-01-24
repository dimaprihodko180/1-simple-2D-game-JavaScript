import { Layer } from "./Layer.js";
import { layer1, layer2, layer3, layer4, layer5 } from "../images.js";

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    this.layer1 = new Layer(this.game, this.width, this.height, 0, layer1);
    this.layer2 = new Layer(this.game, this.width, this.height, 0.2, layer2);
    this.layer3 = new Layer(this.game, this.width, this.height, 0.4, layer3);
    this.layer4 = new Layer(this.game, this.width, this.height, 0.8, layer4);
    this.layer5 = new Layer(this.game, this.width, this.height, 2, layer5);
    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];
  }

  update() {
    this.backgroundLayers.forEach((layer) => layer.update());
  }

  draw(context) {
    this.backgroundLayers.forEach((layer) => layer.draw(context));
  }
}
