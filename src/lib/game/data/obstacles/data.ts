import { CHAR_OFFSET_Y } from '../character/constants';
const GROUND_OBS = {
  width: 70,
  height: 65,
  y: 65 + CHAR_OFFSET_Y,
  btmp: [
    {
      sx: 0,
      sy: 0,
      sw: 329 / 3,
      sh: 70
    },
    {
      sx: 110,
      sy: 0,
      sw: 329 / 3,
      sh: 70
    },
    {
      sx: 220,
      sy: 0,
      sw: 329 / 3,
      sh: 70
    }
  ]
};

const AIR_OBS = {
  width: 70,
  height: 65,
  y: 170,
  btmp: [
    {
      sx: 0,
      sy: 0,
      sw: 326 / 3,
      sh: 66
    },
    {
      sx: 109,
      sy: 0,
      sw: 326 / 3,
      sh: 66
    },
    {
      sx: 218,
      sy: 0,
      sw: 326 / 3,
      sh: 66
    }
  ]
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
