import { game } from './index';
import Element, { type ElementConfig } from './element';
import { OBS_SPEED } from './data/obstacles/constants';
import { DEBUG_BOX } from './data/game/constants';

interface RepeaterConfig extends ElementConfig {
  speedModifier: number;
  static?: boolean;
}

class Repeater extends Element {
  offscreenDistance = 0;
  speedModifier = 0;
  static = false;

  constructor(config: RepeaterConfig) {
    super(config);

    this.speedModifier = config.speedModifier;
    this.static = config?.static || false;
    this.offscreenDistance = config.x + config.width;
  }

  update() {
    this.x -= OBS_SPEED[game.lvl] + this.speedModifier;

    if (this.x + this.width < 0) {
      this.x = game.el.width;
    }
  }

  render() {
    if (!this.imgReady) {
      return;
    }

    if (!this.static) {
      this.update();
    }

    if (DEBUG_BOX) {
      game.ctx.strokeStyle = '#000';
      game.ctx.lineWidth = 1;
      game.ctx.strokeRect(this.x, this.y, this.width, this.width / this.imgRatio);
    }

    game.ctx.drawImage(this.img, this.x, this.y, this.width, this.width / this.imgRatio);
  }
}

export default Repeater;
