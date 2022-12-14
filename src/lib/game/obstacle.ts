import { DEBUG_BOX } from './data/game/constants';
import { OBS_SPEED } from './data/obstacles/constants';
import Element, { type ElementConfig } from './element';
import { game, obstacleManager } from './index';

class Obstacle extends Element {
  enabled = true;
  yMotion = 0;
  yMotionModifier = 0;

  constructor(config: ElementConfig) {
    super(config);

    this.yMotionModifier = this.id % 2 === 0 ? 1 : -1;

    return this;
  }

  manageYMotion() {
    if (this.yMotion === 15) {
      this.yMotion = 0;

      return;
    }

    if (this.yMotion === 5) {
      this.y -= this.yMotionModifier;
    } else if (this.yMotion == 10) {
      this.y += this.yMotionModifier;
    }

    this.yMotion++;
  }

  update() {
    if (!this.enabled) return;

    this.x -= OBS_SPEED[game.lvl];

    if (this.x + this.width < 0) {
      this.enabled = false;
      obstacleManager.removeObstacle(this.id);
    }
  }

  render() {
    if (!this.imgReady) {
      return;
    }

    this.manageSprite();
    this.manageYMotion();
    this.update();

    if (DEBUG_BOX) {
      game.ctx.strokeStyle = 'rgb(0, 0, 0)';
      game.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    game.ctx.drawImage(this.imgBtmp[this.spriteInd], this.x - 20, this.y);
  }
}

export default Obstacle;
