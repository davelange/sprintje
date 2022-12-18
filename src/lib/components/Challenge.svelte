<script lang="ts">
  import challenge from '$lib/stores/challenge';
  import { game } from '$lib/game';

  let state: 'hidden' | 'intro' | 'challenge' | 'failed' | 'success' = 'hidden';
  let reveal = window?.location.href.includes('reveal');

  game.subscribe(({ event }) => {
    switch (event) {
      case 'CRASH':
        state = 'intro';

        setTimeout(() => {
          state = 'challenge';
        }, 800);
        break;

      case 'PLAY':
      case 'REVIVE':
        state = 'hidden';
        break;
    }
  });

  function handleClick(opt: string) {
    if (opt === $challenge.answer) {
      state = 'success';

      setTimeout(() => {
        game.revive();
      }, 500);
    } else state = 'failed';
  }
</script>

{#if state === 'intro'}
  <div class="crash-title">
    <h2>OH NO!</h2>
  </div>
{:else if state === 'challenge'}
  <div class="root">
    <p class="prompt">What does <strong>{$challenge.word}</strong> mean?</p>

    {#each $challenge.opts as option}
      <button type="button" class="btn" on:click={() => handleClick(option)}>
        {option}
        {#if option === $challenge.answer && reveal}
          <span>&larr;</span>
        {/if}
      </button>
    {/each}
  </div>
{:else if state === 'failed'}
  <div class="root">
    <p class="game-over">game over</p>
    <button class="btn" on:click={() => game.restart()}>play again</button>
  </div>
{:else if state === 'success'}
  <div class="root">
    <p class="success">correct!</p>
  </div>
{/if}

<style>
  .root {
    text-align: center;
  }
  .btn {
    display: block;
    margin: 0 auto 16px;
    padding: 8px;
    background: #fff;
    border: 1px solid #333;
    border-radius: 4px;
    filter: drop-shadow(2px 2px 0 black);
  }
  .btn:last-of-type {
    margin-bottom: 0;
  }
  .prompt {
    margin-bottom: 16px;
  }
  .game-over {
    font-weight: 700;
    margin-bottom: 16px;
  }
  .success {
    font-weight: 700;
  }
  .crash-title {
    letter-spacing: 4px;
    color: #333;
    text-align: center;
  }

  @media screen and (min-width: 40em) {
    .root {
      position: absolute;
      inset: 0;
      margin: auto;
      padding: 36px;
      width: 300px;
      height: fit-content;
      background: #fafafa;
      border-radius: 10px;
    }
    .btn {
      width: 100%;
    }
    .crash-title {
      position: absolute;
      inset: 0;
      height: fit-content;
      margin: auto;
      text-align: center;
      color: #fff;
    }
  }
</style>
