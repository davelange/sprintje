import { COLOR_GROUND, COLOR_SKY, GROUND_Y_OFFSET } from './data/scenery/constants';
import { CLOUDS, GRASS, SKYS } from './data/scenery/data';
import game from './game';
import Repeater from './repeater';

export default class Scenery {
  elements: Repeater[] = [];

  constructor() {
    this.addRepeaterEls();
  }

  addRepeaterEls() {
    SKYS.map((c) => new Repeater({ ...c, width: game.el.width }).addToScene(this.elements));
    CLOUDS.map((c) => new Repeater(c).addToScene(this.elements));
    /* GRASS.map((c, ind) =>
      new Repeater({
        ...c,
        x: ind * c.width,
        y: game.el.height - GROUND_Y_OFFSET + 30
      }).addToScene(this.elements)
    ); */
  }

  renderGround() {
    game.ctx.fillStyle = COLOR_GROUND;
    game.ctx.fillRect(0, game.el.height - GROUND_Y_OFFSET, game.el.width, 100);
  }

  renderSky() {
    game.ctx.fillStyle = COLOR_SKY;
    game.ctx.fillRect(0, 0, game.el.width, game.el.height);
  }

  render() {
    this.renderSky();
    this.renderGround();
    this.elements.forEach((el) => el.render());
  }
}
