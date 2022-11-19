import game from './game';

class Obstacle {
  enabled = true;
  x = 600;
  y = 200;
  width = 200;
  height = 100;
  id = Date.now();

  constructor() {
    this.x = game.el.width;

    return this;
  }

  addToScene() {
    game.addObstacle(this);
  }

  handleUpdate() {
    if (!this.enabled) return;

    this.x -= 2;

    if (this.x + this.width < game.el.offsetLeft) {
      this.enabled = false;
      game.removeObstacle(this.id);
    }
  }

  getCoords() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      rightEdge: this.x + this.width,
      bottomEdge: this.y + this.height
    };
  }

  render() {
    this.handleUpdate();

    game.ctx.fillStyle = 'rgb(0, 0, 200)';
    game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Obstacle;
