export const OBS_SPEED: Record<number, number> = {
  1: 5,
  2: 6,
  3: 8,
  4: 10,
  5: 12,
  6: 14
};

export const OBS_RESET_FREQ: Record<number, number> = {
  1: 6,
  2: 8,
  3: 4,
  4: 8,
  5: 3,
  6: 8
};

/* export const OBS_DIST: Record<number, number> = {
  1: 300,
  2: 320,
  3: 340,
  4: 360,
  5: 380,
  6: 400
}; */

export const OBS_DIST: Record<number, number[]> = {
  1: [250, 350, 400, 600, 370],
  2: [350, 450],
  3: [450, 550],
  4: [550, 650],
  5: [650, 700],
  6: [650, 700]
};

export const OBS_RESET_DIST = 10;
