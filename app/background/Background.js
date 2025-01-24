import { Layer } from "./Layer.js";
import { FileManager } from "../links/FileManager.js";

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      0,
      new FileManager().images.layer1
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.2,
      new FileManager().images.layer2
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.4,
      new FileManager().images.layer3
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      0.8,
      new FileManager().images.layer4
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      2,
      new FileManager().images.layer5
    );
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
