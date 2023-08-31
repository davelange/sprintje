const MOTION_CONFIG = {
  1: {
    jumpAsc: 32,
    jumpDesc: 32,
    crouchAsc: 32,
    crouchDesc: 32
  },
  2: {
    jumpAsc: 28,
    jumpDesc: 28,
    crouchAsc: 28,
    crouchDesc: 28
  },
  3: {
    jumpAsc: 25,
    jumpDesc: 25,
    crouchAsc: 25,
    crouchDesc: 25
  },
  4: {
    jumpAsc: 24,
    jumpDesc: 24,
    crouchAsc: 24,
    crouchDesc: 24
  },
  5: {
    jumpAsc: 23,
    jumpDesc: 23,
    crouchAsc: 23,
    crouchDesc: 23
  },
  6: {
    jumpAsc: 22,
    jumpDesc: 22,
    crouchAsc: 22,
    crouchDesc: 22
  },
  7: {
    jumpAsc: 21,
    jumpDesc: 21,
    crouchAsc: 21,
    crouchDesc: 21
  },
  8: {
    jumpAsc: 20,
    jumpDesc: 20,
    crouchAsc: 20,
    crouchDesc: 20
  },
  9: {
    jumpAsc: 19,
    jumpDesc: 19,
    crouchAsc: 19,
    crouchDesc: 19
  },
  10: {
    jumpAsc: 17,
    jumpDesc: 17,
    crouchAsc: 17,
    crouchDesc: 17
  }
};
export const MOTION_FORCE = 110;
export const JUMP_DURATION = {
  mobile: MOTION_CONFIG,
  desktop: MOTION_CONFIG
};
export type MotionType = keyof typeof JUMP_DURATION['desktop'][1];
export const CHAR_OFFSET_Y = 55;
export const CHAR_HEIGHT = 65;
export const CHAR_OFFSET_X = 100;
