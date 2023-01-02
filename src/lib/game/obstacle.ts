import { DEBUG_BOX } from './data/game/constants';
import { OBS_SPEED } from './data/obstacles/constants';
import Element, { type ElementConfig } from './element';
import game from './game';

interface ObstacleConfig extends ElementConfig {
  yMotionType: 'bounce' | 'rake';
}

class Obstacle extends Element {
  enabled = true;
  yMotion = 0;
  yMotionModifier = 0;

  constructor(config: ObstacleConfig) {
    super(config);

    this.onFrame(1, () => this.manageSprite());

    switch (config.yMotionType) {
      case 'bounce':
        this.yMotionModifier = 1;
        this.onFrame(5, () => {
          this.y -= this.yMotionModifier;
          this.yMotionModifier *= -1;
        });

        break;
      case 'rake':
        this.yMotionModifier = 10;
        this.onFrame(2, () => (this.y -= this.yMotionModifier));
        this.onFrame(50, () => (this.yMotionModifier *= -1));
        break;
    }

    return this;
  }

  bounce() {
    if (this.yMotion === 6) {
      this.yMotion = 0;
      this.yMotionModifier *= -1;

      return;
    }

    if (this.yMotion % 5 === 0) {
      this.y -= this.yMotionModifier;
    }

    this.yMotion++;
  }

  rake() {
    if (this.yMotion === 50) {
      this.yMotion = 0;
      this.yMotionModifier *= -1;

      return;
    }

    if (this.yMotion % 2 === 0) {
      this.y -= this.yMotionModifier;
    }

    this.yMotion++;
  }

  /* manageYMotion() {
    switch (this.yMotionType) {
      case 'bounce':
        this.bounce();
        break;

      case 'rake':
        this.rake();
        break;
    }
  } */

  update() {
    if (!this.enabled) return;

    this.x -= OBS_SPEED[game.lvl];

    if (this.x + this.width < 0) {
      this.enabled = false;
      game.obstacleManager.removeObstacle(this.id);
    }
  }

  render() {
    if (!this.imgReady) {
      return;
    }

    this.runFrameOps();
    this.update();

    if (DEBUG_BOX) {
      game.ctx.strokeStyle = 'rgb(0, 0, 0)';
      game.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    game.ctx.drawImage(this.imgBtmp[this.spriteInd], this.x - 20, this.y);
  }
}

export default Obstacle;
