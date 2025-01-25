const FLOATING_MESSAGE_CONSTANTS = {
  FONT: "20px Creepsster",
  FILL_COLOR: "white",
  STROKE_COLOR: "black",
  TIMER_LIMIT: 100,
  INTERPOLATION_FACTOR: 0.03,
};

export class FloatingMessage {
  constructor(value, x, y, targetX, targetY) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.markedForDeletion = false;
    this.timer = 0;
  }

  update() {
    this.x +=
      (this.targetX - this.x) * FLOATING_MESSAGE_CONSTANTS.INTERPOLATION_FACTOR;
    this.y +=
      (this.targetY - this.y) * FLOATING_MESSAGE_CONSTANTS.INTERPOLATION_FACTOR;
    this.timer++;
    if (this.timer > FLOATING_MESSAGE_CONSTANTS.TIMER_LIMIT) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    context.font = FLOATING_MESSAGE_CONSTANTS.FONT;
    context.fillStyle = FLOATING_MESSAGE_CONSTANTS.FILL_COLOR;
    context.fillText(this.value, this.x, this.y);
    context.fillStyle = FLOATING_MESSAGE_CONSTANTS.STROKE_COLOR;
    context.fillText(this.value, this.x - 2, this.y - 2);
  }
}
