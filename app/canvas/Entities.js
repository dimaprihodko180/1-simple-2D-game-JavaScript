export class Entities {
  #ctx
  #canvas
  #canvasId
  #gCanvasWidth
  #gCanvasHeigh
  #playerImage
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
  #playerState = "getHit" // Перемещаем playerState сюда

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
    this.#initAnimations()
    this.#setupDropdownListener() // Вызов метода для установки слушателя
  }

  #initAnimations() {
    this.#animationStates.forEach((state, index) => {
      let frame = { loc: [] }
      for (let j = 0; j < state.frames; j++) {
        let positionX = j * this.#spriteWidth
        let positionY = index * this.#spriteHeigh
        frame.loc.push({ x: positionX, y: positionY })
      }
      this.#spriteAnimations[state.name] = frame
    })
  }

  #setupDropdownListener() {
    const dropdown = document.getElementById("animations")
    dropdown.addEventListener("change", (e) => {
      console.log(e)
      this.#playerState = e.target.value // Изменяем состояние на значение из выпадающего списка
    })
  }

  #toAnimate() {
    this.#ctx.clearRect(0, 0, this.#gCanvasWidth, this.#gCanvasHeigh)
    if (!this.#spriteAnimations[this.#playerState]) {
      // Используем #playerState вместо #statePosition
      console.error(`Animation '${this.#playerState}' not initialized.`)
      return
    }
    let position =
      Math.floor(this.#gameFrame / this.#staggerFrame) %
      this.#spriteAnimations[this.#playerState].loc.length // Используем #playerState
    let frameX = this.#spriteAnimations[this.#playerState].loc[position].x // Используем #playerState
    let frameY = this.#spriteAnimations[this.#playerState].loc[position].y // Используем #playerState
    this.#ctx.drawImage(
      this.#playerImage,
      frameX,
      frameY,
      this.#spriteWidth,
      this.#spriteHeigh,
      0,
      0,
      this.#spriteWidth,
      this.#spriteHeigh
    )
    this.#gameFrame++
    requestAnimationFrame(this.animate)
  }

  animate() {
    this.#toAnimate()
  }
}
