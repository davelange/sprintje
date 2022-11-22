import { CLOUD_VARIATIONS, GRASS_ELS, GROUND_Y_OFFSET, SKY_ELS } from './constants';
import game from './game';
import Repeater from './repeater';

const color = {
  green1: '#ACD09A',
  green2: '#BEEA9B',
  blue: '#67B3DD'
};

export default class Scenery {
  clouds: Repeater[] = [];

  constructor() {
    SKY_ELS.map((sky) => new Repeater({ ...sky, width: game.el.width }).addToScene(this.clouds));
    CLOUD_VARIATIONS.map((config) => new Repeater(config).addToScene(this.clouds));
    GRASS_ELS.map((config, ind) =>
      new Repeater({
        ...config,
        width: game.el.width,
        x: ind * game.el.width,
        y: game.el.height - GROUND_Y_OFFSET + 30
      }).addToScene(this.clouds)
    );
  }

  renderGround() {
    /* game.ctx.fillStyle = color.green1;
    game.ctx.fillRect(0, game.el.height - GROUND_Y_OFFSET, game.el.width, 10); */
    game.ctx.fillStyle = color.green2;
    game.ctx.fillRect(0, game.el.height - GROUND_Y_OFFSET, game.el.width, 100);
  }

  renderSky() {
    game.ctx.fillStyle = color.blue;
    game.ctx.fillRect(0, 0, game.el.width, game.el.height);
  }

  render() {
    this.renderSky();
    this.renderGround();
    this.clouds.forEach((cl) => cl.render());
  }
}
