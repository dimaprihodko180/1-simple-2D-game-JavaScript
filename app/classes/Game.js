import { Player } from "./Player.js";
import { InputHandler } from "./InputHandler.js";
import { Background } from "../background/Background.js";
import { Flying } from "./Enemies/Flying.js";
import { Climbing } from "./Enemies/Climbing.js";
import { Ground } from "./Enemies/Ground.js";
import { UI } from "./UI.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.groundMargin = 80;
    this.speed = 0;
    this.maxSpeed = 6;
    this.background = this.#initBackground(this);
    this.player = this.#initPlayer(this);
    this.input = this.#initInputHandller(this);
    this.UI = this.#initUI(this);
    this.enemies = [];
    this.particles = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.maxParticles = 200;
    this.debug = true;
    this.score = 0;
    this.fontColor = "black";
    this.player.currentState = this.player.state[0];
    this.player.currentState.enter();
  }

  update(deltaTime) {
    this.background.update();
    this.player.update(this.input.arrayOfKeys, deltaTime);
    this.#handleEnemies(deltaTime);
    this.#effects();
    this.#clearArray();
  }

  draw(context) {
    this.background.draw(context);
    this.player.draw(context);
    this.enemies.forEach((enemy) => enemy.draw(context));
    this.particles.forEach((particle) => particle.draw(context));
    this.UI.draw(context);
  }

  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5)
      this.enemies.push(new Ground(this));
    else if (this.speed > 0) this.enemies.push(new Climbing(this));

    this.enemies.push(new Flying(this));
  }

  #handleEnemies(deltaTime) {
    if (this.enemyTimer > this.enemyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
      if (enemy.markedForDeletion)
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
    });
  }

  #initPlayer(playerObject) {
    return new Player(playerObject);
  }

  #initInputHandller(inputObject) {
    return new InputHandler(inputObject);
  }

  #initBackground(backgroundObject) {
    return new Background(backgroundObject);
  }

  #initUI(uiObject) {
    return new UI(uiObject);
  }

  #effects() {
    this.particles.forEach((particle, index) => {
      particle.update();
      if (particle.markedForDeletion) this.particles.splice(index, 1);
    });
  }

  #clearArray() {
    if (this.particles.length > this.maxParticles)
      this.particles = this.particles.slice(0, this.maxParticles);
  }
}
