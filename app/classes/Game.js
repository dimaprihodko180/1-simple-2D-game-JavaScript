import { Player } from "./Player.js";
import { InputHandler } from "./InputHandler.js";
import { Background } from "../background/Background.js";
import { Flying } from "./Enemies/Flying.js";
import { Climbing } from "./Enemies/Climbing.js";
import { Ground } from "./Enemies/Ground.js";
import { UI } from "./UI.js";

const GAME_CONSTANTS = {
  GROUND_MARGIN: 80,
  MAX_SPEED: 6,
  ENEMY_INTERVAL: 1000,
  MAX_PARTICLES: 200,
  MAX_TIME: 10000,
  FONT_COLOR: "black",
  INITIAL_LIVES: 1,
};

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.groundMargin = GAME_CONSTANTS.GROUND_MARGIN;
    this.speed = 0;
    this.maxSpeed = GAME_CONSTANTS.MAX_SPEED;
    this.background = this.initBackground();
    this.player = this.initPlayer();
    this.input = this.initInputHandler();
    this.UI = this.initUI();
    this.enemies = [];
    this.particles = [];
    this.collisions = [];
    this.floatingMessages = [];
    this.enemyTimer = 0;
    this.enemyInterval = GAME_CONSTANTS.ENEMY_INTERVAL;
    this.maxParticles = GAME_CONSTANTS.MAX_PARTICLES;
    this.debug = false;
    this.score = 0;
    this.fontColor = GAME_CONSTANTS.FONT_COLOR;
    this.time = 0;
    this.maxTime = GAME_CONSTANTS.MAX_TIME;
    this.lives = GAME_CONSTANTS.INITIAL_LIVES;
    this.gameOver = false;
    this.player.currentState = this.player.state[0];
    this.player.currentState.enter();
  }

  update(deltaTime) {
    this.updateTime(deltaTime);
    this.background.update();
    this.player.update(this.input.arrayOfKeys, deltaTime);
    this.updateEnemies(deltaTime);
    this.updateMessages();
    this.updateEffects();
    this.clearParticles();
    this.filterMarkedEntities();
  }

  updateTime(deltaTime) {
    this.time += deltaTime;
    if (this.time > this.maxTime) {
      this.gameOver = true;
    }
  }

  updateEnemies(deltaTime) {
    if (this.enemyTimer > this.enemyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
    this.enemies.forEach((enemy) => enemy.update(deltaTime));
  }

  updateMessages() {
    this.floatingMessages.forEach((message) => message.update());
  }

  updateEffects() {
    this.particles.forEach((particle) => particle.update());
  }

  clearParticles() {
    if (this.particles.length > this.maxParticles) {
      this.particles.length = this.maxParticles;
    }
  }

  filterMarkedEntities() {
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    this.particles = this.particles.filter(
      (particle) => !particle.markedForDeletion
    );
    this.collisions = this.collisions.filter(
      (collision) => !collision.markedForDeletion
    );
    this.floatingMessages = this.floatingMessages.filter(
      (message) => !message.markedForDeletion
    );
  }

  draw(context) {
    this.background.draw(context);
    this.player.draw(context);
    this.enemies.forEach((enemy) => enemy.draw(context));
    this.particles.forEach((particle) => particle.draw(context));
    this.collisions.forEach((collision) => collision.draw(context));
    this.floatingMessages.forEach((message) => message.draw(context));
    this.UI.draw(context);
  }

  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5) {
      this.enemies.push(new Ground(this));
    } else if (this.speed > 0) {
      this.enemies.push(new Climbing(this));
    }
    this.enemies.push(new Flying(this));
  }

  initPlayer() {
    return new Player(this);
  }

  initInputHandler() {
    return new InputHandler(this);
  }

  initBackground() {
    return new Background(this);
  }

  initUI() {
    return new UI(this);
  }
}
