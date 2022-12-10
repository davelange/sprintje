import { game } from './index';
import Element, { type ElementConfig } from './element';
import { OBS_SPEED } from './data/obstacles/constants';
import type { SubUpdate } from './game';

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

    game.subscribe(this.onUpdate.bind(this));
  }

  onUpdate(data: SubUpdate) {
    /* if (data.event === 'RESTART') {      
      this.x = 0;
    } */
  }

  update() {
    this.x -= OBS_SPEED[game.lvl] + this.speedModifier;

    if (this.x + this.width < this.offscreenDistance * -1) {
      this.x = game.el.width;
    }
  }

  render() {
    if (!this.imgReady) {
      console.log("not ready")
      return;
    }

    if (!this.static) {
      this.update();
    }

    game.ctx.drawImage(this.img, this.x, this.y, this.width, this.width / this.imgRatio);
  }
}

export default Repeater;
