// Константы
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 2 * CANVAS_WIDTH;
const ENEMY_COUNT = 100;
const SPRITE_WIDTH = 266;
const SPRITE_HEIGHT = 188;
const SPRITE_SCALE = 2.5;
const ENEMY_IMAGE_SRC = "../img/enemies/enemy2.png";

// HTML-канвас и контекст
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas-1");
const context = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// Хранилище врагов
const enemies = [];
let gameFrame = 0;

class Enemy {
  #image;
  #x;
  #y;
  #width;
  #height;
  #speed;
  #frame;
  #flapSpeed;
  #angle;
  #angleSpeed;
  #curve;

  constructor() {
    this.#image = new Image();
    this.#image.src = ENEMY_IMAGE_SRC;
    this.#width = SPRITE_WIDTH / SPRITE_SCALE;
    this.#height = SPRITE_HEIGHT / SPRITE_SCALE;
    this.#x = Math.random() * (CANVAS_WIDTH - this.#width);
    this.#y = Math.random() * (CANVAS_HEIGHT - this.#height);
    this.#speed = Math.random() * 4 + 1;
    this.#frame = 0;
    this.#flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.#angle = 0;
    this.#angleSpeed = Math.random() * 0.2;
    this.#curve = Math.random() * 10;
  }

  #update() {
    this.#x -= this.#speed;
    this.#y += this.#curve * Math.sin(this.#angle);
    this.#angle += this.#angleSpeed;
    if (this.#x + this.#width < 0) {
      this.#x = CANVAS_WIDTH;
    }
    if (gameFrame % this.#flapSpeed === 0) {
      this.#frame = this.#frame >= 4 ? 0 : this.#frame + 1;
    }
  }

  #draw() {
    context.drawImage(
      this.#image,
      this.#frame * SPRITE_WIDTH,
      0,
      SPRITE_WIDTH,
      SPRITE_HEIGHT,
      this.#x,
      this.#y,
      this.#width,
      this.#height
    );
  }

  animate() {
    this.#update();
    this.#draw();
  }
}

for (let i = 0; i < ENEMY_COUNT; i++) {
  enemies.push(new Enemy());
}

function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemies.forEach((enemy) => enemy.animate());
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
