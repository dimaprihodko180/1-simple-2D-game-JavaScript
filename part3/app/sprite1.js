// Константы
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 2 * CANVAS_WIDTH;
const ENEMY_COUNT = 100;
const SPRITE_WIDTH = 293;
const SPRITE_HEIGHT = 155;
const SPRITE_SCALE = 2.5;
const ENEMY_IMAGE_SRC = "../img/enemies/enemy1.png";

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
  #speedX;
  #speedY;
  #frame;
  #flapSpeed;

  constructor() {
    this.#image = new Image();
    this.#image.src = ENEMY_IMAGE_SRC;
    this.#width = SPRITE_WIDTH / SPRITE_SCALE;
    this.#height = SPRITE_HEIGHT / SPRITE_SCALE;
    this.#x = Math.random() * (CANVAS_WIDTH - this.#width);
    this.#y = Math.random() * (CANVAS_HEIGHT - this.#height);
    this.#speedX = Math.random() * 5 - 2.5;
    this.#speedY = Math.random() * 5 - 2.5;
    this.#frame = 0;
    this.#flapSpeed = Math.floor(Math.random() * 3 + 1);
  }

  #update() {
    this.#x += this.#speedX;
    this.#y += this.#speedY;
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
