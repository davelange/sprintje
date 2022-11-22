const GROUND_OBS_1 = {
  width: 120,
  height: 70,
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

const GROUND_OBS_2 = {
  width: 120,
  height: 70,
  imgSrc: 'bike_2_sprite.png',
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

const OBS_VARIATIONS = [GROUND_OBS_1, GROUND_OBS_2];

export { OBS_VARIATIONS };
