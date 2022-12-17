import { get, writable } from 'svelte/store';
import { game } from '../game';
import data from '$lib/data/data';

type ChallengeStore = {
  active: boolean;
  word: string;
  opts: string[];
  answer: string;
  done: number[];
};

function challengeStore() {
  const store = writable<ChallengeStore>({
    active: false,
    word: '',
    answer: '',
    opts: [],
    done: []
  });

  function _set(args: Partial<ChallengeStore>) {
    store.update((store) => ({
      ...store,
      ...args
    }));
  }

  function rand(max = data.length) {
    const min = 0;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randUniq(amount: number): number[] {
    const gen = (
      list: number[],
      exclude: number[],
      target: number
    ): number[] => {
      const idx = rand();

      if (exclude.includes(idx) || list.includes(idx)) {
        return gen(list, exclude, target);
      }

      const newList = [...list, idx];

      if (newList.length === target) {
        return newList;
      }

      return gen(newList, exclude, target);
    };

    return gen([], get(store).done, amount);
  }

  async function newChallenge() {
    const opts = randUniq(4);

    const correctIdx = opts[rand(3)];

    const ch = data[correctIdx];

    _set({
      done: [...get(store).done, correctIdx],
      word: ch.nl,
      answer: ch.en,
      opts: opts.map((i) => data[i].en)
    });
  }

  game.subscribe((data) => {
    switch (data.event) {
      case 'CRASH':
        newChallenge();

        _set({
          active: true
        });

        break;

      case 'REVIVE':
      case 'RESTART':
        _set({
          active: false,
          word: '',
          answer: '',
          opts: []
        });

        break;
    }
  });

  return {
    subscribe: store.subscribe,
    set: store.set,
    update: store.update,
    newChallenge
  };
}

const st = challengeStore();

export default st;
