// ПОДКЛЮЧЕНИЕ HTML - КОНТЕКСТА И ОБЪЯВЛЕНИЕ ВАЖНЫХ ПЕРЕМЕННЫХ
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas-1")
const ctx = canvas.getContext("2d")
CANVAS_WIDTH = canvas.width = 500
CANVAS_HEIGHT = canvas.height = 2 * CANVAS_WIDTH
const numberOfEnemies = 5000
const storageOfEnemies = []
// ПОДКЛЮЧЕНИЕ ИЗОБРАЖЕНИЙ
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
const enemyImage1 = new Image()
enemyImage1.src = "../img/enemies/enemy1.png"
// СОЗДАНИЕ КЛАССА "БОТ"
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
class Enemy {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.width = 50
    this.height = this.width
    this.speed = Math.random() * 4 - 2
    this.spriteWidth = 293
    this.spriteHeight = 155
  }
  #update() {
    this.x += this.speed
    this.y += this.speed
  }

  #draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(enemyImage1, this.x, this.y, this.width, this.height)
  }

  animate() {
    this.#update()
    this.#draw()
  }
}
// СОЗДАНИЕ АНИМАЦИИ
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
for (let i = 0; i < numberOfEnemies; i++) {
  storageOfEnemies.push(new Enemy())
}
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  storageOfEnemies.forEach((enemy) => {
    enemy.animate()
  })
  requestAnimationFrame(animate)
}
// ЗАПУСК АНИМАЦИИ
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
animate()
