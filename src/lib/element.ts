export interface ElementConfig {
  width: number;
  height: number;
  x: number;
  y: number;
}

class Element {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  id = Date.now();

  constructor(config: ElementConfig) {
    this.width = config.width;
    this.height = config.height;
    this.x = config.x;
    this.y = config.y;
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
