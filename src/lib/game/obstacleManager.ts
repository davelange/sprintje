import type Character from './character';
import { LEVEL_REQS } from './data/game/constants';
import { OBS_VARIATIONS } from './data/obstacles/data';
import type { SubUpdate } from './game';
import { character, game } from './index';
import Obstacle from './obstacle';
import { rand } from './utils/rand';

class ObstacleManager {
  obstacles: Obstacle[] = [];
  entryPoints: number[] = [];
  entryPointInd = 0;
  cleared = 0;
  log: number[] = [];

  constructor() {
    this.entryPoints = new Array(30).fill(0).map(() => rand(350, 700));
  }

  onUpdate(data: SubUpdate) {
    switch (data.event) {
      case 'RESTART':
        this.obstacles = [];
        this.cleared = 0;
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

    let obsInd = 0;

    if (game.lvl > 2) {
      obsInd = rand(0, 1);
    }

    const obs = OBS_VARIATIONS[obsInd];

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