import { Image } from "./Image.js";
import { Sounds } from "./Sounds.js";

export class FileManager {
  #image = new Image();
  #sounds = new Sounds();
  constructor() {}
  get images() {
    return this.#image;
  }
  get sounds() {
    return this.#sounds;
  }
}
