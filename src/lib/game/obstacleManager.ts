import type Character from './character';
import { LEVEL_REQS } from './data/game/constants';
import { OBS_VARIATIONS } from './data/obstacles/data';
import type { SubUpdate } from './game';
import { character, game } from './index';
import Obstacle from './obstacle';
import isMobile from './utils/isMobile';
import { rand } from './utils/rand';

class ObstacleManager {
  obstacles: Obstacle[] = [];
  entryPoints: number[] = [];
  entryPointInd = 0;
  cleared = 0;
  previous: 'ground' | 'air' = 'ground';

  constructor() {
    const validRange = isMobile() ? [100, 500] : [350, 700];
    this.entryPoints = new Array(30).fill(0).map(() => rand(validRange[0], validRange[1]));

    game.subscribe(this.onUpdate.bind(this));
  }

  onUpdate(data: SubUpdate) {
    switch (data.event) {
      case 'RESTART':
      case 'INIT':
        this.obstacles = [];
        this.cleared = 0;
        break;

      case 'REVIVE':
        this.skipFirst();
        break;
    }
  }

  removeObstacle(id: number) {
    this.obstacles = this.obstacles.filter((obs) => obs.id !== id);
    this.cleared++;

    if (LEVEL_REQS[this.cleared]) {
      game.upLevel();
    }
  }

  skipFirst() {
    this.obstacles.shift();
  }

  detectCollisions(character: Character) {
    const collision = this.obstacles.find((obs) => obs.colides(character));

    /* if (collision) {
      game.crash();
    } */
  }

  update() {
    const lastX = this.obstacles?.[this.obstacles.length - 1]?.x;

    if (lastX > this.entryPoints[this.entryPointInd]) {
      return;
    }

    if (this.entryPointInd < this.entryPoints.length - 1) {
      this.entryPointInd++;
    } else {
      this.entryPointInd = 0;
    }

    let obsType = 0;

    if (this.previous !== 'air' && game.lvl > 2) {
      obsType = rand(0, 1);
      if (obsType) this.previous = 'air';
    }

    const obs = OBS_VARIATIONS[obsType];

    const config = {
      ...obs,
      x: game.el.width,
      y: game.el.height - obs.y
    };

    new Obstacle(config).addToScene(this.obstacles);
  }

  render() {
    this.update();
    this.detectCollisions(character);
    this.obstacles.forEach((el) => el.render());
  }
}

export default ObstacleManager;
