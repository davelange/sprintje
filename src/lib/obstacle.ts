import { DEBUG_BOX } from './data/game/constants';
import { OBS_SPEED } from './data/obstacles/constants';
import Element, { type ElementConfig } from './element';
import { game, obstacleManager } from './index';

class Obstacle extends Element {
  enabled = true;

  constructor(config: ElementConfig) {
    super(config);

    return this;
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
    this.update();

    if (DEBUG_BOX) {
      game.ctx.strokeStyle = 'rgb(0, 0, 0)';
      game.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    game.ctx.drawImage(this.imgBtmp[this.spriteInd], this.x - 20, this.y);
  }
}

export default Obstacle;
