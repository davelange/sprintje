import { get, writable } from 'svelte/store';
import { game } from '../game';
import words_en from '../data/words_en';

type ChallengeStore = {
  active: boolean;
  failed: boolean;
  word: string;
  opts: string[];
  answer: string;
  done: number[];
};

function challengeStore() {
  const store = writable<ChallengeStore>({
    active: false,
    failed: false,
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

  function rand(max = words_en.length) {
    const min = 0;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randUniq(amount: number): number[] {
    const gen = (list: number[], exclude: number[], target: number): number[] => {
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

  async function getTranslation(word: string) {
    const tr = await fetch(`api/translate?word=${word}`);

    return (await tr.json()).word;
  }

  async function newChallenge() {
    const opts = randUniq(4);
    console.log(opts);
    const correctIdx = opts[rand(3)];

    const translation = await getTranslation(words_en[correctIdx]);

    _set({
      done: [...get(store).done, correctIdx],
      word: translation,
      answer: words_en[correctIdx],
      opts: opts.map((i) => words_en[i])
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
          failed: false,
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
