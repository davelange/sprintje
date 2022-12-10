import Announcer from './announcer';
import Character from './character';
import { CHAR_HEIGHT, CHAR_OFFSET_Y } from './data/character/constants';
import { CHAR } from './data/character/data';
import Game from './game';
import ObstacleManager from './obstacleManager';
import Scenery from './scenery';

const game = new Game();

const character = new Character({
  ...CHAR,
  y: CHAR_HEIGHT - CHAR_OFFSET_Y
});

const announcer = new Announcer();

const scenery = new Scenery();

const obstacleManager = new ObstacleManager();

export { game, announcer, character, scenery, obstacleManager };
