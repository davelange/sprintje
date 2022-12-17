import { game } from './index';
import type { SubUpdate } from './game';

export default class Announcer {
  announceLvlUp = false;
  announceLvlUpCounter = 0;

  constructor() {
    game.subscribe(this.onUpdate.bind(this));
  }

  onUpdate(data: SubUpdate) {
    switch (data.event) {
      case 'UP_LEVEL':
      case 'CRASH':
        this.announceLvlUp = true;

        break;

      default:
        break;
    }
  }

  update() {
    if (!this.announceLvlUp) return;

    if (this.announceLvlUpCounter > 40) {
      this.announceLvlUp = false;
      this.announceLvlUpCounter = 0;
    } else {
      this.announceLvlUpCounter++;
    }
  }

  renderPoints() {
    game.ctx.fillStyle = 'white';
    game.ctx.textAlign = 'left';
    let lvlText = game.lvl.toString();

    if (this.announceLvlUp) {
      if (game.points % 2 === 0) lvlText = ' ';
    }

    game.ctx.fillText(`LVL ${lvlText} | ${game.points.toString().padStart(3, '0')}`, 40, 40);
  }

  render() {
    this.update();
    this.renderPoints();
  }
}
