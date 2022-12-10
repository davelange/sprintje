import Announcer from './announcer';
import Character from './character';
import { CHAR_HEIGHT, CHAR_OFFSET_Y } from './data/character/constants';
import { CHAR } from './data/character/data';
import obsManager from './obstacleManager';
import Scenery from './scenery';

export type SubUpdate = {
  event: string;
};

class Game {
  status: 'running' | 'idle' | 'crash' = 'idle';
  scenery: Scenery;
  el: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  character: Character;
  announcer: Announcer;
  frame = 0;
  lvl = 1;
  points = 0;
  pointsCounter = 0;
  subs: ((a: SubUpdate) => void)[] = [];

  init(canvasEl: HTMLCanvasElement) {
    this.el = canvasEl;
    this.ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.font = '20px monospace';

    this.character = new Character({
      ...CHAR,
      y: this.el.height - CHAR_HEIGHT - CHAR_OFFSET_Y
    });
    this.scenery = new Scenery();
    this.announcer = new Announcer();
  }

  subscribe(fn: any) {
    this.subs.push(fn);
  }

  update(event: string) {
    this.subs?.forEach((cb) => cb({ event }));
  }

  upLevel() {
    this.lvl++;
    this.update('UP_LEVEL');
  }

  crash() {
    this.status = 'crash';
    this.update('CRASH');
  }

  updatePoints() {
    if (this.pointsCounter === 8) {
      this.points++;
      this.pointsCounter = 0;
    } else {
      this.pointsCounter++;
    }
  }

  render() {
    this.frame++;
    this.announcer.render();

    if (this.status === 'running') {
      this.updatePoints();
      this.scenery.render();

      obsManager.update();
      obsManager.detectCollisions(this.character);
      obsManager.render();

      this.character.render();
    }

    requestAnimationFrame(this.render.bind(this));
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

  restart() {
    this.frame = 0;
    this.points = 0;
    this.pointsCounter = 0;
    this.lvl = 0;
    obsManager.restart();
    this.status = 'running';
    this.loop();
  }
}

const game = new Game();

export default game;
