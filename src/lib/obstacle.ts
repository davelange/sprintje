import { OBS_SPEED } from './constants';
import Element, { type ElementConfig } from './element';
import game from './game';

class Obstacle extends Element {
  enabled = true;

  constructor(config: ElementConfig) {
    super(config);

    return this;
  }

  addToScene() {
    game.addObstacle(this);
  }

  update() {
    if (!this.enabled) return;

    this.x -= OBS_SPEED[game.lvl];

    if (this.x + this.width < 0) {
      this.enabled = false;
      game.removeObstacle(this.id);
    }
  }

  render() {
    if (!this.imgReady) {
      return;
    }

    this.update();

    //game.ctx.strokeStyle = 'rgb(0, 0, 200)';
//    game.ctx.strokeRect(this.x, this.y, this.width, this.height);
    game.ctx.drawImage(this.img, this.x, this.y, this.width, this.width / this.imgRatio);
  }
}

export default Obstacle;
