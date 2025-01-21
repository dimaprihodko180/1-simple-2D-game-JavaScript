import { Player } from "./Player.js";
import { InputHandler } from "./InputHandler.js";
import { Background } from "../background/Background.js";
import { Flying } from "./Enemies/Flying.js";
import { Climbing } from "./Enemies/Climbing.js";
import { Ground } from "./Enemies/Ground.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.groundMargin = 80;
    this.speed = 0;
    this.maxSpeed = 6;
    this.background = this.#initBackground(this);
    this.player = this.#initPlayer(this);
    this.input = this.#initInputHandller();
    this.enemies = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
  }

  update(deltaTime) {
    this.background.update();
    this.player.update(this.input.arrayOfKeys, deltaTime);
    this.#handleEnemies(deltaTime);
  }

  draw(context) {
    this.background.draw(context);
    this.player.draw(context);
    this.enemies.forEach((enemy) => enemy.draw(context));
  }

  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5)
      this.enemies.push(new Ground(this));
    else if (this.speed > 0) this.enemies.push(new Climbing(this));

    this.enemies.push(new Flying(this));
  }

  #initPlayer(playerObject) {
    return new Player(playerObject);
  }

  #initInputHandller() {
    return new InputHandler();
  }

  #initBackground(backgroundObject) {
    return new Background(backgroundObject);
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
}
