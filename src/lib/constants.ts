export const CANVAS_RATIO = 1 / 2.6;
export const JUMP_HEIGHT = 100;
export const CHAR_HEIGHT = 80;
export const CHAR_OFFSET_X = 40;
export const CHAR_OFFSET_Y = 20;
export const JUMP_DURATION = 20;

export const OBS_SPEED: Record<number, number> = {
  1: 6,
  2: 8,
  3: 12,
  4: 16
};

const GROUND_OBSTACLE_1 = {
  width: 30,
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
  GROUND_OBSTACLE_1,
  GROUND_OBSTACLE_2,
  AIR_OBSTACLE_1,
  AIR_OBSTACLE_2
];