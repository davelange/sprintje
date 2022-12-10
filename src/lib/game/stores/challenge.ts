import { writable } from 'svelte/store';
import { game } from '..';

const challenge = writable({
  active: false,
  failed: false,
  word: 'Kletskous',
  options: ['Happy', 'Blue', 'Chatty', 'Boring'],
  answer: 2
});

game.subscribe((data) => {
  switch (data.event) {
    case 'CRASH':
      challenge.update((st) => ({
        ...st,
        active: true
      }));

      break;

    case 'RESTART':
      challenge.update((st) => ({
        ...st,
        failed: false
      }));

      break;
  }
});

export default challenge;
