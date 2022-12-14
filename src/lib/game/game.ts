import { CANVAS_SIZE } from './data/game/constants';
import { announcer, character, obstacleManager, scenery } from './index';
import isMobile from './utils/isMobile';

export type SubUpdate = {
  event: string;
};

class Game {
  el: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  status: 'idle' | 'pause' | 'running' | 'crash' | 'game_over' = 'idle';
  frame = 0;
  lvl = 1;
  points = 0;
  pointsCounter = 0;
  subs: ((a: SubUpdate) => void)[] = [];

  init(canvasEl: HTMLCanvasElement) {
    this.setupCanvas(canvasEl);

    this.publish('INIT');

    setTimeout(() => this.loop(), 100);
  }

  setupCanvas(canvasEl: HTMLCanvasElement) {
    this.el = canvasEl;

    const device = isMobile() ? 'mobile' : 'desktop';
    const size = CANVAS_SIZE[device];
    this.el.width = size.width;
    this.el.height = size.height;
    this.ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.font = '20px monospace';
  }

  subscribe(fn: (data: SubUpdate) => void) {
    this.subs.push(fn);
  }

  publish(event: string) {
    console.log(event);
    this.subs?.forEach((cb) => cb({ event }));
  }

  upLevel() {
    this.lvl++;
    this.publish('UP_LEVEL');
  }

  crash() {
    this.status = 'crash';
    this.publish('CRASH');
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
    scenery.render();
    character.render();

    if (this.status !== 'idle') {
      obstacleManager.render();
      announcer.render();
    }

    if (this.status === 'running') {
      this.frame++;
      this.updatePoints();

      requestAnimationFrame(this.render.bind(this));
    }
  }

  loop() {
    requestAnimationFrame(this.render.bind(this));
  }

  play() {
    if (['running', 'crash', 'game_over'].includes(this.status)) {
      return;
    }

    this.status = 'running';
    this.publish('PLAY');
    this.loop();
  }

  pause() {
    this.status = 'pause';
    this.publish('PAUSE');
  }

  die() {
    this.status = 'game_over';
    this.publish('GAME_OVER');
  }

  revive() {
    this.status = 'running';
    this.publish('REVIVE');
    this.loop();
  }

  restart() {
    this.frame = 0;
    this.points = 0;
    this.pointsCounter = 0;
    this.lvl = 1;

    this.publish('RESTART');
    this.publish('PLAY');

    this.status = 'running';

    setTimeout(() => this.loop(), 100);
  }
}

export default Game;
