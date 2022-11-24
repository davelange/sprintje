import { CHAR_OFFSET_Y } from '$lib/_constants';

const GROUND_OBS_1 = {
  width: 70,
  height: 65,
  y: 65 + CHAR_OFFSET_Y,
  imgSrc: 'bike_1_sprite.png',
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

const AIR_OBS_1 = {
  width: 70,
  height: 65,
  y: 180,
  imgSrc: 'bike_3_sprite.png',
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

const OBS_VARIATIONS = [GROUND_OBS_1, AIR_OBS_1];

export { OBS_VARIATIONS };
