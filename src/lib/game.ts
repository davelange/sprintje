import Character from './character';
import Obstacle from './obstacle';

class Game {
  status: 'running' | 'idle' = 'idle';
  el: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  character: Character;
  obstacles: Obstacle[] = [];
  frame = 0;

  init(canvasEl: HTMLCanvasElement) {
    this.el = canvasEl;
    this.ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;

    new Character().addToScene();
  }

  addCharacter(el: any) {
    this.character = el;
  }

  addObstacle(el: Obstacle) {
    this.obstacles.push(el);
    console.log(`added obs ${el.id}`);
  }

  removeObstacle(id: number) {
    this.obstacles = this.obstacles.filter((obs) => obs.id !== id);
    console.log(`removed obs ${id}`);
  }

  detectCollisions() {
    const collision = this.obstacles.find((obs) => this.character.colides(obs));

    console.log(collision);

    if (collision) {
      this.status = 'idle';
    }
  }

  manageObstacles() {
    if (!this.obstacles.length) {
      new Obstacle().addToScene();
    }

    const lastObsPos = this.obstacles[this.obstacles.length - 1].x;

    if (lastObsPos < 200) {
      new Obstacle().addToScene();
    }
  }

  render() {
    this.ctx.clearRect(0, 0, 800, 600);
    this.frame++;

    this.detectCollisions();
    this.manageObstacles();

    this.character.render();
    this.obstacles.forEach((el) => el.render());

    if (this.status === 'running') {
      requestAnimationFrame(this.render.bind(this));
    }
  }

  loop() {
    requestAnimationFrame(this.render.bind(this));
  }

  play() {
    if (this.status === 'running') {
      return;
    }

    this.status = 'running';
    this.character.state = 'running';
    this.loop();
  }

  pause() {
    this.status = 'idle';
  }
}

const game = new Game();

export default game;
