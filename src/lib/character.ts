import { JUMP_HEIGHT } from './constants';
import Element from './element';
import game from './game';

class Character extends Element {
  state: 'idle' | 'running' | 'jump_asc' | 'jump_desc' | 'crouching' = 'idle';
  initial = {
    x: 0,
    y: 0,
    height: 0
  };

  constructor() {
    super();

    this.width = 80;
    this.height = 100;
    this.x = game.el.offsetLeft + 20;
    this.y = game.el.offsetHeight - this.height - 20;
    this.initial = { x: this.x, y: this.y, height: this.height };
    this.attachListeners();

    return this;
  }

  addToScene() {
    game.addCharacter(this);
  }

  attachListeners() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyDown(evt: KeyboardEvent) {
    switch (evt.code) {
      case 'ArrowUp':
        if (this.state === 'running') {
          this.state = 'jump_asc';
        }
        break;

      case 'ArrowDown':
        if (this.state === 'running') {
          this.startCrouching();
        }
        break;
    }
  }

  handleKeyUp(evt: KeyboardEvent) {
    switch (evt.code) {
      case 'ArrowDown': {
        this.endCrouching();
      }
    }
  }

  startCrouching() {
    this.height = this.initial.height / 2;
    this.y += this.initial.height / 2;
  }

  endCrouching() {
    this.height = this.initial.height;
    this.y = this.initial.y;
  }

  update() {
    switch (this.state) {
      case 'jump_asc':
        if (this.y > this.initial.y - JUMP_HEIGHT) {
          this.y -= 15;
        } else {
          this.state = 'jump_desc';
        }
        break;

      case 'jump_desc':
        if (this.y < this.initial.y) {
          this.y += 15;
        } else {
          this.state = 'running';
        }
        break;
    }
  }

  render() {
    this.update();

    game.ctx.fillStyle = 'rgb(200, 0, 0)';
    game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Character;
