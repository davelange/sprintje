import game from '$lib/game/game';
import isMobile from '$lib/game/utils/isMobile';
import { JUMP_DURATION, type MotionType } from './constants';

const motionDuration = JUMP_DURATION[isMobile() ? 'mobile' : 'desktop'];

export function getDuration(motion: MotionType) {
  return motionDuration[game.lvl as keyof typeof motionDuration][motion];
}

export function closeToEndOfMotion(progress: number, duration: number) {
  return duration - progress < duration / 3;
}
