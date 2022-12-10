export interface ElementConfig {
  width: number;
  height: number;
  x: number;
  y: number;
  imgSrc?: string;
  btmp?: { sx: number; sy: number; sw: number; sh: number }[];
}

class Element {
  id = Date.now();
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  img: HTMLImageElement;
  imgRatio = 0;
  imgBtmp: ImageBitmap[];
  imgReady = false;
  spriteInd = 0;
  spriteTrack = 0;

  constructor(config: ElementConfig) {
    this.width = config.width;
    this.height = config.height;
    this.x = config.x;
    this.y = config.y;

    if (config.imgSrc) {
      this.img = new Image();      
      this.img.src = `img/${config.imgSrc}`;

      this.img.onload = async (evt) => {
        this.imgRatio = this.img.width / this.img.height;

        if (config.btmp) {
          this.imgBtmp = await Promise.all(
            config.btmp.map(
              async (val) => await createImageBitmap(this.img, val.sx, val.sy, val.sw, val.sh)
            )
          );

          this.imgReady = true;
        } else {
          this.imgReady = true;
        }
      };
    }
  }

  manageSprite() {
    if (this.spriteTrack === 10) {
      this.spriteTrack = 0;
      this.spriteInd < this.imgBtmp.length - 1 ? this.spriteInd++ : (this.spriteInd = 0);
    } else {
      this.spriteTrack++;
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
