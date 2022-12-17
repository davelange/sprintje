<script lang="ts">
  import challenge from '$lib/stores/challenge';
  import { game } from '$lib/game';

  let state: 'hidden' | 'intro' | 'challenge' | 'failed' = 'hidden';

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
    opt === $challenge.answer ? game.revive() : (state = 'failed');
  }
</script>

{#if state === 'intro'}
  <div class="crash-title">
    <h2>YOU CRASHED!</h2>
  </div>
{:else if state === 'challenge'}
  <div class="root">
    <p class="prompt">What does <strong>{$challenge.word}</strong> mean?</p>

    {#each $challenge.opts as option}
      <button type="button" class="btn" on:click={() => handleClick(option)}>
        {option}
        {option === $challenge.answer ? 'X' : ''}
      </button>
    {/each}
  </div>
{:else if state === 'failed'}
  <div class="root">
    <p class="game-over">game over</p>
    <button class="btn" on:click={() => game.restart()}>play again</button>
  </div>
{/if}

<style>
  .root {
    text-align: center;
  }
  .btn {
    display: block;
    margin: 0 0 16px;
    width: 100%;
    padding: 8px;
    background: #fff;
    border: 1px solid #333;
    border-radius: 4px;
    filter: drop-shadow(2px 2px 0 black);
  }

  .btn:last-of-type {
    margin: 0;
  }
  .game-over {
    font-weight: 700;
    margin-bottom: 16px;
  }
  .crash-title {
    color: #333;
    letter-spacing: 4px;
    text-shadow: #fff 2px 2px;
  }

  @media screen and (min-width: 40em) {
    .crash-title {
      position: absolute;
      inset: 0;
      height: fit-content;
      margin: auto;
      text-align: center;
      animation: pulse 0.3s steps(2, end) infinite;
    }
    .root {
      position: absolute;
      inset: 0;
      margin: auto;
      padding: 20px;
      width: 300px;
      height: fit-content;
      background: #fafafa;
      border-radius: 10px;
    }
  }
</style>
