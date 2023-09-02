import EveryNFrame from './everyNFrame';
import game from './game';

export default class Announcer extends EveryNFrame {
  lvlUpFlash = false;

  constructor() {
    super();

    game.on('up_level', () => {
      this.onFrame(8, () => (this.lvlUpFlash = !this.lvlUpFlash), 40);
    });
  }

  renderPoints() {
    game.ctx.fillStyle = 'white';
    game.ctx.textAlign = 'left';

    const lvlText = this.lvlUpFlash ? ' ' : game.lvl.toString();

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
    this.runFrameOps();
    this.renderPoints();
    this.renderHiScore();
  }
}
