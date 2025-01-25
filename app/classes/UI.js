import { KEYS } from "../main/keys.js";
import { FileManager } from "../links/FileManager.js";
import { GAME_CONSTANTS } from "./Game.js";

const UI_CONSTANTS = {
  FONT: {
    SIZE: 30,
    FAMILY: "Rubik Wet Paint",
    SMALL_MULTIPLIER: 0.75,
    LARGE_MULTIPLIER: 2,
    GAME_UI_MULTIPLIER: 5,
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
  COLORS: {
    SCORE: "black",
    TIME: "black",
    LIVES: "black",
    WIN_MESSAGE: "black",
    LOSE_MESSAGE: "black",
    RESTART_PROMPT: "black",
  },
  GAME_OVER: {
    WIN_MESSAGE: {
      TEXT: "Игра закончена !",
      FONT_FAMILY: "Rubik Wet Paint",
    },
    LOSE_MESSAGE: {
      TEXT: "ВЫ ПРОИГРАЛИ !",
      FONT_FAMILY: "Press Start 2P",
    },
    RESTART_PROMPT: {
      TEXT: `Нажмите ${KEYS.ANOTHERS_KEYS[0]} чтобы начать заново`,
      FONT_FAMILY: "Rubik Wet Paint",
    },
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
    context.fillStyle = UI_CONSTANTS.COLORS.SCORE;
    context.fillText(
      `Счёт: ${this.game.score}`,
      UI_CONSTANTS.POSITION.SCORE_X,
      UI_CONSTANTS.POSITION.SCORE_Y
    );

    context.font = `${this.fontSize * UI_CONSTANTS.FONT.SMALL_MULTIPLIER}px ${
      this.fontFamily
    }`;
    context.fillStyle = UI_CONSTANTS.COLORS.TIME;
    context.fillText(
      `Время: ${(this.game.time * 0.001).toFixed(1)} / ${
        GAME_CONSTANTS.MAX_TIME_MIN * 60
      } секунд`,
      UI_CONSTANTS.POSITION.TIME_X,
      UI_CONSTANTS.POSITION.TIME_Y
    );

    context.fillStyle = UI_CONSTANTS.COLORS.LIVES;
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

      const message =
        this.game.score > 2
          ? UI_CONSTANTS.GAME_OVER.WIN_MESSAGE.TEXT
          : UI_CONSTANTS.GAME_OVER.LOSE_MESSAGE.TEXT;

      const messageFont =
        this.game.score > 2
          ? UI_CONSTANTS.GAME_OVER.WIN_MESSAGE.FONT_FAMILY
          : UI_CONSTANTS.GAME_OVER.LOSE_MESSAGE.FONT_FAMILY;

      const messageColor =
        this.game.score > 2
          ? UI_CONSTANTS.COLORS.WIN_MESSAGE
          : UI_CONSTANTS.COLORS.LOSE_MESSAGE;

      context.font = `${
        this.fontSize * UI_CONSTANTS.FONT.GAME_UI_MULTIPLIER
      }px ${messageFont}`;
      context.fillStyle = messageColor;
      context.fillText(
        message,
        this.game.width * 0.5,
        this.game.height * UI_CONSTANTS.POSITION.GAME_OVER_TEXT_Y
      );

      context.font = `${this.fontSize * UI_CONSTANTS.FONT.SMALL_MULTIPLIER}px ${
        UI_CONSTANTS.GAME_OVER.RESTART_PROMPT.FONT_FAMILY
      }`;
      context.fillStyle = UI_CONSTANTS.COLORS.RESTART_PROMPT;
      context.fillText(
        UI_CONSTANTS.GAME_OVER.RESTART_PROMPT.TEXT,
        this.game.width * 0.5,
        this.game.height * UI_CONSTANTS.POSITION.GAME_OVER_TEXT_Y +
          UI_CONSTANTS.POSITION.GAME_OVER_SUBTEXT_OFFSET
      );
    }

    context.restore();
  }
}
