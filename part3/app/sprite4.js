// Константы
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 2 * CANVAS_WIDTH;
const ENEMY_COUNT = 10;
const SPRITE_WIDTH = 213;
const SPRITE_SCALE = 2;
const INTERVAL_RANGE = { min: 50, max: 200 };
const ENEMY_IMAGE_SRC = "../img/enemies/enemy4.png";
const SMOOTHING_FACTOR = 70;

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas-1");
const context = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const enemies = [];
let gameFrame = 0;

class Enemy {
  #image;
  #width;
  #height;
  #x;
  #y;
  #targetX;
  #targetY;
  #frame;
  #flapSpeed;
  #interval;

  constructor() {
    this.#image = new Image();
    this.#image.src = ENEMY_IMAGE_SRC;
    this.#width = SPRITE_WIDTH / SPRITE_SCALE;
    this.#height = SPRITE_WIDTH / SPRITE_SCALE;
    this.#x = Math.random() * CANVAS_WIDTH;
    this.#y = Math.random() * CANVAS_HEIGHT;
    this.#targetX = Math.random() * (CANVAS_WIDTH - this.#width);
    this.#targetY = Math.random() * (CANVAS_HEIGHT - this.#height);
    this.#frame = 0;
    this.#flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.#interval = Math.floor(
      Math.random() * (INTERVAL_RANGE.max - INTERVAL_RANGE.min) + INTERVAL_RANGE.min
    );
  }

  #update() {
    if (gameFrame % this.#interval === 0) {
      this.#targetX = Math.random() * (CANVAS_WIDTH - this.#width);
      this.#targetY = Math.random() * (CANVAS_HEIGHT - this.#height);
    }
    const dx = this.#x - this.#targetX;
    const dy = this.#y - this.#targetY;
    this.#x -= dx / SMOOTHING_FACTOR;
    this.#y -= dy / SMOOTHING_FACTOR;

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
      SPRITE_WIDTH,
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
