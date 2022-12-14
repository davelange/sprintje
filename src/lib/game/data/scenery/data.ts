const SKY_1 = {
  x: 20,
  y: 20,
  height: 1,
  static: true,
  imgSrc: 'sky_2.png',
  speedModifier: -5
};

const SKY_2 = {
  x: 300,
  y: 40,
  height: 1,
  static: true,
  imgSrc: 'sky_2.png',
  speedModifier: -4.4
};

const SKY_SHADE_1 = {
  x: 0,
  y: 0,
  height: 1,
  imgSrc: 'sky_3.png',
  speedModifier: -4.5
};

const SKY_SHADE_2 = {
  x: 0,
  y: 0,
  height: 1,
  imgSrc: 'sky_3.png',
  speedModifier: -4.5
};

const CLOUD_1 = {
  x: 500,
  y: 50,
  width: 300,
  height: 1,
  imgSrc: 'cloud_1.png',
  speedModifier: -4.6
};

const CLOUD_2 = {
  x: 720,
  y: 500,
  width: 200,
  height: 1,
  imgSrc: 'cloud_2.png',
  speedModifier: -4.1
};

const CLOUD_3 = {
  x: 120,
  y: 70,
  width: 110,
  height: 1,
  imgSrc: 'cloud_2.png',
  speedModifier: -4.4
};

const GRASS_1 = {
  x: 0,
  height: 30,
  width: 825,
  imgSrc: 'grass_3.png',
  speedModifier: 0
};

const GRASS_2 = {
  x: 10,
  height: 30,
  width: 825,
  imgSrc: 'grass_3.png',
  speedModifier: 0
};

export const CLOUDS = [CLOUD_1, CLOUD_2, CLOUD_3];
export const SKYS = [SKY_1, SKY_2];
export const SKYS_SHADE = [SKY_SHADE_1, SKY_SHADE_2];
export const GRASS = [GRASS_1, GRASS_2];
