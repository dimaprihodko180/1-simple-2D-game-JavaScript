// ПОДКЛЮЧЕНИЕ HTML - КОНТЕКСТА И ОБЪЯВЛЕНИЕ ВАЖНЫХ ПЕРЕМЕННЫХ
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas-1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 2 * CANVAS_WIDTH;
const numberOfEnemies = 10;
const storageOfEnemies = [];
// ПОДКЛЮЧЕНИЕ ИЗОБРАЖЕНИЙ
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

let gameFrame = 0;
// СОЗДАНИЕ КЛАССА "БОТ"
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
class Enemy {
  constructor() {
    this.enemyImage = new Image();
    this.enemyImage.src = "../img/enemies/enemy4.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 213;
    this.spriteHeight = this.spriteWidth;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.newX = Math.random() * (canvas.width - this.width);
    this.newY = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.intervl = Math.floor(Math.random() * 200 + 50);
  }

  #update() {
    if (gameFrame % this.intervl === 0) {
      this.newX = Math.random() * (canvas.width - this.width);
      this.newY = Math.random() * (canvas.height - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 70;
    this.y -= dy / 70;
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) {
      this.x = canvas.width;
    }
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  #draw() {
    ctx.drawImage(
      this.enemyImage,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  animate() {
    this.#update();
    this.#draw();
  }
}

// СОЗДАНИЕ АНИМАЦИИ
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
for (let i = 0; i < numberOfEnemies; i++) {
  storageOfEnemies.push(new Enemy());
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  storageOfEnemies.forEach((enemy) => {
    enemy.animate();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

// ЗАПУСК АНИМАЦИИ
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
animate();
