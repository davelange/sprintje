import type Character from './character';
import { OBS_VARIATIONS } from './data/obstacles/data';
import game from './game';
import Obstacle from './obstacle';
import { rand } from './utils/rand';
import { CHAR_OFFSET_Y, LEVEL_REQS } from './_constants';

class ObstacleManager {
  obstacles: Obstacle[] = [];
  entryPoints: number[] = [];
  entryPointInd = 0;
  cleared = 0;
  log: number[] = [];

  constructor() {
    this.entryPoints = new Array(30).fill(0).map((_) => rand(350, 700));
    console.log(this.entryPoints)
  }

  removeObstacle(id: number) {
    this.obstacles = this.obstacles.filter((obs) => obs.id !== id);
    this.cleared++;

    if (LEVEL_REQS[this.cleared]) {
      console.log(`${this.cleared} cleared, move to level ${game.lvl + 1}`);
      game.lvl++;
    }
  }

  detectCollisions(character: Character) {
    const collision = this.obstacles.find((obs) => obs.colides(character));

    if (collision) {
      /* this.status = 'idle'; */
      // console.log('dead!');
    }
  }

  update() {
    /* lower values = closer to exiting */
    const lastX = this.obstacles?.[this.obstacles.length - 1]?.x;

    if (lastX > this.entryPoints[this.entryPointInd]) {
      return;
    }

    console.log(lastX);

    this.entryPointInd++;
    const randObs = OBS_VARIATIONS[0];

    const config = {
      x: game.el.width,
      y: game.el.height - randObs.height - CHAR_OFFSET_Y,
      ...randObs
    };

    new Obstacle(config).addToScene(this.obstacles);
  }

  render() {
    this.obstacles.forEach((el) => el.render());
  }
}

const obsManager = new ObstacleManager();

export default obsManager;
