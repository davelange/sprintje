import { ease, type Easing } from './utils/ease';
import Element, { type ElementConfig } from './element';
import game from './game';
import {
  CHAR_HEIGHT,
  CHAR_OFFSET_X,
  CHAR_OFFSET_Y,
  type MotionType
} from './data/character/constants';
import { DEBUG_BOX } from './data/game/constants';
import { closeToEndOfMotion, getDuration } from './data/character/utils';

class Character extends Element {
  state:
    | 'intro'
    | 'idle'
    | 'running'
    | 'jumpAsc'
    | 'jumpDesc'
    | 'crouchAsc'
    | 'crouchDesc' = 'idle';
  initial = {
    x: 0,
    y: 0,
    height: 0
  };
  motionProgress = 0;
  easeAcc = 0;

  constructor(config: ElementConfig) {
    super(config);

    this.initial = { x: this.x, y: this.y, height: this.height };
    this.attachListeners();

    game.on('init', () => {
      this.x = game.el.width / 2 - this.width;
      this.y = game.el.height - CHAR_HEIGHT - CHAR_OFFSET_Y;
      this.initial.y = this.y;
    });
    game.on('play', () => {
      if (this.state === 'idle') {
        this.state = 'intro';
      }
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

  forceMotion(motion: MotionType) {
    this.state = 'running';

    this.afterFrames(1, () => {
      this.resetMotionTracking();
      this.state = motion;
    });
  }

  jump() {
    if (this.state == 'running') {
      this.resetMotionTracking();
      this.state = 'jumpAsc';

      return;
    }

    if (
      this.state === 'jumpDesc' &&
      closeToEndOfMotion(
        this.motionProgress,
        getDuration(this.state as MotionType)
      )
    ) {
      this.forceMotion('jumpAsc');
    }
  }

  crouch() {
    if (this.state == 'running') {
      this.state = 'crouchDesc';

      return;
    }

    if (
      this.state === 'crouchAsc' &&
      closeToEndOfMotion(
        this.motionProgress,
        getDuration(this.state as MotionType)
      )
    ) {
      this.forceMotion('crouchDesc');
    }
  }

  moveWithEase(force: number, motion: MotionType, easing: Easing) {
    const progressDecimal =
      (this.motionProgress * 100) / getDuration(motion) / 100;
    const easedVal = ease(progressDecimal, easing);
    const frameEase = easedVal - this.easeAcc;

    this.y += frameEase * force;
    this.easeAcc += frameEase;
  }

  resetMotionTracking() {
    this.motionProgress = 0;
    this.easeAcc = 0;
  }

  jumpOrCrouch(motion: MotionType) {
    const isAsc = motion.endsWith('Asc');

    if (this.motionProgress < getDuration(motion)) {
      this.moveWithEase(
        isAsc ? -100 : 100,
        motion,
        ['jumpAsc', 'crouchDesc'].includes(motion)
          ? 'easeOutCirc'
          : 'easeOutBounce'
      );
      this.motionProgress++;
    } else {
      this.resetMotionTracking();

      switch (this.state) {
        case 'jumpAsc':
          this.state = 'jumpDesc';
          break;

        case 'crouchDesc':
          this.state = 'crouchAsc';
          break;

        default:
          this.y = this.initial.y;
          this.state = 'running';
          break;
      }
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

      case 'jumpAsc':
      case 'jumpDesc':
      case 'crouchAsc':
      case 'crouchDesc':
        this.jumpOrCrouch(this.state);
        break;
    }
  }

  render() {
    if (!this.imgReady) {
      return;
    }

    this.update();
    this.manageSprite();
    this.runFrameOps();

    if (DEBUG_BOX) {
      game.ctx.strokeStyle = 'rgb(0, 0, 0)';
      game.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    game.ctx.drawImage(this.imgBtmp[this.spriteInd], this.x - 10, this.y - 10);
  }
}

export default Character;
