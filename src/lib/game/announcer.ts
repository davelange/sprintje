import { game } from './index';
import type { SubUpdate } from './game';

export default class Announcer {
  announceLvlUp = false;
  announceLvlUpCounter = 0;

  constructor() {
    game.subscribe(this.onUpdate.bind(this));
  }

  onUpdate(data: SubUpdate) {
    if (data.event === 'UP_LEVEL' || data.event === 'CRASH') {
      this.announceLvlUp = true;
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
