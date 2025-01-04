const canvas = document.getElementById("canvas-1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
let explosion = [];
let canvasPosition = canvas.getBoundingClientRect();
let spriteWidth = 50;
let spriteHeight = spriteWidth;

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = 0.5 * this.spriteWidth;
    this.height = 0.5 * this.spriteHeight;
    this.image = new Image();
    this.image.src = "../img/boom.png";
    this.frame = 0;
  }

  update() {
    this.frame++;
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

window.addEventListener("click", (e) => {
    let positionX = e.x - canvasPosition.left - 0.5 * spriteWidth
    let positionY = e.y - canvasPosition.top - 0.5 * spriteHeight
  ctx.fillStyle = "white";
  ctx.fillRect(
   positionX ,
   positionY ,
    spriteWidth,
    spriteHeight
  );
});
