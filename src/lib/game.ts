import Character from './character';
import { CHAR_HEIGHT, CHAR_OFFSET_Y } from './data/character/constants';
import { CHAR } from './data/character/data';
import obsManager from './obstacleManager';
import Scenery from './scenery';

class Game {
  status: 'running' | 'idle' = 'idle';
  scenery: Scenery;
  el: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  character: Character;
  frame = 0;
  lvl = 1;
  points = 0;
  pointsCounter = 0;
  announceLvlUp = false;
  announceLvlUpCounter = 0;

  init(canvasEl: HTMLCanvasElement) {
    this.el = canvasEl;
    this.ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.imageSmoothingEnabled = false;

    this.character = new Character({
      ...CHAR,
      y: this.el.height - CHAR_HEIGHT - CHAR_OFFSET_Y
    });
    this.scenery = new Scenery();
  }

  upLevel() {
    game.lvl++;
    this.announceLvlUp = true;
  }

  updatePoints() {
    if (this.pointsCounter === 8) {
      this.points++;
      this.pointsCounter = 0;
    } else {
      this.pointsCounter++;
    }
  }

  announce() {
    if (!this.announceLvlUp) return;

    if (this.announceLvlUpCounter > 40) {
      this.announceLvlUp = false;
      this.announceLvlUpCounter = 0;
    } else {
      this.announceLvlUpCounter++;
    }
  }

  renderPoints() {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px monospace';

    let lvlText = this.lvl.toString();

    if (this.announceLvlUp) {
      if (this.points % 2 === 0) lvlText = ' ';
    }

    this.ctx.fillText(`LVL ${lvlText} | ${this.points.toString().padStart(3, '0')}`, 40, 40);
  }

  render() {
    this.ctx.clearRect(0, 0, 800, 600);
    this.frame++;
    this.updatePoints();
    this.announce();

    this.scenery.render();
    this.renderPoints();

    obsManager.update();
    obsManager.detectCollisions(this.character);
    obsManager.render();

    this.character.render();

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
