import type Character from './character';
import { CLEAR_REQUIREMENT } from './data/game/constants';
import { OBS_VARIATIONS } from './data/obstacles/data';
import game from './game';
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
    this.entryPoints = new Array(30)
      .fill(0)
      .map(() => rand(validRange[0], validRange[1]));

    game.on(['restart', 'init'], () => {
      this.obstacles = [];
      this.cleared = 0;
    });
    game.on('revive', () => {
      this.skipFirst();
    });
  }

  removeObstacle(id: number) {
    this.obstacles = this.obstacles.filter((obs) => obs.id !== id);
    this.cleared++;

    if (this.cleared === CLEAR_REQUIREMENT) {
      game.upLevel();
      this.cleared = 0;
    }
  }

  skipFirst() {
    this.obstacles.shift();
  }

  detectCollisions(character: Character) {
    const collision = this.obstacles.find((obs) => obs.colides(character));

    if (collision) {
      game.crash();
    }
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

    let obsType = rand(0, 2);
    let yMotionType: 'rake' | 'bounce' = 'bounce';

    if (game.lvl > 1) {
      if (this.previous === 'ground') {
        obsType = rand(0, 3);

        if (obsType) {
          this.previous = 'air';
        } else {
          yMotionType = rand(0, 1) ? 'rake' : 'bounce';
        }
      } else {
        this.previous = 'ground';
      }
    }

    const obs = OBS_VARIATIONS[obsType];

    const config = {
      ...obs,
      x: game.el.width,
      y: game.el.height - obs.y,
      yMotionType
    };

    new Obstacle(config).addToScene(this.obstacles);
  }

  render() {
    this.update();
    this.obstacles.forEach((el) => el.render());
    this.detectCollisions(game.character);
  }
}

export default ObstacleManager;
