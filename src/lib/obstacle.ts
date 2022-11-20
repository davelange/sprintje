import Element from './element';
import game from './game';

class Obstacle extends Element {
  enabled = true;

  constructor() {
    super();

    this.x = game.el.width;
    this.y = 200;
    this.width = 200;
    this.height = 100;

    return this;
  }

  addToScene() {
    game.addObstacle(this);
  }

  update() {
    if (!this.enabled) return;

    this.x -= 2;

    if (this.x + this.width < game.el.offsetLeft) {
      this.enabled = false;
      game.removeObstacle(this.id);
    }
  }

  render() {
    this.update();

    game.ctx.fillStyle = 'rgb(0, 0, 200)';
    game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Obstacle;
