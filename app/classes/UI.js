import { FileManager } from "../links/FileManager.js";

const UI_CONSTANTS = {
  FONT: {
    SIZE: 30,
    FAMILY: "Helvetica",
    SMALL_MULTIPLIER: 0.75,
    LARGE_MULTIPLIER: 2,
  },
  SHADOW: {
    OFFSET_X: 2,
    OFFSET_Y: 2,
    COLOR: "white",
    BLUR: 0,
  },
  POSITION: {
    SCORE_X: 20,
    SCORE_Y: 50,
    TIME_X: 20,
    TIME_Y: 80,
    LIVES_START_X: 20,
    LIVES_Y: 95,
    LIVES_SIZE: 25,
    LIVES_SPACING: 25,
    GAME_OVER_TEXT_Y: 0.5,
    GAME_OVER_SUBTEXT_OFFSET: 40,
  },
  GAME_OVER: {
    WIN_MESSAGE: "Game Over",
    LOSE_MESSAGE: "You Died",
    RESTART_PROMPT: "Press Enter to Restart",
  },
};

export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = UI_CONSTANTS.FONT.SIZE;
    this.fontFamily = UI_CONSTANTS.FONT.FAMILY;
    this.image = new FileManager().images.lives;
  }

  draw(context) {
    context.save();
    context.shadowOffsetX = UI_CONSTANTS.SHADOW.OFFSET_X;
    context.shadowOffsetY = UI_CONSTANTS.SHADOW.OFFSET_Y;
    context.shadowColor = UI_CONSTANTS.SHADOW.COLOR;
    context.shadowBlur = UI_CONSTANTS.SHADOW.BLUR;
    context.font = `${this.fontSize}px ${this.fontFamily}`;
    context.textAlign = "left";
    context.fillStyle = this.game.font;

    context.fillText(
      `Score: ${this.game.score}`,
      UI_CONSTANTS.POSITION.SCORE_X,
      UI_CONSTANTS.POSITION.SCORE_Y
    );

    context.font = `${this.fontSize * UI_CONSTANTS.FONT.SMALL_MULTIPLIER}px ${
      this.fontFamily
    }`;
    context.fillText(
      `Time: ${(this.game.time * 0.001).toFixed(1)}`,
      UI_CONSTANTS.POSITION.TIME_X,
      UI_CONSTANTS.POSITION.TIME_Y
    );

    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(
        this.image,
        UI_CONSTANTS.POSITION.LIVES_START_X +
          UI_CONSTANTS.POSITION.LIVES_SPACING * i,
        UI_CONSTANTS.POSITION.LIVES_Y,
        UI_CONSTANTS.POSITION.LIVES_SIZE,
        UI_CONSTANTS.POSITION.LIVES_SIZE
      );
    }

    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = `${this.fontSize * UI_CONSTANTS.FONT.LARGE_MULTIPLIER}px ${
        this.fontFamily
      }`;
      const message =
        this.game.score > 2
          ? UI_CONSTANTS.GAME_OVER.WIN_MESSAGE
          : UI_CONSTANTS.GAME_OVER.LOSE_MESSAGE;

      context.fillText(
        message,
        this.game.width * 0.5,
        this.game.height * UI_CONSTANTS.POSITION.GAME_OVER_TEXT_Y
      );

      context.font = `${this.fontSize * UI_CONSTANTS.FONT.SMALL_MULTIPLIER}px ${
        this.fontFamily
      }`;
      context.fillText(
        UI_CONSTANTS.GAME_OVER.RESTART_PROMPT,
        this.game.width * 0.5,
        this.game.height * UI_CONSTANTS.POSITION.GAME_OVER_TEXT_Y +
          UI_CONSTANTS.POSITION.GAME_OVER_SUBTEXT_OFFSET
      );
    }

    context.restore();
  }
}
