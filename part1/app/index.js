document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas-1");
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 600;

  const spriteWidth = 575;
  const spriteHeight = 523;
  const staggerFrame = 5;

  const animationStates = [
    { name: "idle", frames: 7 },
    { name: "jump", frames: 7 },
    { name: "fall", frames: 7 },
    { name: "run", frames: 9 },
    { name: "dizzy", frames: 11 },
    { name: "sit", frames: 5 },
    { name: "roll", frames: 7 },
    { name: "bite", frames: 7 },
    { name: "ko", frames: 12 },
    { name: "getHit", frames: 4 },
  ];

  class Entities {
    constructor(ctx, width, height) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.spriteAnimations = this.initAnimations(animationStates);
      this.playerImage = new Image();
      this.playerImage.src = "../../img/shadow_dog.png";
      this.playerState = "getHit";
      this.gameFrame = 0;

      const dropdown = document.getElementById("animations");
      dropdown.addEventListener("change", (e) => {
        this.playerState = e.target.value;
      });

      this.playerImage.onload = () => this.animate();
      this.playerImage.onerror = () =>
        console.error("Failed to load the image at", this.playerImage.src);
    }

    initAnimations(states) {
      const animations = {};
      states.forEach((state, index) => {
        const frames = { loc: [] };
        for (let j = 0; j < state.frames; j++) {
          const positionX = j * spriteWidth;
          const positionY = index * spriteHeight;
          frames.loc.push({ x: positionX, y: positionY });
        }
        animations[state.name] = frames;
      });
      return animations;
    }

    update() {
      this.gameFrame++;
    }

    draw() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      const animation = this.spriteAnimations[this.playerState];
      if (!animation) {
        console.error(`Animation '${this.playerState}' not initialized.`);
        return;
      }

      const position =
        Math.floor(this.gameFrame / staggerFrame) % animation.loc.length;
      const frameX = animation.loc[position].x;
      const frameY = animation.loc[position].y;

      this.ctx.drawImage(
        this.playerImage,
        frameX,
        frameY,
        spriteWidth,
        spriteHeight,
        0,
        0,
        spriteWidth,
        spriteHeight
      );
    }

    animate() {
      this.update();
      this.draw();
      requestAnimationFrame(() => this.animate());
    }
  }

  const entities = new Entities(ctx, canvas.width, canvas.height);
});
