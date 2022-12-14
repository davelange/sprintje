import { CHAR_HEIGHT, CHAR_OFFSET_X } from './constants';

export const CHAR = {
  width: 65,
  height: CHAR_HEIGHT,
  x: CHAR_OFFSET_X,
  imgSrc: 'mono_sprite_1.png',
  btmp: [
    {
      sx: 0,
      sy: 0,
      sw: 82.3,
      sh: 75
    },
    {
      sx: 82.5,
      sy: 0,
      sw: 247 / 3,
      sh: 75
    },
    {
      sx: 164.4,
      sy: 0,
      sw: 247 / 3,
      sh: 75
    }
  ]
};
