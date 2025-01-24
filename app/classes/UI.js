export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Helvetica";
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "white";
    context.shadowBlur = 0;
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.font;
    context.fillText("Score: " + this.game.score, 20, 50);
    context.font = this.fontSize * 0.75 + "px " + this.fontFamily;
    context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80);
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = this.fontSize * 2 + "px " + this.fontFamily;
      if (this.game.score > 2) {
        context.fillText(
          "Game Over",
          this.game.width * 0.5,
          this.game.height * 0.5
        );
        context.font = this.fontSize * 0.75 + "px " + this.fontFamily;
        context.fillText(
          "Press Enter to Restart",
          this.game.width * 0.5,
          this.game.height * 0.5 + 40
        );
      } else {
        context.fillText(
          "You Died",
          this.game.width * 0.5,
          this.game.height * 0.5
        );
        context.font = this.fontSize * 0.75 + "px " + this.fontFamily;
        context.fillText(
          "Press Enter to Restart",
          this.game.width * 0.5,
          this.game.height * 0.5 + 40
        );
      }
    }
    context.restore();
  }
}
