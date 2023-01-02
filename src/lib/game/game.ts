import { CANVAS_SIZE } from './data/game/constants';
import isMobile from './utils/isMobile';
import type { Event, SubUpdate, Subscribers } from './types';
import { events } from './types';
import type { Character, Announcer, Scenery, ObstacleManager } from './index';
import EveryNFrame from './everyNFrame';

class Game extends EveryNFrame {
  el: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  character: Character;
  announcer: Announcer;
  scenery: Scenery;
  obstacleManager: ObstacleManager;

  status: 'idle' | 'pause' | 'running' | 'crash' | 'game_over' = 'idle';
  frame = 0;
  lvl = 1;
  points = 0;
  pointsCounter = 0;
  highScore = 0;
  subs: Subscribers = {} as Subscribers;

  init(config: {
    canvasEl: HTMLCanvasElement;
    character: Character;
    announcer: Announcer;
    scenery: Scenery;
    obstacleManager: ObstacleManager;
  }) {
    this.setupCanvas(config.canvasEl);
    this.attachListeners();
    this.getHiScore();
    this.onFrame(8, () => this.points++);

    this.character = config.character;
    this.announcer = config.announcer;
    this.scenery = config.scenery;
    this.obstacleManager = config.obstacleManager;

    this.publish('init');

    setTimeout(() => this.loop(), 100);
  }

  on(event: Event | Event[] | 'all', fn: (data: SubUpdate) => void) {
    let evt = event;

    if (evt === 'all') {
      evt = [...events];
    } else if (!Array.isArray(evt)) {
      evt = [evt];
    }

    evt.forEach((channel) => {
      const current = this.subs?.[channel] || [];
      this.subs[channel] = [...current, fn];
    });
  }

  publish(event: Event) {
    this.subs[event].forEach((cb) => cb({ event, status: this.status }));
  }

  attachListeners() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(evt: KeyboardEvent) {
    if (evt.code === 'Space') {
      if (this.status === 'pause') {
        this.play();
      } else if (this.status === 'running') {
        this.pause();
      }
    }
  }

  saveHiScore() {
    if (this.points > this.highScore) {
      this.highScore = this.points;
      localStorage.setItem('score', this.points.toString());
    }
  }

  getHiScore() {
    const sc = localStorage.getItem('score');

    this.highScore = Number(sc);
  }

  setupCanvas(canvasEl: HTMLCanvasElement) {
    this.el = canvasEl;

    const device = isMobile() ? 'mobile' : 'desktop';
    const size = CANVAS_SIZE[device];
    this.el.width = size.width;
    this.el.height = size.height;
    this.ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.font = '18px IBM Plex Mono';
  }

  upLevel() {
    this.lvl++;
    this.publish('up_level');
  }

  crash() {
    this.status = 'crash';
    this.publish('crash');
  }

  render() {
    this.scenery.render();
    this.character.render();

    if (this.status !== 'idle') {
      this.announcer.render();
      this.obstacleManager.render();
    }

    if (this.status === 'running') {
      this.frame++;
      this.runFrameOps();

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
    this.publish('play');

    setTimeout(() => this.loop(), 200);
  }

  pause() {
    this.status = 'pause';
    this.publish('pause');
  }

  die() {
    this.status = 'game_over';
    this.saveHiScore();
    this.publish('game_over');
  }

  revive() {
    this.status = 'running';
    this.publish('revive');
    this.loop();
  }

  restart() {
    this.frame = 0;
    this.points = 0;
    this.pointsCounter = 0;
    this.lvl = 1;
    this.status = 'running';

    this.publish('restart');
    this.publish('play');

    setTimeout(() => this.loop(), 100);
  }
}

const game = new Game();

export default game;
