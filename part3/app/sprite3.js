// Константы
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 2 * CANVAS_WIDTH;
const ENEMY_COUNT = 50;
const SPRITE_WIDTH = 218;
const SPRITE_HEIGHT = 177;
const SPRITE_SCALE = 2;
const ENEMY_IMAGE_SRC = "../img/enemies/enemy3.png";
const VECTOR_ANGLE = 45;
const SIN_COEFF = 2;
const COS_COEFF = 6;

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas-1");
const context = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const enemies = [];
let gameFrame = 0;

class Enemy {
  #image;
  #x;
  #y;
  #width;
  #height;
  #angle;
  #angleSpeed;
  #flapSpeed;
  #frame;

  constructor() {
    this.#image = new Image();
    this.#image.src = ENEMY_IMAGE_SRC;
    this.#width = SPRITE_WIDTH / SPRITE_SCALE;
    this.#height = SPRITE_HEIGHT / SPRITE_SCALE;
    this.#x = Math.random() * (CANVAS_WIDTH - this.#width);
    this.#y = Math.random() * (CANVAS_HEIGHT - this.#height);
    this.#angle = Math.random() * 50;
    this.#angleSpeed = Math.random() * 1.5 + 0.5;
    this.#flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.#frame = 0;
  }

  #update() {
    this.#x =
      0.5 * CANVAS_WIDTH * Math.cos((this.#angle * Math.PI) / (SIN_COEFF * VECTOR_ANGLE)) +
      0.5 * (CANVAS_WIDTH - this.#width);
    this.#y =
      0.5 * CANVAS_HEIGHT * Math.sin((this.#angle * Math.PI) / (COS_COEFF * VECTOR_ANGLE)) +
      0.5 * (CANVAS_HEIGHT - this.#height);
    this.#angle += this.#angleSpeed;
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
