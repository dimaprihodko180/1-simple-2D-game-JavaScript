document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas-1");
  const ctx = canvas.getContext("2d");
  const CANVAS_WIDTH = (canvas.width = 800);
  const CANVAS_HEIGHT = (canvas.height = 700);
  const kf = 0.2;

  const backgroundLayers = [
    { src: "/img/backgroundLayers/layer-1.png", speedModifier: 1 * kf },
    { src: "/img/backgroundLayers/layer-2.png", speedModifier: 2 * kf },
    { src: "/img/backgroundLayers/layer-3.png", speedModifier: 3 * kf },
    { src: "/img/backgroundLayers/layer-4.png", speedModifier: 4 * kf },
    { src: "/img/backgroundLayers/layer-5.png", speedModifier: 5 * kf },
  ];

  class Layer {
    constructor(ctx, image, speedModifier) {
      this.ctx = ctx;
      this.image = image;
      this.speedModifier = speedModifier;
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 700;
    }

    update(gameSpeed) {
      const speed = gameSpeed * this.speedModifier;
      this.x = (this.x - speed) % this.width;
    }

    draw() {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      this.ctx.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    }
  }

  function initializeGame() {
    let gameSpeed = 15;

    const gameObjects = backgroundLayers.map((layer) => {
      const image = new Image();
      image.src = layer.src;
      return new Layer(ctx, image, layer.speedModifier);
    });

    const slider = document.getElementById("slider");
    slider.value = gameSpeed;
    const showGameSpeed = document.querySelector(".show-game-speed");
    showGameSpeed.innerHTML = gameSpeed;

    slider.addEventListener("change", (e) => {
      gameSpeed = parseInt(e.target.value, 10);
      showGameSpeed.innerHTML = gameSpeed;
    });

    function animate() {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      gameObjects.forEach((object) => {
        object.update(gameSpeed);
        object.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();
  }

  initializeGame();
});
