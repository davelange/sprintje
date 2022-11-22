import { GROUND_Y_OFFSET } from './constants';
import game from './game';

const color = {
  green1: '#ACD09A',
  green2: '#BEEA9B',
  blue: '#67B3DD'
};

export default class Scenery {
  renderGround() {
    game.ctx.fillStyle = color.green1;
    game.ctx.fillRect(0, game.el.height - GROUND_Y_OFFSET, game.el.width, 10);
    game.ctx.fillStyle = color.green2;
    game.ctx.fillRect(0, game.el.height - GROUND_Y_OFFSET + 10, game.el.width, 100);
  }

  renderSky() {
    game.ctx.fillStyle = color.blue;
    game.ctx.fillRect(0, 0, game.el.width, game.el.height);
  }


  render() {
    this.renderSky();
    this.renderGround();
  }
}
