import { announcer, character, obstacleManager, scenery } from './index';

export type SubUpdate = {
  event: string;
};

class Game {
  el: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  status: 'idle' | 'running' | 'crash' | 'game_over' = 'idle';
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

    this.publish('INIT');

    setTimeout(() => this.loop(), 100);
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
    if (this.status === 'running') {
      this.frame++;
      this.updatePoints();

      scenery.render();
      obstacleManager.render();
      character.render();
      announcer.render();

      requestAnimationFrame(this.render.bind(this));
    }

    if (this.status === 'idle') {
      scenery.render();
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
    this.publish('PLAY');
    this.loop();
  }

  pause() {
    this.status = 'idle';
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
    this.status = 'idle';

    this.publish('RESTART');

    setTimeout(() => this.loop(), 100);
  }
}

export default Game;
