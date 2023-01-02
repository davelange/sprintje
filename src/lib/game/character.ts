import { easeOutCirc } from './utils/ease';
import Element, { type ElementConfig } from './element';
import { game } from './index';
import {
  CHAR_HEIGHT,
  CHAR_OFFSET_X,
  CHAR_OFFSET_Y,
  JUMP_DURATION,
  JUMP_HEIGHT
} from './data/character/constants';
import { DEBUG_BOX } from './data/game/constants';
import isMobile from './utils/isMobile';

class Character extends Element {
  state:
    | 'intro'
    | 'idle'
    | 'running'
    | 'jump_asc'
    | 'jump_desc'
    | 'crouch_asc'
    | 'crouch_desc' = 'idle';
  initial = {
    x: 0,
    y: 0,
    height: 0
  };
  motionDuration = 0;
  motionProgress = 0;
  easeAcc = 0;
  motionPoints = {
    jump: [] as number[],
    crouch: [] as number[]
  };

  constructor(config: ElementConfig) {
    super(config);

    this.initial = { x: this.x, y: this.y, height: this.height };
    this.motionDuration = JUMP_DURATION[isMobile() ? 'mobile' : 'desktop'];
    this.attachListeners();

    game.on('play', () => (this.state = 'intro'));
    game.on('init', () => {
      this.x = game.el.width / 2 - this.width;
      this.y = game.el.height - CHAR_HEIGHT - CHAR_OFFSET_Y;
      this.initial.y = this.y;
    });
    game.on('restart', () => {
      this.y = game.el.height - CHAR_HEIGHT - CHAR_OFFSET_Y;
      this.initial.y = this.y;
      this.state = 'running';
    });

    return this;
  }

  attachListeners() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(evt: KeyboardEvent) {
    switch (evt.code) {
      case 'ArrowUp':
        this.jump();
        break;

      case 'ArrowDown':
        this.crouch();
        break;
    }
  }

  jump() {
    if (this.state == 'running') {
      this.state = 'jump_asc';
    }
  }

  crouch() {
    if (this.state == 'running') {
      this.state = 'crouch_asc';
    }
  }

  calcEasedMotion(motion: 'jump' | 'crouch') {
    const progressDecimal =
      (this.motionProgress * 100) / this.motionDuration / 100;
    const easedVal = easeOutCirc(progressDecimal);
    const frameEase = easedVal - this.easeAcc;

    let point = 0;

    if (motion === 'crouch') {
      point = this.y + frameEase * JUMP_HEIGHT;
    } else if (motion === 'jump') {
      point = this.y - frameEase * JUMP_HEIGHT;
    }

    this.y = point;
    this.easeAcc += frameEase;
    this.motionPoints[motion].push(point);
  }

  jumpOrCrouchAsc(motion: 'jump' | 'crouch') {
    if (this.motionProgress < this.motionDuration) {
      if (this.motionPoints[motion].length < this.motionDuration) {
        this.calcEasedMotion(motion);
      } else {
        this.y = this.motionPoints[motion][this.motionProgress];
      }

      this.motionProgress++;
    } else {
      this.state = motion === 'jump' ? 'jump_desc' : 'crouch_desc';
      this.easeAcc = 0;
    }
  }

  jumpOrCrouchDesc(motion: 'jump' | 'crouch') {
    if (this.motionProgress > 0) {
      this.motionProgress--;
      this.y = this.motionPoints[motion][this.motionProgress];
    } else {
      this.state = 'running';
      this.y = this.initial.y;
    }
  }

  update() {
    switch (this.state) {
      case 'intro':
        this.x -= 4;

        if (this.x < CHAR_OFFSET_X) {
          this.state = 'running';
        }

        break;

      case 'jump_asc':
        this.jumpOrCrouchAsc('jump');
        break;

      case 'jump_desc':
        this.jumpOrCrouchDesc('jump');
        break;

      case 'crouch_asc':
        this.jumpOrCrouchAsc('crouch');
        break;

      case 'crouch_desc':
        this.jumpOrCrouchDesc('crouch');
        break;
    }
  }

  render() {
    if (!this.imgReady) {
      return;
    }

    this.update();
    this.manageSprite();

    if (DEBUG_BOX) {
      game.ctx.strokeStyle = 'rgb(0, 0, 0)';
      game.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    game.ctx.drawImage(this.imgBtmp[this.spriteInd], this.x - 10, this.y - 10);
  }
}

export default Character;
