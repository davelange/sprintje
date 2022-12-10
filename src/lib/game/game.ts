import { announcer, character, obstacleManager, scenery } from './index';

export type SubUpdate = {
  event: string;
};

class Game {
  el: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  status: 'running' | 'idle' | 'crash' = 'idle';
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

    this.update('INIT');
  }

  subscribe(fn: (data: SubUpdate) => void) {
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

    if (this.status === 'running') {
      this.updatePoints();

      scenery.render();
      obstacleManager.render();
      character.render();
    }

    announcer.render();

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
    this.update('PLAY');
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
    obstacleManager.restart();
    this.status = 'running';
    this.loop();
  }
}

export default Game;
