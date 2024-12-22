export class Layer {
  constructor(ctx, image, speedModifier) {
    this.x = 0
    this.y = 0
    this.width = 2400
    this.height = 700
    this.x2 = this.width
    this.image = image
    this.speedModifier = speedModifier
    this.ctx = ctx
  }

  update(gameSpeed) {
    const speed = gameSpeed * this.speedModifier

    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - speed
    }

    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - speed
    }

    this.x -= speed
    this.x2 -= speed
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    this.ctx.drawImage(this.image, this.x2, this.y, this.width, this.height)
  }
}
