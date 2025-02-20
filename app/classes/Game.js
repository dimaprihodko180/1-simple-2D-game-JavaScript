import { Player } from "./Player.js";
import { InputHandler } from "./InputHandler.js";
import { Background } from "../Background/Background.js";
import { Flying } from "./Enemies/Flying.js";
import { Climbing } from "./Enemies/Climbing.js";
import { Ground } from "./Enemies/Ground.js";
import { UI } from "./UI.js";

export const GAME_CONSTANTS = {
  GROUND_MARGIN: 80,
  MAX_SPEED: 6,
  ENEMY_INTERVAL: 1000,
  MAX_PARTICLES: 200,
  MAX_TIME_MIN: 0.3,
  INITIAL_LIVES: 10,
  FONT_COLOR: "black",
  DEBUG_MODE: false,
  SCORE: 0,
};

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.groundMargin = GAME_CONSTANTS.GROUND_MARGIN;
    this.speed = 0;
    this.maxSpeed = GAME_CONSTANTS.MAX_SPEED;
    this.Background = this.initBackground(this);
    this.player = this.initPlayer(this);
    this.input = this.initInputHandler(this);
    this.UI = this.initUI(this);
    this.enemies = [];
    this.particles = [];
    this.collisions = [];
    this.floatingMessages = [];
    this.enemyTimer = 0;
    this.enemyInterval = GAME_CONSTANTS.ENEMY_INTERVAL;
    this.maxParticles = GAME_CONSTANTS.MAX_PARTICLES;
    this.debug = GAME_CONSTANTS.DEBUG_MODE;
    this.score = GAME_CONSTANTS.SCORE;
    this.fontColor = GAME_CONSTANTS.FONT_COLOR;
    this.time = 0;
    this.maxTime = GAME_CONSTANTS.MAX_TIME_MIN * 60 * 1000;
    this.lives = GAME_CONSTANTS.INITIAL_LIVES;
    this.gameOver = false;
    this.player.currentState = this.player.state[0];
    this.player.currentState.enter();
  }

  update(deltaTime) {
    this.time += deltaTime;
    if (this.time > this.maxTime) {
      this.gameOver = true;
    }
    this.Background.update();
    this.player.update(this.input.arrayOfKeys, deltaTime);
    this.handleEnemies(deltaTime);
    this.handleMessage();
    this.effects();
    this.clearArray();
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    this.particles = this.particles.filter(
      (particle) => !particle.markedForDeletion
    );
    this.collisions = this.collisions.filter(
      (collision) => !collision.markedForDeletion
    );
    this.floatingMessages = this.floatingMessages.filter(
      (floatingMessage) => !floatingMessage.markedForDeletion
    );
  }

  draw(context) {
    this.Background.draw(context);
    this.player.draw(context);
    this.enemies.forEach((enemy) => enemy.draw(context));
    this.particles.forEach((particle) => particle.draw(context));
    this.collisions.forEach((collision) => collision.draw(context));
    this.floatingMessages.forEach((floatingMessage) =>
      floatingMessage.draw(context)
    );
    this.UI.draw(context);
  }

  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5)
      this.enemies.push(new Ground(this));
    else if (this.speed > 0) this.enemies.push(new Climbing(this));

    this.enemies.push(new Flying(this));
  }

  handleEnemies(deltaTime) {
    if (this.enemyTimer > this.enemyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
    });
  }

  initPlayer(playerObject) {
    return new Player(playerObject);
  }

  initInputHandler(inputObject) {
    return new InputHandler(inputObject);
  }

  initBackground(backgroundObject) {
    return new Background(backgroundObject);
  }

  initUI(uiObject) {
    return new UI(uiObject);
  }

  effects() {
    this.particles.forEach((particle) => {
      particle.update();
    });
  }

  clearArray() {
    if (this.particles.length > this.maxParticles)
      this.particles.length = this.maxParticles;
  }

  handleMessage() {
    this.floatingMessages.forEach((floatingMessage) =>
      floatingMessage.update()
    );
  }

  handleCollisionSPrites(deltaTime) {
    this.collisions.forEach((collision) => {
      collision.update(deltaTime);
    });
  }
}
