import type Game from './game';

export const events = [
  'init',
  'up_level',
  'crash',
  'play',
  'pause',
  'game_over',
  'revive',
  'restart'
] as const;

export type Event = typeof events[number];

export type SubUpdate = {
  event: Event;
  status: Game['status'];
};

export type Subscribers = Record<Event, ((a: SubUpdate) => void)[]>;
