/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas-1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let score = 0;
ctx.font = "50px Impact";
//______________________________________________________________________________________________
const colisionCanvas = document.getElementById("colision-canvas");
const colisionCtx = colisionCanvas.getContext("2d");
colisionCanvas.width = window.innerWidth;
colisionCanvas.height = window.innerHeight;
//______________________________________________________________________________________________
let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let ravens = [];
class Raven {
  constructor() {
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.sizeMod = Math.random() * 0.6 + 0.4;
    this.width = this.sizeMod * this.spriteWidth;
    this.height = this.sizeMod * this.spriteHeight;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = "../img/raven.png";
    this.frame = 0;
    this.maxFrame = 4;
    this.timeSinceFlap = 0;
    this.speedFlap = 50;
    this.flapInterval = Math.random() * this.speedFlap + this.speedFlap;
    this.randomColors = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];

    this.color = `rgb(${this.randomColors[0]}, ${this.randomColors[1]}, ${this.randomColors[2]})`;
  }

  #update(deltaTime = this.speedFlap) {
    if (this.y < 0 || this.y > canvas.height - this.height) {
      this.directionY = -this.directionY;
    }
    this.x -= this.directionX;
    this.y += this.directionY;
    if (this.x < -this.width) this.markedForDeletion = true;
    this.timeSinceFlap += deltaTime;
    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) this.frame = 0;
      else this.frame++;
      this.timeSinceFlap = 0;
    }
  }

  #draw() {
    colisionCtx.fillStyle = this.color;
    colisionCtx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
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

  action() {
    this.#update();
    this.#draw();
  }
}

const raven = new Raven();
function drawScore() {
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, 50, 75);
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 55, 80);
}

window.addEventListener("click", (e) => {
  const detectPixelColor = colisionCtx.getImageData(e.x, e.y, 1, 1);
  const pc = detectPixelColor.data;
  console.log(pc);
  ravens.forEach((bird) => {
    if (
      bird.randomColors[0] === pc[0] &&
      bird.randomColors[1] === pc[1] &&
      bird.randomColors[2] === pc[2]
    ) {
      bird.markedForDeletion = true;
      score++;
    }
  });
});

function animate(timestamp = 0) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  colisionCtx.clearRect(0, 0, canvas.width, canvas.height);
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextRaven += deltaTime;
  drawScore();
  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven());
    timeToNextRaven = 0;
    ravens.sort((a, b) => {
      return a.width - b.width;
    });
  }
  [...ravens].forEach((bird) => bird.action());
  ravens = ravens.filter((bird) => !bird.markedForDeletion);
  requestAnimationFrame(animate);
}

animate();
