import { CHAR_OFFSET_Y } from '../character/constants';
import {
  AIR_OBS_SPRITE_W,
  GROUND_OBS_H,
  GROUND_OBS_SPRITE_W
} from './constants';

const groundObsConfig = (n: number) => ({
  sx: (GROUND_OBS_SPRITE_W / 3) * n,
  sy: 0,
  sw: GROUND_OBS_SPRITE_W / 3,
  sh: 70
});

const GROUND_OBS = {
  width: 70,
  height: GROUND_OBS_H,
  y: GROUND_OBS_H + CHAR_OFFSET_Y,
  btmp: [groundObsConfig(0), groundObsConfig(1), groundObsConfig(2)]
};

const airObsConfig = (n: number) => ({
  sx: (AIR_OBS_SPRITE_W / 3) * n,
  sy: 0,
  sw: GROUND_OBS_SPRITE_W / 3,
  sh: 66
});

const AIR_OBS = {
  width: 70,
  height: 65,
  y: 170,
  btmp: [airObsConfig(0), airObsConfig(1), airObsConfig(2)]
};

const OBS_1 = {
  ...GROUND_OBS,
  imgSrc: 'bike_sprite_purple.png'
};
const OBS_2 = {
  ...GROUND_OBS,
  imgSrc: 'bike_sprite_red.png'
};
const OBS_3 = {
  ...GROUND_OBS,
  imgSrc: 'bike_sprite_yellow.png'
};
const OBS_4 = {
  ...AIR_OBS,
  imgSrc: 'bike_sprite_clay.png'
};

const OBS_VARIATIONS = [OBS_1, OBS_2, OBS_3, OBS_4];

export { OBS_VARIATIONS };
