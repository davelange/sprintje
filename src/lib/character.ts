import { easeOutCirc } from './utils/ease';
import { JUMP_DURATION, JUMP_HEIGHT } from './constants';
import Element, { type ElementConfig } from './element';
import game from './game';

class Character extends Element {
  state: 'idle' | 'running' | 'jump_asc' | 'jump_desc' | 'crouching' = 'idle';
  initial = {
    x: 0,
    y: 0,
    height: 0
  };
  jumpProgress = 0;
  easeAcc = 0;
  jumpPoints: number[] = [];

  constructor(config: ElementConfig) {
    super(config);

    this.initial = { x: this.x, y: this.y, height: this.height };
    this.attachListeners();

    return this;
  }

  addToScene() {
    game.addCharacter(this);
  }

  attachListeners() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyDown(evt: KeyboardEvent) {
    switch (evt.code) {
      case 'ArrowUp':
        if (this.state === 'running') {
          this.state = 'jump_asc';
        }
        break;

      case 'ArrowDown':
        if (this.state === 'running') {
          this.startCrouching();
        }
        break;
    }
  }

  handleKeyUp(evt: KeyboardEvent) {
    switch (evt.code) {
      case 'ArrowDown': {
        this.endCrouching();
      }
    }
  }

  startCrouching() {
    this.state = 'crouching';
    this.height = this.initial.height / 2;
    this.y += this.initial.height / 2;
  }

  endCrouching() {
    this.state = 'running';
    this.height = this.initial.height;
    this.y = this.initial.y;
  }

  calcJumpMotion() {
    const progressDecimal = (this.jumpProgress * 100) / JUMP_DURATION / 100;
    const easedVal = easeOutCirc(progressDecimal);
    const frameEase = easedVal - this.easeAcc;
    const point = this.y - frameEase * JUMP_HEIGHT;

    this.y = point;
    this.easeAcc += frameEase;
    this.jumpPoints.push(point);
  }

  update() {
    switch (this.state) {
      case 'jump_asc':
        if (this.jumpProgress < JUMP_DURATION) {
          if (this.jumpPoints.length < JUMP_DURATION) {
            this.calcJumpMotion();
          } else {
            this.y = this.jumpPoints[this.jumpProgress];
          }

          this.jumpProgress++;
        } else {
          this.state = 'jump_desc';
          this.easeAcc = 0;
        }
        break;

      case 'jump_desc':
        if (this.jumpProgress > 0) {
          this.jumpProgress--;
          this.y = this.jumpPoints[this.jumpProgress];
        } else {
          this.state = 'running';
          this.y = this.initial.y;
        }
        break;
    }
  }

  render() {
    this.update();

    game.ctx.fillStyle = 'rgb(200, 0, 0)';
    game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Character;
