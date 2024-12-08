export class Entities {
  #x = 0
  #ctx
  #canvas
  #canvasId
  #gCanvasWidth
  #gCanvasHeigh
  #playerImage

  constructor(canvasId = "canvas-1") {
    this.#canvasId = canvasId
    this.#canvas = document.getElementById(this.#canvasId)
    this.#ctx = this.#canvas.getContext("2d")
    this.#gCanvasWidth = this.#canvas.width = 600
    this.#gCanvasHeigh = this.#canvas.height = 600
    this.#playerImage = new Image()
    this.#playerImage.src = "shadow_dog.png"
    this.animate = this.animate.bind(this)
  }

  animate() {
    this.#ctx.clearRect(0, 0, this.#gCanvasWidth, this.#gCanvasHeigh)
    this.#ctx.fillRect(this.#x, 50, 100, 100)
    this.#x++
    requestAnimationFrame(this.animate)
  }
}
