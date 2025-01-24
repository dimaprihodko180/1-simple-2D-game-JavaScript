export class Image {
  #imageOfPlayer;
  #layer1;
  #layer2;
  #layer3;
  #layer4;
  #layer5;
  #enemyFly;
  #enemyPlant;
  #enemyBigSpider;
  #fire;
  #boom;
  #lives;

  #SRC_LINKS = {
    player: "../files/images/player.png",
    layer1: "../files/images/backgroundLayers/layer-1.png",
    layer2: "../files/images/backgroundLayers/layer-2.png",
    layer3: "../files/images/backgroundLayers/layer-3.png",
    layer4: "../files/images/backgroundLayers/layer-4.png",
    layer5: "../files/images/backgroundLayers/layer-5.png",
    enemyFly: "../files/images/enemy_fly.png",
    enemyPlant: "../files/images/enemy_plant.png",
    enemyBigSpider: "../files/images/enemy_spider_big.png",
    fire: "../files/images/fire.png",
    boom: "../files/images/boom.png",
    lives: "../files/images/lives.png",
  };

  constructor() {
    this.#imageOfPlayer = this.#createImage(this.#SRC_LINKS.player);
    this.#layer1 = this.#createImage(this.#SRC_LINKS.layer1);
    this.#layer2 = this.#createImage(this.#SRC_LINKS.layer2);
    this.#layer3 = this.#createImage(this.#SRC_LINKS.layer3);
    this.#layer4 = this.#createImage(this.#SRC_LINKS.layer4);
    this.#layer5 = this.#createImage(this.#SRC_LINKS.layer5);
    this.#enemyFly = this.#createImage(this.#SRC_LINKS.enemyFly);
    this.#enemyPlant = this.#createImage(this.#SRC_LINKS.enemyPlant);
    this.#enemyBigSpider = this.#createImage(this.#SRC_LINKS.enemyBigSpider);
    this.#fire = this.#createImage(this.#SRC_LINKS.fire);
    this.#boom = this.#createImage(this.#SRC_LINKS.boom);
    this.#lives = this.#createImage(this.#SRC_LINKS.lives);
  }

  #createImage(src) {
    const img = new window.Image();
    img.src = src;
    img.onerror = () =>
      console.error(`Не удалось загрузить изображение: ${src}`);
    return img;
  }

  get imageOfPlayer() {
    return this.#imageOfPlayer;
  }

  get layer1() {
    return this.#layer1;
  }

  get layer2() {
    return this.#layer2;
  }

  get layer3() {
    return this.#layer3;
  }

  get layer4() {
    return this.#layer4;
  }

  get layer5() {
    return this.#layer5;
  }

  get enemyFly() {
    return this.#enemyFly;
  }

  get enemyPlant() {
    return this.#enemyPlant;
  }

  get enemyBigSpider() {
    return this.#enemyBigSpider;
  }

  get fire() {
    return this.#fire;
  }

  get boom() {
    return this.#boom;
  }

  get lives() {
    return this.#lives;
  }
}
