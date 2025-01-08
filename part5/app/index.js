const CANVAS_FONT = "50px Impact";
const RAVEN_SPRITE_WIDTH = 271;
const RAVEN_SPRITE_HEIGHT = 194;
const RAVEN_MIN_SIZE_MOD = 0.4;
const RAVEN_MAX_SIZE_MOD = 1.0;
const RAVEN_MIN_SPEED_X = 3;
const RAVEN_MAX_SPEED_X = 8;
const RAVEN_MIN_SPEED_Y = -2.5;
const RAVEN_MAX_SPEED_Y = 2.5;
const FLAP_SPEED_BASE = 50;
const FLAP_SPEED_VARIATION = 50;
const SCORE_TEXT_OFFSET_X = 50;
const SCORE_TEXT_OFFSET_Y = 75;
const SCORE_TEXT_SHADOW_OFFSET = 5;
const RAVEN_INTERVAL = 500;
const EXPLOSION_FRAME_INTERVAL = 200;
const EXPLOSION_FRAMES = 5;

const canvas = document.getElementById("canvas-1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById("colision-canvas");
const collisionCtx = collisionCanvas.getContext("2d");
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let score = 0;
ctx.font = CANVAS_FONT;

let timeToNextRaven = 0;
let lastTimestamp = 0;
let ravens = [];
let explosions = [];
let gameOver = false;

class Raven {
  constructor() {
    this.sizeModifier =
      Math.random() * (RAVEN_MAX_SIZE_MOD - RAVEN_MIN_SIZE_MOD) +
      RAVEN_MIN_SIZE_MOD;
    this.width = RAVEN_SPRITE_WIDTH * this.sizeModifier;
    this.height = RAVEN_SPRITE_HEIGHT * this.sizeModifier;

    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);

    this.speedX =
      Math.random() * (RAVEN_MAX_SPEED_X - RAVEN_MIN_SPEED_X) +
      RAVEN_MIN_SPEED_X;
    this.speedY =
      Math.random() * (RAVEN_MAX_SPEED_Y - RAVEN_MIN_SPEED_Y) +
      RAVEN_MIN_SPEED_Y;

    this.markedForDeletion = false;

    this.image = new Image();
    this.image.src = "/img/raven.png";

    this.frame = 0;
    this.maxFrame = 4;

    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * FLAP_SPEED_VARIATION + FLAP_SPEED_BASE;

    this.randomColors = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    this.color = `rgb(${this.randomColors.join(", ")})`;

    this.hasTrail = Math.random() > 0.5;
  }

  update(deltaTime) {
    if (this.y <= 0 || this.y >= canvas.height - this.height) {
      this.speedY = -this.speedY;
    }

    this.x -= this.speedX;
    this.y += this.speedY;

    if (this.x + this.width < 0) this.markedForDeletion = true;

    this.timeSinceFlap += deltaTime;
    if (this.timeSinceFlap > this.flapInterval) {
      this.frame = (this.frame + 1) % (this.maxFrame + 1);
      this.timeSinceFlap = 0;
      if (this.hasTrail) {
        for (let i = 0; i < 5; i++) {
          particles.push(new Particle(this.x, this.y, this.width, this.color));
        }
      }
    }
    if (this.x < -this.width) gameOver = true;
  }

  draw() {
    collisionCtx.fillStyle = this.color;
    collisionCtx.fillRect(this.x, this.y, this.width, this.height);

    ctx.drawImage(
      this.image,
      this.frame * RAVEN_SPRITE_WIDTH,
      0,
      RAVEN_SPRITE_WIDTH,
      RAVEN_SPRITE_HEIGHT,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class Explosion {
  constructor(x, y, size) {
    this.image = new Image();
    this.image.src = "/img/boom.png";
    this.spriteWidth = 200 / 2;
    this.spriteHeight = 179 / 2;
    this.x = x;
    this.y = y;
    this.size = size;
    this.frame = 0;
    this.timeSinceLastFrame = 0;
    this.markedForDeletion = false;

    this.audio = new Audio();
    this.audio.src = "../audio/boom.wav";
    this.audio.play().catch((err) => console.error("Audio play error:", err));
  }

  update(deltaTime) {
    this.timeSinceLastFrame += deltaTime;
    if (this.timeSinceLastFrame > EXPLOSION_FRAME_INTERVAL) {
      this.frame++;
      this.timeSinceLastFrame = 0;
      if (this.frame > EXPLOSION_FRAMES) {
        this.markedForDeletion = true;
      }
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.size,
      this.size
    );
  }
}

let particles = [];
class Particle {
  constructor(x, y, size, color) {
    this.size = size;
    this.x = x + this.size / 2 + Math.random() * 50 - 25;
    this.y = y + this.size / 3 + Math.random() * 50 - 25;
    this.radius = (Math.random() * this.size) / 10;
    this.maxRadius = Math.random() * 20 + 35;
    this.markedForDeletion = false;
    this.speedX = Math.random() * 1 + 0.5;
    this.color = color;
  }

  update() {
    this.x += this.speedX;
    this.radius += 0.8;
    if (this.radius > this.maxRadius - 5) this.markedForDeletion = true;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = 1 - this.radius / this.maxRadius;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, SCORE_TEXT_OFFSET_X, SCORE_TEXT_OFFSET_Y);
  ctx.fillStyle = "white";
  ctx.fillText(
    `Score: ${score}`,
    SCORE_TEXT_OFFSET_X + SCORE_TEXT_SHADOW_OFFSET,
    SCORE_TEXT_OFFSET_Y + SCORE_TEXT_SHADOW_OFFSET
  );
}

function handleClick(e) {
  const pixelData = collisionCtx.getImageData(e.x, e.y, 1, 1).data;
  ravens.forEach((raven) => {
    if (
      raven.randomColors[0] === pixelData[0] &&
      raven.randomColors[1] === pixelData[1] &&
      raven.randomColors[2] === pixelData[2]
    ) {
      raven.markedForDeletion = true;
      score++;
      explosions.push(new Explosion(raven.x, raven.y, raven.width));
    }
  });
}

function drawGameOver() {
  ctx.textAlign = "centre";
  ctx.fillStyle = "black";
  ctx.fillText(
    `GAME OVER, your score is ${score}`,
    canvas.width / 2,
    canvas.height / 2
  );
  ctx.fillStyle = "white";
  ctx.fillText(
    `GAME OVER, your score is ${score}`,
    canvas.width / 2 + 5,
    canvas.height / 2 + 5
  );
}

function animate(timestamp = 0) {
  const deltaTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  collisionCtx.clearRect(0, 0, canvas.width, canvas.height);

  timeToNextRaven += deltaTime;
  if (timeToNextRaven > RAVEN_INTERVAL) {
    ravens.push(new Raven());
    timeToNextRaven = 0;
    ravens.sort((a, b) => a.width - b.width);
  }

  drawScore();
  [...particles, ...ravens, ...explosions].forEach((obj) =>
    obj.update(deltaTime)
  );
  [...particles, ...ravens, ...explosions].forEach((obj) => obj.draw());

  ravens = ravens.filter((raven) => !raven.markedForDeletion);
  explosions = explosions.filter((explosion) => !explosion.markedForDeletion);
  particles = particles.filter((obj) => !obj.markedForDeletion);

  if (!gameOver) requestAnimationFrame(animate);
  else drawGameOver();
}

window.addEventListener("click", handleClick);

animate();
