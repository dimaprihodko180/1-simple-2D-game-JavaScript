/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas-1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;

let explosions = [];

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 100;
    this.spriteHeight = 179;
    this.scale = 0.7;
    this.width = this.spriteWidth * this.scale;
    this.height = this.spriteHeight * this.scale;
    this.x = x;
    this.y = y;
    this.image = Explosion.loadImage("/img/boom.png");
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * Math.PI * 2;
    this.sound = Explosion.loadSound("../audio/boom.wav");
  }

  static loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
  }

  static loadSound(src) {
    const audio = new Audio();
    audio.src = src;
    return audio;
  }

  update() {
    if (this.frame === 0) {
      this.sound.play();
    }
    this.timer++;
    if (this.timer % 10 === 0) {
      this.frame++;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }

  isAnimationComplete() {
    return this.frame > 5;
  }
}

function createAnimation(e) {
  const canvasPosition = canvas.getBoundingClientRect();
  const positionX = e.x - canvasPosition.left;
  const positionY = e.y - canvasPosition.top;
  explosions.push(new Explosion(positionX, positionY));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  explosions = explosions.filter((explosion) => {
    explosion.update();
    explosion.draw();
    return !explosion.isAnimationComplete();
  });
  requestAnimationFrame(animate);
}

window.addEventListener("click", createAnimation);

animate();
