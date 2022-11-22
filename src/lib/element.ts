export interface ElementConfig {
  width: number;
  height: number;
  x: number;
  y: number;
  imgSrc?: string;
}

class Element {
  id = Date.now();
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  img: HTMLImageElement;
  imgRatio = 0;
  /* imgBtmp: ImageBitmap; */
  imgReady = false;

  constructor(config: ElementConfig) {
    this.width = config.width;
    this.height = config.height;
    this.x = config.x;
    this.y = config.y;

    if (config.imgSrc) {
      this.img = new Image();
      this.img.src = `img/${config.imgSrc}`;

      this.img.onload = (evt) => {
        this.imgReady = true;
        this.imgRatio = this.img.width / this.img.height;
        /* this.imgBtmp = createImageBitmap(this.img, ) */
      };
    }
  }

  addToScene(scene: Element[]) {
    scene.push(this);
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

  colides(el: Element) {
    const { y, x, rightEdge, bottomEdge } = this.getCoords();

    const xCol =
      (rightEdge > el.getCoords().x && rightEdge < el.getCoords().rightEdge) ||
      (x > el.getCoords().x && x < el.getCoords().rightEdge);

    const yCol =
      (bottomEdge > el.getCoords().y && bottomEdge < el.getCoords().bottomEdge) ||
      (y > el.getCoords().y && y < el.getCoords().bottomEdge);

    return xCol && yCol;
  }
}

export default Element;
