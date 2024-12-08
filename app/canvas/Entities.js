export class Entities {
  #ctx
  #canvas
  #canvasId
  #gCanvasWidth
  #gCanvasHeigh
  #playerImage
  #numberFrames = 11
  #spriteWidth = 575
  #spriteHeigh = 523
  #gameFrame = 0
  #staggerFrame = 5
  #spriteAnimations = {}
  #animationStates = [
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
  ]
  #statePosition = this.#animationStates[0].name

  constructor(canvasId = "canvas-1") {
    this.#canvasId = canvasId
    this.#canvas = document.getElementById(this.#canvasId)
    if (!this.#canvas) {
      throw new Error(`Canvas with ID "${canvasId}" not found.`)
    }
    this.#ctx = this.#canvas.getContext("2d")
    this.#gCanvasWidth = this.#canvas.width = 600
    this.#gCanvasHeigh = this.#canvas.height = 600
    this.#playerImage = new Image()
    this.#playerImage.src = "/img/shadow_dog.png"
    this.animate = this.animate.bind(this)

    this.#initAnimations() // Инициализация анимаций
  }

  // Инициализация анимаций
  #initAnimations() {
    this.#animationStates.forEach((state, index) => {
      let frame = { loc: [] }
      for (let j = 0; j < state.frames; j++) {
        let positionX = j * this.#spriteWidth
        let positionY = index * this.#spriteHeigh
        frame.loc.push({ x: positionX, y: positionY })
      }
      this.#spriteAnimations[state.name] = frame // Исправлено: "frames" на "frame"
    })
  }

  #toAnimate() {
    this.#ctx.clearRect(0, 0, this.#gCanvasWidth, this.#gCanvasHeigh)

    // Проверка существования "jump" анимации
    if (!this.#spriteAnimations[this.#statePosition]) {
      console.error("Animation 'jump' not initialized.")
      return
    }

    let position =
      Math.floor(this.#gameFrame / this.#staggerFrame) %
      this.#spriteAnimations[this.#statePosition].loc.length // Исправлено: "lenght" на "length"

    let frameX = this.#spriteAnimations[this.#statePosition].loc[position].x // Исправлено: использован "x"
    let frameY = this.#spriteAnimations[this.#statePosition].loc[position].y // Исправлено: использован "y"

    this.#ctx.drawImage(
      this.#playerImage,
      frameX, // Источник: X
      frameY, // Источник: Y
      this.#spriteWidth, // Ширина кадра
      this.#spriteHeigh, // Высота кадра
      0, // Координата X на холсте
      0, // Координата Y на холсте
      this.#spriteWidth, // Ширина на холсте
      this.#spriteHeigh // Высота на холсте
    )

    this.#gameFrame++
    requestAnimationFrame(this.animate)
  }

  animate() {
    this.#toAnimate()
  }
}
