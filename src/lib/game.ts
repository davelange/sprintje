import Character from './character';
import {
  CHAR_HEIGHT,
  CHAR_OFFSET_X,
  CHAR_OFFSET_Y,
  LEVEL_REQS,
  OBSTACLE_VARIATIONS
} from './constants';
import Obstacle from './obstacle';
import { rand } from './utils/rand';

class Game {
  status: 'running' | 'idle' = 'idle';
  el: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  character: Character;
  obstacles: Obstacle[] = [];
  frame = 0;
  lvl: 1 | 2 | 3 | 4 = 1;
  clearedObs = 0;

  init(canvasEl: HTMLCanvasElement) {
    this.el = canvasEl;
    this.ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;

    new Character({
      width: 50,
      height: CHAR_HEIGHT,
      x: CHAR_OFFSET_X,
      y: this.el.offsetHeight - CHAR_HEIGHT - CHAR_OFFSET_Y
    }).addToScene();
  }

  addCharacter(el: Character) {
    this.character = el;
  }

  addObstacle(el: Obstacle) {
    this.obstacles.push(el);
  }

  removeObstacle(id: number) {
    this.obstacles = this.obstacles.filter((obs) => obs.id !== id);
    this.clearedObs++;
    console.log(this.clearedObs);

    if (LEVEL_REQS[this.clearedObs]) {
      console.log(`${this.clearedObs} cleared, move to level ${this.lvl + 1}`);
      this.lvl++;
    }
  }

  detectCollisions() {
    const collision = this.obstacles.find((obs) => obs.colides(this.character));

    if (collision) {
      this.status = 'idle';
    }
  }

  manageObstacles() {
    const lastObsPos = this.obstacles?.[this.obstacles.length - 1]?.x;

    if (lastObsPos && lastObsPos > 200) {
      return;
    }

    const randObs = OBSTACLE_VARIATIONS[rand(0, 3)];
    const config = {
      x: this.el.width,
      y: this.el.offsetHeight - randObs.height - CHAR_OFFSET_Y,
      ...randObs
    };

    new Obstacle(config).addToScene();
  }

  render() {
    this.ctx.clearRect(0, 0, 800, 600);
    this.frame++;

    this.detectCollisions();
    this.manageObstacles();

    this.character.render();
    this.obstacles.forEach((el) => el.render());

    if (this.status === 'running') {
      requestAnimationFrame(this.render.bind(this));
    }
  }

  loop() {
    requestAnimationFrame(this.render.bind(this));
  }

  play() {
    if (this.status === 'running') {
      return;
    }

    this.status = 'running';
    this.character.state = 'running';
    this.loop();
  }

  pause() {
    this.status = 'idle';
  }
}

const game = new Game();

export default game;
