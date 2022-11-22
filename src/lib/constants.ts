export const CANVAS_RATIO = 1 / 2.6;
export const JUMP_HEIGHT = 100;
export const CHAR_HEIGHT = 80;
export const CHAR_OFFSET_X = 40;
export const CHAR_OFFSET_Y = 60;
export const JUMP_DURATION = 17;
export const GROUND_Y_OFFSET = CHAR_OFFSET_Y + 10;

export const OBS_SPEED: Record<number, number> = {
  1: 5,
  2: 6,
  3: 8,
  4: 10,
  5: 12,
  6: 14
};

const GROUND_OBSTACLE_1 = {
  width: 120,
  height: 70
};

const GROUND_OBSTACLE_2 = {
  width: 70,
  height: 50
};

const AIR_OBSTACLE_1 = {
  width: 100,
  height: 30,
  y: 120
};

const AIR_OBSTACLE_2 = {
  width: 100,
  height: 30,
  y: 200
};

export const LEVEL_REQS: Record<number, number> = {
  10: 2,
  20: 3,
  40: 4
};

export const OBSTACLE_VARIATIONS = [
  GROUND_OBSTACLE_1
  /* GROUND_OBSTACLE_2,
  AIR_OBSTACLE_1,
  AIR_OBSTACLE_2 */
];

export const OBS_RESET_DIST = 10;

export const OBS_RESET_FREQ = {
  1: 6,
  2: 8,
  3: 4,
  4: 8,
  5: 3,
  6: 8
};

export const OBS_DIST = {
  1: 300,
  2: 320,
  3: 340,
  4: 360,
  5: 380,
  6: 400
};

const SKY_1 = {
  x: 20,
  y: 20,
  height: 1,
  imgSrc: 'sky_2.png',
  speedModifier: -5
};

const SKY_2 = {
  x: 300,
  y: 40,
  height: 1,
  imgSrc: 'sky_2.png',
  speedModifier: -4.4
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
  height: 1,
  imgSrc: 'grass_1.png',
  speedModifier: 0
};

const GRASS_2 = {
  x: 0,
  height: 1,
  imgSrc: 'grass_1.png',
  speedModifier: 0
};

export const CLOUD_VARIATIONS = [CLOUD_1, CLOUD_2, CLOUD_3];
export const SKY_ELS = [SKY_1, SKY_2];
export const GRASS_ELS = [GRASS_1, GRASS_2];
