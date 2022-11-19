import { JUMP_HEIGHT } from './constants';
import game from './game';
import type Obstacle from './obstacle';

class Character {
  state: 'idle' | 'running' | 'jump_asc' | 'jump_desc' = 'idle';
  initial = {
    x: 0,
    y: 0
  };
  x = 20;
  y = 520;
  width = 80;
  height = 100;

  constructor() {
    this.x = game.el.offsetLeft + 20;
    this.y = game.el.offsetHeight - this.height - 20;
    this.initial = { x: this.x, y: this.y };
    this.attachListeners();

    return this;
  }

  addToScene() {
    game.addCharacter(this);
  }

  attachListeners() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(evt: KeyboardEvent) {
    switch (evt.code) {
      case 'ArrowUp':
        if (this.state === 'running') {
          this.state = 'jump_asc';
        }
    }
  }

  update() {
    if (this.state === 'jump_asc') {
      if (this.y > this.initial.y - JUMP_HEIGHT) {
        this.y -= 15;
      } else {
        this.state = 'jump_desc';
      }
    } else if (this.state === 'jump_desc') {
      if (this.y < this.initial.y) {
        this.y += 15;
      } else {
        this.state = 'running';
      }
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

  colides(el: Obstacle) {
    const { y, x, rightEdge, bottomEdge } = this.getCoords();

    const xCol =
      (rightEdge > el.getCoords().x && rightEdge < el.getCoords().rightEdge) ||
      (x > el.getCoords().x && x < el.getCoords().rightEdge);

    const yCol =
      (bottomEdge > el.getCoords().y && bottomEdge < el.getCoords().bottomEdge) ||
      (y > el.getCoords().y && y < el.getCoords().bottomEdge);

    return xCol && yCol;
  }

  render() {
    this.update();

    game.ctx.fillStyle = 'rgb(200, 0, 0)';
    game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Character;
