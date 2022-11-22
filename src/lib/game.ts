import Character from './character';
import { CHAR_HEIGHT, CHAR_OFFSET_Y } from './data/character/constants';
import { CHAR } from './data/character/data';
import { LEVEL_REQS } from './data/game/constants';
import { OBS_DIST, OBS_RESET_DIST, OBS_RESET_FREQ } from './data/obstacles/constants';
import { OBS_VARIATIONS } from './data/obstacles/data';
import Obstacle from './obstacle';
import Scenery from './scenery';
import { rand } from './utils/rand';

class Game {
  status: 'running' | 'idle' = 'idle';
  scenery: any;
  el: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  character: Character;
  obstacles: Obstacle[] = [];
  frame = 0;
  lvl: 1 | 2 | 3 | 4 = 1;
  clearedObs = 0;
  obsLog: number[] = [];
  obsCycle = 0;

  init(canvasEl: HTMLCanvasElement) {
    this.el = canvasEl;
    this.ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;

    new Character({
      ...CHAR,
      y: this.el.height - CHAR_HEIGHT - CHAR_OFFSET_Y
    }).addToScene();

    this.scenery = new Scenery();
  }

  addCharacter(el: Character) {
    this.character = el;
  }

  removeObstacle(id: number) {
    this.obstacles = this.obstacles.filter((obs) => obs.id !== id);
    this.clearedObs++;

    if (LEVEL_REQS[this.clearedObs]) {
      console.log(`${this.clearedObs} cleared, move to level ${this.lvl + 1}`);
      this.lvl++;
    }
  }

  detectCollisions() {
    const collision = this.obstacles.find((obs) => obs.colides(this.character));

    /* if (collision) {
      this.status = 'idle';
    } */
  }

  getObsMaxDistance() {
    /* const cycleReset = OBS_RESET_FREQ[this.lvl];

    if (this.obsCycle === cycleReset) {
      return OBS_RESET_DIST;
    } */

    return OBS_DIST[this.lvl] - rand(0, 100);
  }

  manageObstacles() {
    const lastObsX = this.obstacles?.[this.obstacles.length - 1]?.x;
    const maxDist = this.getObsMaxDistance();

    if (lastObsX && lastObsX >= maxDist) {
      return;
    }

    const randInd = rand(0, OBS_VARIATIONS.length - 1);
    /* const recentOccurences = this.obsLog.slice(-5).filter((n) => n === randInd).length;

    if (recentOccurences > 3) {
      return;
    } */

    const randObs = OBS_VARIATIONS[randInd];
    const config = {
      x: this.el.width,
      y: this.el.height - randObs.height - CHAR_OFFSET_Y,
      ...randObs
    };
    this.obsLog.push(randInd);

    if (this.obsCycle === 6) {
      this.obsCycle = 0;
    } else {
      this.obsCycle++;
    }

    new Obstacle(config).addToScene(this.obstacles);
  }

  render() {
    this.ctx.clearRect(0, 0, 800, 600);
    this.frame++;

    this.detectCollisions();
    this.manageObstacles();

    this.scenery.render();
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
