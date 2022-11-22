import game from './game';
import Element, { type ElementConfig } from './element';
import { OBS_SPEED } from './constants';

interface RepeaterConfig extends ElementConfig {
  speedModifier: number;
}

class Repeater extends Element {
  offscreenDistance = 0;
  speedModifier = 0;

  constructor(config: RepeaterConfig) {
    super(config);

    this.speedModifier = config.speedModifier;
    this.offscreenDistance = config.x + config.width;
  }

  update() {
    this.x -= OBS_SPEED[game.lvl] + this.speedModifier;

    if (this.x + this.width < this.offscreenDistance * -1) {
      this.x = game.el.width;
    }
  }

  render() {
    if (!this.imgReady) {
      return;
    }

    this.update();

    /* game.ctx.strokeStyle = 'rgb(200, 0, 0)';
    game.ctx.strokeRect(this.x, this.y, this.width, this.height); */
    game.ctx.drawImage(this.img, this.x, this.y, this.width, this.width / this.imgRatio);
  }
}

export default Repeater;
