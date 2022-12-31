import { game } from './index';

export default class Announcer {
  announceLvlUp = false;
  announceLvlUpCounter = 0;

  constructor() {
    game.on(['up_level', 'crash'], () => (this.announceLvlUp = true));
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

    game.ctx.fillText(
      `LVL ${lvlText} | ${game.points.toString().padStart(3, '0')}`,
      40,
      40
    );
  }

  renderHiScore() {
    game.ctx.textAlign = 'right';

    if (game.highScore) {
      game.ctx.fillText(`HI: ${game.highScore}`, game.el.width - 40, 40);
    }
  }

  render() {
    this.update();
    this.renderPoints();
    this.renderHiScore();
  }
}
